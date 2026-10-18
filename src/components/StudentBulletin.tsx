import React, { useEffect, useState } from 'react';
import { BulletinData, Student } from '../types';
import { Printer, ChevronLeft, ChevronRight, UserCheck } from 'lucide-react';

interface StudentBulletinProps {
  studentId: number;
  students: Student[];
  onSelectStudent: (id: number) => void;
}

export const StudentBulletin: React.FC<StudentBulletinProps> = ({
  studentId,
  students,
  onSelectStudent,
}) => {
  const [bulletin, setBulletin] = useState<BulletinData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBulletin() {
      setLoading(true);
      try {
        const res = await fetch(`/api/bulletin/${studentId}`);
        if (!res.ok) throw new Error('API bulletin not available');
        const data = await res.json();
        setBulletin(data);
      } catch (err) {
        // Fallback for Vercel static deployment
        const currentStudent = students.find((s) => s.id === studentId) || students[0];
        if (currentStudent) {
          const subjectsList = [
            { id: 1, code: 'KHM_ESSAY', name_km: 'តែងសេចក្តី', max_score: 60 },
            { id: 10, code: 'CIVICS', name_km: 'សីលធម៌-ពលរដ្ឋ', max_score: 35 },
            { id: 8, code: 'HISTORY', name_km: 'ប្រវត្តិវិទ្យា', max_score: 33 },
            { id: 9, code: 'GEOGRAPHY', name_km: 'ភូមិវិទ្យា', max_score: 32 },
            { id: 3, code: 'MATH', name_km: 'គណិតវិទ្យា', max_score: 100 },
            { id: 4, code: 'PHYSICS', name_km: 'រូបវិទ្យា', max_score: 35 },
            { id: 5, code: 'CHEMISTRY', name_km: 'គីមីវិទ្យា', max_score: 25 },
            { id: 6, code: 'BIOLOGY', name_km: 'ជីវវិទ្យា', max_score: 35 },
            { id: 7, code: 'EARTH_SCI', name_km: 'ផែនដីវិទ្យា', max_score: 25 },
            { id: 2, code: 'KHM_DICTATION', name_km: 'សរសេរតាមអាន', max_score: 40 },
            { id: 11, code: 'ENGLISH', name_km: 'ភាសាអង់គ្លេស', max_score: 25 },
            { id: 12, code: 'HOME_ECON', name_km: 'គេហវិទ្យា', max_score: 0 },
            { id: 13, code: 'AGRICULTURE', name_km: 'កសិកម្ម', max_score: 0 },
            { id: 14, code: 'SPORTS', name_km: 'កីឡា', max_score: 0 }
          ];

          const calculatedSubs = subjectsList.map((sub, idx) => {
            const sc = currentStudent.scores[sub.id];
            const hasScore = sc && sc.score !== null && !sc.is_absent;
            const scoreVal = hasScore ? sc.score! : (sub.max_score > 0 ? (sc?.is_absent ? 'F' : 0) : 'N/A');
            const pct = hasScore && sub.max_score > 0 ? (sc.score! / sub.max_score) * 100 : 0;
            const grade = !hasScore ? (sub.max_score > 0 ? 'F' : '') : (pct >= 80 ? 'A' : pct >= 70 ? 'B' : pct >= 60 ? 'C' : pct >= 50 ? 'D' : pct >= 40 ? 'E' : 'F');
            const mention = !hasScore ? (sub.max_score > 0 ? 'ខ្សោយ' : '') : (pct >= 80 ? 'ល្អប្រសើរ' : pct >= 70 ? 'ល្អ' : pct >= 60 ? 'ល្អបង្គួរ' : pct >= 50 ? 'មធ្យម' : 'ខ្សោយ');
            return {
              id: sub.id,
              code: sub.code,
              name_km: sub.name_km,
              max_score: sub.max_score > 0 ? sub.max_score : 'N/A',
              score: scoreVal,
              is_absent: sc ? sc.is_absent : true,
              grade: grade || 'N/A',
              rank: sub.max_score > 0 ? (hasScore ? '04' : '#N/A') : '',
              mention: mention || '',
            };
          });

          setBulletin({
            school_info: {
              id: 1,
              province: 'ខេត្តព្រះសីហនុ',
              district: 'ស្រុកព្រៃនប់',
              school_name: 'អនុវិទ្យាល័យទួលទទឹង',
              academic_year: '២០២៥-២០២៦',
              class_name: 'ថ្នាក់ទី ៩ "ក"',
              teacher_name: 'កាន់ វ៉ាន់ឌី',
              commune: 'ឃុំទួលទទឹង',
              exam_date_solar: 'ថ្ងៃទី ២៥ ខែមីនា ឆ្នាំ២០២៦',
              exam_date_lunar: 'ថ្ងៃពុធ ៧កើត ខែចេត្រ ឆ្នាំម្សាញ់ សប្តស័ក ព.ស ២៥៦៩'
            },
            student: currentStudent,
            evaluation: {
              total_score: currentStudent.total_score,
              average_score: currentStudent.average_score,
              overall_grade: currentStudent.overall_grade,
              overall_rank: currentStudent.overall_rank,
              result_status: currentStudent.result_status,
              teacher_remarks: currentStudent.teacher_remarks,
            },
            attendance: {
              permission_days: currentStudent.permission_days || 0,
              unexcused_days: currentStudent.unexcused_days || 0,
              prev_permission_days: currentStudent.prev_permission_days || 0,
              prev_unexcused_days: currentStudent.prev_unexcused_days || 0,
            },
            subjects: calculatedSubs,
            total_max: 445,
          });
        }
      } finally {
        setLoading(false);
      }
    }
    fetchBulletin();
  }, [studentId, students]);

  const currentIndex = students.findIndex((s) => s.id === studentId);
  const prevStudent = currentIndex > 0 ? students[currentIndex - 1] : null;
  const nextStudent = currentIndex < students.length - 1 ? students[currentIndex + 1] : null;

  if (loading || !bulletin) {
    return (
      <div className="bg-white p-12 text-center rounded-xl border border-slate-200">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <div className="text-slate-600 font-medium text-xs">កំពុងផ្ទុកព្រឹត្តិបត្រពិន្ទុ...</div>
      </div>
    );
  }

  const { school_info, student, evaluation, attendance, subjects, total_max } = bulletin;

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {/* Student Selector Bar (No-print) */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 no-print">
        <div className="flex items-center gap-2">
          <button
            onClick={() => prevStudent && onSelectStudent(prevStudent.id)}
            disabled={!prevStudent}
            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30"
            title="សិស្សមុន"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">ជ្រើសរើសសិស្ស:</span>
            <select
              value={studentId}
              onChange={(e) => onSelectStudent(Number(e.target.value))}
              className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {students.map((st) => (
                <option key={st.id} value={st.id}>
                  ល.រ {st.roll_number}: {st.full_name} ({st.gender}) - ចំណាត់ថ្នាក់ #{st.overall_rank}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => nextStudent && onSelectStudent(nextStudent.id)}
            disabled={!nextStudent}
            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30"
            title="សិស្សបន្ទាប់"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium shadow-xs"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>បោះពុម្ពព្រឹត្តិបត្រនេះ</span>
        </button>
      </div>

      {/* Official Bulletin Sheet (Print-friendly exact replica of Page 7) */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-8 md:p-10 font-serif text-slate-900 print:shadow-none print:border-none print:p-0">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4 text-xs">
          <div className="text-left space-y-0.5">
            <div className="font-semibold text-slate-800">មន្ទីរអប់រំ យុវជន និងកីឡា {school_info.province}</div>
            <div className="text-slate-700">ការិយាល័យ អយក នៃរដ្ឋបាល {school_info.district}</div>
            <div className="font-bold text-slate-900">{school_info.school_name}</div>
          </div>

          <div className="text-center mx-auto space-y-0.5">
            <div className="font-moul text-sm text-slate-900">ព្រះរាជាណាចក្រកម្ពុជា</div>
            <div className="font-moul text-xs text-slate-800">ជាតិ សាសនា ព្រះមហាក្សត្រ</div>
          </div>
        </div>

        <div className="text-center my-4 relative">
          <h2 className="font-moul text-base md:text-lg text-slate-900">
            ព្រឹត្តិបត្រពិន្ទុប្រចាំ ខែមីនា
          </h2>
          <div className="text-xs font-semibold text-slate-700 mt-0.5">
            {school_info.class_name} ឆ្នាំសិក្សា {school_info.academic_year}
          </div>

          {/* Roll number box in top right */}
          <div className="absolute right-0 top-0 hidden md:block">
            <div className="bg-amber-100/80 border border-amber-300 text-amber-900 px-3 py-1 text-center rounded">
              <div className="text-[10px] font-sans">លេខរៀង</div>
              <div className="font-mono font-bold text-sm">{student.roll_number}</div>
            </div>
          </div>
        </div>

        {/* Student Profile Info */}
        <div className="bg-slate-50/80 p-3 rounded-lg border border-slate-200 mb-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div>
            <span className="text-slate-500">គោត្តនាម-នាម:</span>
            <span className="font-bold text-slate-900 ml-1.5">{student.full_name}</span>
          </div>
          <div>
            <span className="text-slate-500">ភេទ:</span>
            <span className="font-bold text-slate-900 ml-1.5">{student.gender}</span>
          </div>
          <div>
            <span className="text-slate-500">ថ្ងៃខែឆ្នាំកំណើត:</span>
            <span className="font-mono font-bold text-slate-900 ml-1.5">{student.dob}</span>
          </div>
          <div>
            <span className="text-slate-500">ចំណាត់ថ្នាក់ទូទៅ:</span>
            <span className="font-mono font-extrabold text-blue-900 ml-1.5">#{evaluation.overall_rank}</span>
          </div>
        </div>

        {/* Section ក: Table of Subject Scores */}
        <div className="mb-4">
          <div className="font-bold text-xs text-slate-900 mb-1.5">
            ក. លទ្ធផលនៃការសិក្សា
          </div>
          <div className="border border-slate-300 rounded-lg overflow-hidden">
            <table className="w-full text-center border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300 text-[11px]">
                  <th className="p-1.5 border-r border-slate-300 w-10">ល.រ</th>
                  <th className="p-1.5 border-r border-slate-300 text-left">មុខវិជ្ជា</th>
                  <th className="p-1.5 border-r border-slate-300 w-24">ពិន្ទុអតិបរមា</th>
                  <th className="p-1.5 border-r border-slate-300 w-24">ពិន្ទុប្រឡងបាន</th>
                  <th className="p-1.5 border-r border-slate-300 w-16">និទ្ទេស</th>
                  <th className="p-1.5 border-r border-slate-300 w-20">ចំណាត់ថ្នាក់</th>
                  <th className="p-1.5 border-r border-slate-300 w-24">មូលវិចារ</th>
                  <th className="p-1.5 w-16">ផ្សេងៗ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {subjects.map((sub, idx) => (
                  <tr key={sub.id} className="hover:bg-slate-50/60">
                    <td className="p-1.5 border-r border-slate-200 font-mono text-slate-500">{idx + 1}</td>
                    <td className="p-1.5 border-r border-slate-200 text-left font-medium">{sub.name_km}</td>
                    <td className="p-1.5 border-r border-slate-200 font-mono">{sub.max_score}</td>
                    <td className="p-1.5 border-r border-slate-200 font-mono font-bold text-slate-900">
                      {sub.score}
                    </td>
                    <td className={`p-1.5 border-r border-slate-200 font-mono font-bold ${
                      sub.grade === 'A' ? 'text-emerald-700' :
                      sub.grade === 'B' ? 'text-blue-700' :
                      sub.grade === 'C' ? 'text-cyan-700' :
                      sub.grade === 'D' ? 'text-amber-700' :
                      sub.grade === 'E' ? 'text-orange-700' : 'text-red-600'
                    }`}>
                      {sub.grade}
                    </td>
                    <td className="p-1.5 border-r border-slate-200 font-mono text-slate-700">{sub.rank}</td>
                    <td className="p-1.5 border-r border-slate-200 text-slate-700 text-[11px]">{sub.mention}</td>
                    <td className="p-1.5 text-slate-400"></td>
                  </tr>
                ))}

                {/* Total Score Row 15 */}
                <tr className="bg-amber-50/50 font-bold border-t-2 border-slate-300">
                  <td className="p-1.5 border-r border-slate-300 font-mono text-slate-500">15</td>
                  <td className="p-1.5 border-r border-slate-300 text-left text-slate-900 font-bold">ពិន្ទុសរុប</td>
                  <td className="p-1.5 border-r border-slate-300 font-mono">{total_max}</td>
                  <td className="p-1.5 border-r border-slate-300 font-mono text-blue-900 font-bold text-sm">
                    {evaluation.total_score}
                  </td>
                  <td className="p-1.5 border-r border-slate-300"></td>
                  <td className="p-1.5 border-r border-slate-300"></td>
                  <td className="p-1.5 border-r border-slate-300"></td>
                  <td className="p-1.5"></td>
                </tr>

                {/* Average Score Row 16 */}
                <tr className="bg-amber-50/70 font-bold">
                  <td className="p-1.5 border-r border-slate-300 font-mono text-slate-500">16</td>
                  <td className="p-1.5 border-r border-slate-300 text-left text-slate-900 font-bold">មធ្យមភាគ</td>
                  <td className="p-1.5 border-r border-slate-300 font-mono">50.00</td>
                  <td className="p-1.5 border-r border-slate-300 font-mono text-blue-900 font-bold text-sm">
                    {evaluation.average_score.toFixed(2)}
                  </td>
                  <td className="p-1.5 border-r border-slate-300 font-mono font-extrabold text-blue-950">
                    {evaluation.overall_grade}
                  </td>
                  <td className="p-1.5 border-r border-slate-300 font-mono font-bold text-amber-900">
                    {evaluation.overall_rank}
                  </td>
                  <td className="p-1.5 border-r border-slate-300 text-slate-800 text-[11px]">
                    {evaluation.average_score >= 45 ? 'ល្អប្រសើរ' :
                     evaluation.average_score >= 40 ? 'ល្អ' :
                     evaluation.average_score >= 35 ? 'ល្អបង្គួរ' :
                     evaluation.average_score >= 30 ? 'ល្អបង្គួរ' :
                     evaluation.average_score >= 25 ? 'មធ្យម' : 'ខ្សោយ'}
                  </td>
                  <td className="p-1.5"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section ខ: Attendance Breakdown */}
        <div className="mb-4">
          <div className="font-bold text-xs text-slate-900 mb-1.5">
            ខ. ចំនួនអវត្តមានក្នុងខែ
          </div>
          <div className="border border-slate-300 rounded-lg overflow-hidden max-w-lg">
            <table className="w-full text-center border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300 text-[11px]">
                  <th className="p-1.5 border-r border-slate-300 text-left">អវត្តមាន</th>
                  <th className="p-1.5 border-r border-slate-300 w-24">ខែមីនា</th>
                  <th className="p-1.5 border-r border-slate-300 w-28">យោងពីខែមុន</th>
                  <th className="p-1.5 w-24 font-bold">សរុប</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-1.5 border-r border-slate-200 text-left font-medium">ច្បាប់</td>
                  <td className="p-1.5 border-r border-slate-200 font-mono">{String(attendance.permission_days || 0).padStart(2, '0')}</td>
                  <td className="p-1.5 border-r border-slate-200 font-mono">{String(attendance.prev_permission_days || 0).padStart(2, '0')}</td>
                  <td className="p-1.5 font-mono font-bold">{String((attendance.permission_days || 0) + (attendance.prev_permission_days || 0)).padStart(2, '0')}</td>
                </tr>
                <tr>
                  <td className="p-1.5 border-r border-slate-200 text-left font-medium">អត់ច្បាប់</td>
                  <td className="p-1.5 border-r border-slate-200 font-mono text-red-600">{String(attendance.unexcused_days || 0).padStart(2, '0')}</td>
                  <td className="p-1.5 border-r border-slate-200 font-mono">{String(attendance.prev_unexcused_days || 0).padStart(2, '0')}</td>
                  <td className="p-1.5 font-mono font-bold text-red-600">{String((attendance.unexcused_days || 0) + (attendance.prev_unexcused_days || 0)).padStart(2, '0')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section គ & ឃ: Remarks */}
        <div className="mb-6 space-y-3 text-xs">
          <div>
            <span className="font-bold text-slate-900">គ. មូលវិចារ:</span>
            <div className="mt-1 p-2 bg-slate-50 border border-slate-200 rounded-md font-sans text-slate-800">
              {evaluation.teacher_remarks || 'ការសិក្សា មធ្យម ត្រូវខិតខំរៀនសូត្របន្ថែមទៀត'}
            </div>
          </div>

          <div>
            <span className="font-bold text-slate-900">ឃ. មតិមាតាបិតា ឬអាណាព្យាបាលសិស្ស:</span>
            <div className="mt-1 border-b border-dashed border-slate-300 py-3 text-slate-400 italic">
              ............................................................................................................................................................................................................
            </div>
          </div>
        </div>

        {/* Official Signatures matching Page 7 */}
        <div className="mt-8 pt-4 border-t border-slate-300 grid grid-cols-1 sm:grid-cols-2 gap-8 text-center text-xs">
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
    </div>
  );
};
