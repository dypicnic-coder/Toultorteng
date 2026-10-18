import React, { useEffect, useState } from 'react';
import { ClassOverview } from './types';
import { Header } from './components/Header';
import { ScoreSheet } from './components/ScoreSheet';
import { RankingsTable } from './components/RankingsTable';
import { HonorRoll } from './components/HonorRoll';
import { StudentBulletin } from './components/StudentBulletin';
import { AttendanceTable } from './components/AttendanceTable';
import { StudentsPage } from './components/StudentsPage';
import { SqlPythonConsole } from './components/SqlPythonConsole';
import { AlertCircle, RefreshCw } from 'lucide-react';

import { INITIAL_DATA } from './data/initialData';

export default function App() {
  const [overview, setOverview] = useState<ClassOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('scoresheet');
  const [selectedStudentId, setSelectedStudentId] = useState<number>(2); // Default to student #2 (គៀន ណាគ្រិន) as shown in Page 7
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchOverview = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const res = await fetch('/api/overview?month=មីនា');
      if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to load data`);
      const data = await res.json();
      setOverview(data);
      setError(null);
    } catch (err: any) {
      console.warn('Backend API unavailable, using local client-side data (Vercel/Static mode):', err.message);
      // Fallback for Vercel static deployment or when python backend is offline
      const saved = localStorage.getItem('school_scores_data');
      if (saved) {
        try {
          setOverview(JSON.parse(saved));
        } catch {
          setOverview(INITIAL_DATA);
        }
      } else {
        setOverview(INITIAL_DATA);
      }
      setError(null);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetch('/api/recalculate', { method: 'POST' });
      await fetchOverview(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleUpdateScore = async (studentId: number, subjectId: number, score: number | null, isAbsent: boolean) => {
    try {
      const res = await fetch('/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: studentId,
          subject_id: subjectId,
          score,
          is_absent: isAbsent,
        }),
      });
      if (!res.ok) throw new Error('Failed to update score');
      await fetchOverview(false);
    } catch (err) {
      console.error(err);
      alert('មានបញ្ហាក្នុងការកែប្រែពិន្ទុ');
    }
  };

  const handleUpdateAttendance = async (
    studentId: number,
    permission: number,
    unexcused: number,
    prevPermission: number,
    prevUnexcused: number,
    notes: string
  ) => {
    try {
      const res = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: studentId,
          permission_days: permission,
          unexcused_days: unexcused,
          prev_permission_days: prevPermission,
          prev_unexcused_days: prevUnexcused,
          notes,
        }),
      });
      if (!res.ok) throw new Error('Failed to update attendance');
      await fetchOverview(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddStudent = async (data: { roll_number: number; full_name: string; gender: string; dob: string }) => {
    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to add student');
      await fetchOverview(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteStudent = async (id: number) => {
    try {
      const res = await fetch(`/api/students/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete student');
      await fetchOverview(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateSchoolInfo = async (info: any) => {
    try {
      const res = await fetch('/api/school-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(info),
      });
      if (!res.ok) throw new Error('Failed to update school info');
      await fetchOverview(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectStudentForBulletin = (studentId: number) => {
    setSelectedStudentId(studentId);
    setActiveTab('bulletin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-slate-800 font-bold text-base font-serif">
          កំពុងចាប់ផ្ដើមប្រព័ន្ធគ្រប់គ្រងពិន្ទុ និងទាញទិន្នន័យពី Python SQL...
        </div>
        <div className="text-slate-500 text-xs mt-1">អនុវិទ្យាល័យទួលទទឹង • ថ្នាក់ទី ៩ "ក"</div>
      </div>
    );
  }

  if (error || !overview) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-6 rounded-xl border border-red-200 shadow-md max-w-md w-full text-center">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-900 mb-1">បញ្ហាក្នុងការតភ្ជាប់ Backend</h2>
          <p className="text-xs text-slate-600 mb-4">{error || 'Unknown error'}</p>
          <button
            onClick={() => fetchOverview(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1.5"
          >
            <RefreshCw className="w-4 h-4" />
            <span>ព្យាយាមម្ដងទៀត</span>
          </button>
        </div>
      </div>
    );
  }

  // Get top 5 students for honor roll
  const top5Students = [...overview.students]
    .filter((s) => s.result_status === 'ជាប់')
    .sort((a, b) => a.overall_rank - b.overall_rank)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col">
      <Header
        schoolInfo={overview.school_info}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        onPrint={() => window.print()}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'scoresheet' && (
          <ScoreSheet
            overview={overview}
            onUpdateScore={handleUpdateScore}
            onSelectStudentForBulletin={handleSelectStudentForBulletin}
          />
        )}

        {activeTab === 'rankings' && (
          <RankingsTable
            overview={overview}
            onSelectStudent={handleSelectStudentForBulletin}
          />
        )}

        {activeTab === 'honor' && (
          <HonorRoll
            schoolInfo={overview.school_info}
            topStudents={top5Students}
            onSelectStudent={handleSelectStudentForBulletin}
          />
        )}

        {activeTab === 'bulletin' && (
          <StudentBulletin
            studentId={selectedStudentId}
            students={overview.students}
            onSelectStudent={setSelectedStudentId}
          />
        )}

        {activeTab === 'attendance' && (
          <AttendanceTable
            overview={overview}
            onUpdateAttendance={handleUpdateAttendance}
          />
        )}

        {activeTab === 'students' && (
          <StudentsPage
            overview={overview}
            onAddStudent={handleAddStudent}
            onDeleteStudent={handleDeleteStudent}
            onUpdateSchoolInfo={handleUpdateSchoolInfo}
          />
        )}

        {activeTab === 'console' && <SqlPythonConsole />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 px-6 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © ២០២៦ {overview.school_info.school_name} - ប្រព័ន្ធគ្រប់គ្រងពិន្ទុ និងវត្តមានសិស្ស
          </div>
          <div className="font-mono text-[11px] text-slate-400">
            Powered by Python 3.10 & SQLite 3 Database
          </div>
        </div>
      </footer>
    </div>
  );
}
