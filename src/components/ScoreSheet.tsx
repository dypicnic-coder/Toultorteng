import React, { useState } from 'react';
import { ClassOverview, Student, Subject } from '../types';
import { Search, Filter, Edit3, Check, X, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface ScoreSheetProps {
  overview: ClassOverview;
  onUpdateScore: (studentId: number, subjectId: number, score: number | null, isAbsent: boolean) => Promise<void>;
  onSelectStudentForBulletin: (studentId: number) => void;
}

export const ScoreSheet: React.FC<ScoreSheetProps> = ({
  overview,
  onUpdateScore,
  onSelectStudentForBulletin
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState<'ALL' | 'ប' | 'ស'>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ជាប់' | 'ធ្លាក់' | 'អវត្តមាន'>('ALL');
  
  // Score editing modal/popover state
  const [editingCell, setEditingCell] = useState<{
    studentId: number;
    subjectId: number;
    studentName: string;
    subjectName: string;
    currentScore: number | null;
    isAbsent: boolean;
    maxScore: number;
  } | null>(null);
  
  const [inputScore, setInputScore] = useState<string>('');
  const [inputAbsent, setInputAbsent] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState(false);

  const { school_info, subjects, students, statistics } = overview;

  // Filter students
  const filteredStudents = students.filter((st) => {
    const matchesSearch = st.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          String(st.roll_number).includes(searchTerm);
    const matchesGender = genderFilter === 'ALL' || st.gender === genderFilter;
    const matchesStatus = statusFilter === 'ALL' || st.result_status === statusFilter;
    return matchesSearch && matchesGender && matchesStatus;
  });

  const handleStartEdit = (student: Student, subject: Subject) => {
    const scoreDetail = student.scores[subject.id] || { score: null, is_absent: true };
    setEditingCell({
      studentId: student.id,
      subjectId: subject.id,
      studentName: student.full_name,
      subjectName: subject.name_km,
      currentScore: scoreDetail.score,
      isAbsent: scoreDetail.is_absent,
      maxScore: subject.max_score,
    });
    setInputScore(scoreDetail.score !== null && !scoreDetail.is_absent ? String(scoreDetail.score) : '');
    setInputAbsent(scoreDetail.is_absent);
  };

  const handleSaveScore = async () => {
    if (!editingCell) return;
    setIsSaving(true);
    try {
      const numScore = inputAbsent ? null : (inputScore === '' ? null : parseFloat(inputScore));
      await onUpdateScore(editingCell.studentId, editingCell.subjectId, numScore, inputAbsent);
      setEditingCell(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
      {/* Controls & Filter Bar (No-print) */}
      <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 no-print">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <div className="relative w-full max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ស្វែងរកតាមឈ្មោះ ឬ ល.រ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs text-slate-500 hover:text-slate-800"
            >
              សម្អាត
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-slate-600 font-medium">ភេទ:</span>
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value as any)}
            className="bg-white border border-slate-300 rounded-md px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500"
          >
            <option value="ALL">ទាំងអស់</option>
            <option value="ប">ប្រុស (ប)</option>
            <option value="ស">ស្រី (ស)</option>
          </select>

          <span className="text-slate-600 font-medium ml-2">លទ្ធផល:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-white border border-slate-300 rounded-md px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500"
          >
            <option value="ALL">ទាំងអស់</option>
            <option value="ជាប់">ជាប់</option>
            <option value="ធ្លាក់">ធ្លាក់</option>
            <option value="អវត្តមាន">អវត្តមាន</option>
          </select>

          <div className="text-slate-500 ml-3">
            បង្ហាញ {filteredStudents.length} / {students.length} នាក់
          </div>
        </div>
      </div>

      {/* Official Sheet Header */}
      <div className="p-6 pb-2 text-center border-b border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4 text-xs">
          <div className="text-left font-serif leading-relaxed">
            <div className="font-semibold text-slate-800">មន្ទីរអប់រំ យុវជន និងកីឡា {school_info.province}</div>
            <div className="text-slate-700">ការិយាល័យ អយក នៃរដ្ឋបាល {school_info.district}</div>
            <div className="font-bold text-slate-900">{school_info.school_name}</div>
          </div>

          <div className="text-center font-serif leading-relaxed mx-auto">
            <div className="font-moul text-sm text-slate-900">ព្រះរាជាណាចក្រកម្ពុជា</div>
            <div className="font-moul text-xs text-slate-800">ជាតិ សាសនា ព្រះមហាក្សត្រ</div>
          </div>

          <div className="text-right">
            <span className="inline-block px-3 py-1 bg-amber-100 border border-amber-300 text-amber-900 font-bold rounded-lg text-sm shadow-xs">
              មេគុណចែក: 8.4
            </span>
          </div>
        </div>

        <h1 className="font-moul text-base md:text-lg text-blue-950 mt-2">
          តារាងស្រង់ពិន្ទុប្រឡងប្រចាំ ខែមីនា
        </h1>
        <div className="font-semibold text-slate-700 text-xs md:text-sm mt-1">
          {school_info.class_name} ឆ្នាំសិក្សា {school_info.academic_year}
        </div>
      </div>

      {/* Master Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-[11px] whitespace-nowrap">
          <thead>
            <tr className="bg-slate-100/90 text-slate-800 font-semibold border-b border-slate-300 text-center">
              <th rowSpan={2} className="p-2 border-r border-slate-300 w-10">ល.រ</th>
              <th rowSpan={2} className="p-2 border-r border-slate-300 text-left min-w-[140px]">គោត្តនាម នាម</th>
              <th rowSpan={2} className="p-2 border-r border-slate-300 w-8">ភេទ</th>
              <th rowSpan={2} className="p-2 border-r border-slate-300 min-w-[85px]">ថ្ងៃខែឆ្នាំកំណើត</th>

              {/* 11 Active Subjects */}
              {subjects.map((sub) => (
                <th key={sub.id} colSpan={3} className="p-1.5 border-r border-slate-300 bg-blue-50/60 text-blue-950">
                  <div className="font-bold">{sub.max_score}</div>
                  <div className="text-[10px] text-blue-800 font-normal truncate max-w-[90px] mx-auto" title={sub.name_km}>
                    {sub.name_km}
                  </div>
                </th>
              ))}

              <th rowSpan={2} className="p-2 border-r border-slate-300 bg-amber-50/70 text-amber-950 font-bold w-14">
                ពិន្ទុសរុប
              </th>
              <th rowSpan={2} className="p-2 border-r border-slate-300 bg-amber-50/70 text-amber-950 font-bold w-14">
                មធ្យមភាគ
              </th>
              <th rowSpan={2} className="p-2 border-r border-slate-300 bg-slate-100 font-bold w-10">
                និទ្ទេស
              </th>
              <th rowSpan={2} className="p-2 border-r border-slate-300 bg-blue-100 text-blue-950 font-bold w-12">
                ចំណាត់ថ្នាក់
              </th>
              <th rowSpan={2} className="p-2 border-r border-slate-300 bg-slate-100 font-bold w-14">
                និទ្ទេស
              </th>
              <th rowSpan={2} className="p-2 bg-slate-100 font-bold w-16">
                លទ្ធផល
              </th>
            </tr>

            {/* Sub-header for subject columns: ពិន្ទុ / និទ្ទេស / ចំណាត់ថ្នាក់ */}
            <tr className="bg-slate-50 text-[10px] text-slate-600 border-b border-slate-300 text-center font-medium">
              {subjects.map((sub) => (
                <React.Fragment key={`sub-${sub.id}`}>
                  <th className="p-1 border-r border-slate-200 w-9">ពិន្ទុ</th>
                  <th className="p-1 border-r border-slate-200 w-7">និទ្ទេស</th>
                  <th className="p-1 border-r border-slate-300 w-7">ចំណាត់</th>
                </React.Fragment>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 text-slate-800">
            {filteredStudents.map((st) => {
              const isAbsent = st.result_status === 'អវត្តមាន';
              const isPassed = st.result_status === 'ជាប់';
              const isTop5 = isPassed && st.overall_rank <= 5;

              return (
                <tr
                  key={st.id}
                  className={`hover:bg-blue-50/40 transition-colors ${
                    isTop5
                      ? 'bg-amber-50/30'
                      : isAbsent
                      ? 'bg-slate-50/60 opacity-80'
                      : ''
                  }`}
                >
                  <td className="p-2 border-r border-slate-200 text-center font-mono font-medium text-slate-500">
                    {st.roll_number}
                  </td>
                  <td className="p-2 border-r border-slate-200 font-medium">
                    <button
                      onClick={() => onSelectStudentForBulletin(st.id)}
                      className="text-left hover:text-blue-600 hover:underline flex items-center gap-1.5"
                      title="ចុចដើម្បីមើលព្រឹត្តិបត្រពិន្ទុ"
                    >
                      <span>{st.full_name}</span>
                      {isTop5 && (
                        <span className="px-1 text-[9px] bg-amber-400 text-amber-950 font-bold rounded">
                          #{st.overall_rank}
                        </span>
                      )}
                    </button>
                  </td>
                  <td className={`p-2 border-r border-slate-200 text-center font-semibold ${
                    st.gender === 'ស' ? 'text-pink-600' : 'text-blue-600'
                  }`}>
                    {st.gender}
                  </td>
                  <td className="p-2 border-r border-slate-200 text-center text-[10px] text-slate-600">
                    {st.dob}
                  </td>

                  {/* Subject Scores */}
                  {subjects.map((sub) => {
                    const scoreObj = st.scores[sub.id] || { score: null, is_absent: true };
                    const hasScore = scoreObj.score !== null && !scoreObj.is_absent;
                    const val = hasScore ? scoreObj.score : (scoreObj.is_absent ? 'F' : '0');
                    const rank = sub.student_ranks?.[st.id] ? String(sub.student_ranks[st.id]).padStart(2, '0') : (hasScore ? '01' : '#N/A');

                    // Calculate subject grade
                    let subGrade = 'F';
                    if (hasScore && sub.max_score > 0) {
                      const pct = (scoreObj.score! / sub.max_score) * 100;
                      if (pct >= 80) subGrade = 'A';
                      else if (pct >= 70) subGrade = 'B';
                      else if (pct >= 60) subGrade = 'C';
                      else if (pct >= 50) subGrade = 'D';
                      else if (pct >= 40) subGrade = 'E';
                      else subGrade = 'F';
                    }

                    return (
                      <React.Fragment key={`score-${st.id}-${sub.id}`}>
                        {/* Score value (editable) */}
                        <td
                          onClick={() => handleStartEdit(st, sub)}
                          className="p-1 border-r border-slate-200 text-center font-mono cursor-pointer hover:bg-blue-100 hover:text-blue-800 transition"
                          title="ចុចដើម្បីកែសម្រួលពិន្ទុ"
                        >
                          {hasScore ? (
                            <span className="font-semibold text-slate-900">{scoreObj.score}</span>
                          ) : (
                            <span className="text-slate-400 italic text-[10px]">F</span>
                          )}
                        </td>

                        {/* Grade */}
                        <td className="p-1 border-r border-slate-200 text-center font-mono font-bold text-[10px]">
                          <span
                            className={
                              subGrade === 'A' ? 'text-emerald-600' :
                              subGrade === 'B' ? 'text-blue-600' :
                              subGrade === 'C' ? 'text-cyan-600' :
                              subGrade === 'D' ? 'text-amber-600' :
                              subGrade === 'E' ? 'text-orange-600' : 'text-red-500'
                            }
                          >
                            {subGrade}
                          </span>
                        </td>

                        {/* Subject Rank */}
                        <td className="p-1 border-r border-slate-300 text-center font-mono text-[9px] text-slate-500">
                          {rank}
                        </td>
                      </React.Fragment>
                    );
                  })}

                  {/* Total Score */}
                  <td className="p-2 border-r border-slate-200 text-center font-mono font-bold text-slate-900 bg-amber-50/40">
                    {st.total_score}
                  </td>

                  {/* Average */}
                  <td className="p-2 border-r border-slate-200 text-center font-mono font-bold text-blue-900 bg-amber-50/40">
                    {st.average_score.toFixed(2)}
                  </td>

                  {/* Overall Grade Letter */}
                  <td className="p-2 border-r border-slate-200 text-center font-bold">
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-mono ${
                        st.overall_grade === 'A' ? 'bg-emerald-100 text-emerald-800' :
                        st.overall_grade === 'B' ? 'bg-blue-100 text-blue-800' :
                        st.overall_grade === 'C' ? 'bg-cyan-100 text-cyan-800' :
                        st.overall_grade === 'D' ? 'bg-amber-100 text-amber-800' :
                        st.overall_grade === 'E' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      {st.overall_grade}
                    </span>
                  </td>

                  {/* Overall Rank */}
                  <td className="p-2 border-r border-slate-200 text-center font-bold">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-mono ${
                        st.overall_rank === 1 ? 'bg-amber-400 text-amber-950 ring-2 ring-amber-300 font-extrabold' :
                        st.overall_rank === 2 ? 'bg-slate-300 text-slate-900 font-bold' :
                        st.overall_rank === 3 ? 'bg-amber-700 text-amber-100 font-bold' :
                        isAbsent ? 'bg-slate-100 text-slate-400' : 'bg-blue-50 text-blue-900'
                      }`}
                    >
                      {st.overall_rank}
                    </span>
                  </td>

                  {/* Mention */}
                  <td className="p-2 border-r border-slate-200 text-center text-[10px]">
                    {st.average_score >= 45 ? 'ល្អប្រសើរ' :
                     st.average_score >= 40 ? 'ល្អ' :
                     st.average_score >= 35 ? 'ល្អបង្គួរ' :
                     st.average_score >= 30 ? 'ល្អបង្គួរ' :
                     st.average_score >= 25 ? 'មធ្យម' : 'ខ្សោយ'}
                  </td>

                  {/* Result Status */}
                  <td className="p-2 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        st.result_status === 'ជាប់'
                          ? 'bg-emerald-100 text-emerald-800'
                          : st.result_status === 'ធ្លាក់'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {st.result_status === 'ជាប់' ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      ) : st.result_status === 'ធ្លាក់' ? (
                        <XCircle className="w-3 h-3 text-red-600" />
                      ) : (
                        <AlertCircle className="w-3 h-3 text-slate-500" />
                      )}
                      <span>{st.result_status}</span>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Official Summary Statistics Box matching Page 2 */}
      <div className="p-6 bg-slate-50/70 border-t border-slate-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-800">
          {/* Grade Distribution */}
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs space-y-2">
            <h3 className="font-bold text-slate-900 border-b border-slate-200 pb-1.5 flex items-center justify-between">
              <span>ស្ថិតិតាមនិទ្ទេស (Grade Distribution)</span>
              <span className="text-[11px] font-normal text-slate-500">អនុវត្តតាមកម្រិតស្ដង់ដា</span>
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
              <div className="flex justify-between py-0.5 border-b border-dashed border-slate-100">
                <span>ចំនួនសិស្សមាននិទ្ទេស A:</span>
                <span className="font-mono font-bold">{String(statistics.grades_count['A'] || 0).padStart(2, '0')} នាក់ (ស្រី {String(statistics.grades_female['A'] || 0).padStart(2, '0')} នាក់)</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-dashed border-slate-100">
                <span>ចំនួនសិស្សមាននិទ្ទេស B:</span>
                <span className="font-mono font-bold text-blue-700">{String(statistics.grades_count['B'] || 0).padStart(2, '0')} នាក់ (ស្រី {String(statistics.grades_female['B'] || 0).padStart(2, '0')} នាក់)</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-dashed border-slate-100">
                <span>ចំនួនសិស្សមាននិទ្ទេស C:</span>
                <span className="font-mono font-bold text-cyan-700">{String(statistics.grades_count['C'] || 0).padStart(2, '0')} នាក់ (ស្រី {String(statistics.grades_female['C'] || 0).padStart(2, '0')} នាក់)</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-dashed border-slate-100">
                <span>ចំនួនសិស្សមាននិទ្ទេស D:</span>
                <span className="font-mono font-bold text-amber-700">{String(statistics.grades_count['D'] || 0).padStart(2, '0')} នាក់ (ស្រី {String(statistics.grades_female['D'] || 0).padStart(2, '0')} នាក់)</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-dashed border-slate-100">
                <span>ចំនួនសិស្សមាននិទ្ទេស E:</span>
                <span className="font-mono font-bold text-orange-700">{String(statistics.grades_count['E'] || 0).padStart(2, '0')} នាក់ (ស្រី {String(statistics.grades_female['E'] || 0).padStart(2, '0')} នាក់)</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-dashed border-slate-100">
                <span>ចំនួនសិស្សមាននិទ្ទេស F:</span>
                <span className="font-mono font-bold text-red-600">{String(statistics.grades_count['F'] || 0).padStart(2, '0')} នាក់ (ស្រី {String(statistics.grades_female['F'] || 0).padStart(2, '0')} នាក់)</span>
              </div>
            </div>
            <div className="pt-2 flex justify-between font-bold text-slate-900 border-t border-slate-200">
              <span>សរុបទាំងអស់:</span>
              <span className="font-mono text-blue-900">{statistics.total_students} នាក់ (ក្នុងនោះស្រី {statistics.female_students} នាក់)</span>
            </div>
          </div>

          {/* Pass / Fail / Absent Overview */}
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs space-y-3">
            <h3 className="font-bold text-slate-900 border-b border-slate-200 pb-1.5 flex items-center justify-between">
              <span>លទ្ធផលនៃការប្រឡង (Exam Results)</span>
              <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                អត្រាជាប់: {((statistics.passed_students / statistics.total_students) * 100).toFixed(1)}%
              </span>
            </h3>

            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 rounded-lg bg-emerald-50 border border-emerald-200/60 text-emerald-950">
                <span className="font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>ចំនួនសិស្សជាប់:</span>
                </span>
                <span className="font-mono font-bold text-sm">
                  {String(statistics.passed_students).padStart(2, '0')} នាក់ <span className="text-xs font-normal text-emerald-800">(ស្រី {String(statistics.passed_female).padStart(2, '0')} នាក់)</span>
                </span>
              </div>

              <div className="flex justify-between items-center p-2 rounded-lg bg-red-50 border border-red-200/60 text-red-950">
                <span className="font-medium flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-red-600" />
                  <span>ចំនួនសិស្សធ្លាក់:</span>
                </span>
                <span className="font-mono font-bold text-sm">
                  {String(statistics.failed_students).padStart(2, '0')} នាក់ <span className="text-xs font-normal text-red-800">(ស្រី {String(statistics.failed_female).padStart(2, '0')} នាក់)</span>
                </span>
              </div>

              <div className="flex justify-between items-center p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-800">
                <span className="font-medium flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-slate-500" />
                  <span>ចំនួនសិស្សអវត្តមាន:</span>
                </span>
                <span className="font-mono font-bold text-sm">
                  {String(statistics.absent_students).padStart(2, '0')} នាក់ <span className="text-xs font-normal text-slate-600">(ស្រី {String(statistics.absent_female).padStart(2, '0')} នាក់)</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Official Signatures matching Page 2 */}
        <div className="mt-8 pt-6 border-t border-slate-300 grid grid-cols-1 sm:grid-cols-2 gap-8 text-center text-xs">
          <div>
            <div className="text-slate-600 font-serif mb-1">{school_info.exam_date_lunar}</div>
            <div className="text-slate-600 font-serif mb-2">ទួលទទឹង {school_info.exam_date_solar}</div>
            <div className="font-bold text-slate-900 mb-1">បានឃើញ និងឯកភាព</div>
            <div className="font-semibold text-slate-700 mb-14">នាយកសាលា</div>
            <div className="border-t border-dashed border-slate-300 w-44 mx-auto pt-1 text-slate-400 italic">
              ហត្ថលេខា និងត្រា
            </div>
          </div>

          <div>
            <div className="text-slate-600 font-serif mb-1">{school_info.exam_date_lunar}</div>
            <div className="text-slate-600 font-serif mb-2">ទួលទទឹង {school_info.exam_date_solar}</div>
            <div className="font-bold text-slate-900 mb-1">គ្រូទទួលបន្ទុកថ្នាក់</div>
            <div className="font-semibold text-blue-900 text-sm mb-14 font-serif">{school_info.teacher_name}</div>
            <div className="border-t border-dashed border-slate-300 w-44 mx-auto pt-1 text-slate-400 italic">
              ហត្ថលេខា
            </div>
          </div>
        </div>
      </div>

      {/* Edit Score Modal */}
      {editingCell && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-5 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-blue-600" />
                <span>កែសម្រួលពិន្ទុ</span>
              </div>
              <button
                onClick={() => setEditingCell(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div>
                <label className="text-slate-500 font-medium">សិស្ស:</label>
                <div className="text-sm font-bold text-slate-900 mt-0.5">{editingCell.studentName}</div>
              </div>

              <div>
                <label className="text-slate-500 font-medium">មុខវិជ្ជា:</label>
                <div className="text-sm font-semibold text-blue-900 mt-0.5">
                  {editingCell.subjectName} (ពិន្ទុអតិបរមា: {editingCell.maxScore})
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer mb-2">
                  <input
                    type="checkbox"
                    checked={inputAbsent}
                    onChange={(e) => {
                      setInputAbsent(e.target.checked);
                      if (e.target.checked) setInputScore('');
                    }}
                    className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span className="text-slate-700 font-medium">អវត្តមានមុខវិជ្ជានេះ (Absent / F)</span>
                </label>

                {!inputAbsent && (
                  <div>
                    <label className="text-slate-700 font-medium block mb-1">
                      ពិន្ទុដែលទទួលបាន (០ ដល់ {editingCell.maxScore}):
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min={0}
                      max={editingCell.maxScore}
                      value={inputScore}
                      onChange={(e) => setInputScore(e.target.value)}
                      placeholder={`០ - ${editingCell.maxScore}`}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      autoFocus
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setEditingCell(null)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                បោះបង់
              </button>
              <button
                type="button"
                onClick={handleSaveScore}
                disabled={isSaving}
                className="px-4 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center gap-1.5 shadow-xs disabled:opacity-50"
              >
                {isSaving ? (
                  <span>កំពុងគណនា...</span>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>រក្សាទុក & គណនាឡើងវិញ</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
