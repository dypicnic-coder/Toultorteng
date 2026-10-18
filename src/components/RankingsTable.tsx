import React from 'react';
import { ClassOverview } from '../types';
import { Trophy, Award, Medal } from 'lucide-react';

interface RankingsTableProps {
  overview: ClassOverview;
  onSelectStudent: (studentId: number) => void;
}

export const RankingsTable: React.FC<RankingsTableProps> = ({
  overview,
  onSelectStudent,
}) => {
  const { school_info, students } = overview;

  // Sort students by rank ascending, then by roll_number
  const sortedStudents = [...students].sort((a, b) => {
    if (a.overall_rank !== b.overall_rank) {
      return a.overall_rank - b.overall_rank;
    }
    return a.roll_number - b.roll_number;
  });

  const leftList = sortedStudents.slice(0, 16);
  const rightList = sortedStudents.slice(16);

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 md:p-8 max-w-5xl mx-auto">
      {/* Official Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4 text-xs font-serif">
        <div className="text-left space-y-0.5">
          <div className="font-semibold text-slate-800">មន្ទីរអប់រំ យុវជន និងកីឡា {school_info.province}</div>
          <div className="text-slate-700">ការិយាល័យ អយក នៃរដ្ឋបាល {school_info.district}</div>
          <div className="font-bold text-slate-900">{school_info.school_name}</div>
        </div>

        <div className="text-center mx-auto space-y-0.5">
          <div className="font-moul text-sm text-slate-900">ព្រះរាជាណាចក្រកម្ពុជា</div>
          <div className="font-moul text-xs text-slate-800">ជាតិ សាសនា ព្រះមហាក្សត្រ</div>
        </div>

        <div className="text-right">
          <span className="inline-block px-3 py-1 bg-amber-500 text-white font-bold rounded-md text-xs shadow-2xs">
            សិស្សសរុប {school_info.class_name ? students.length : 31}
          </span>
        </div>
      </div>

      <div className="text-center my-6">
        <h2 className="font-moul text-lg md:text-xl text-blue-950">
          តារាងចំណាត់ថ្នាក់ប្រចាំ ខែមីនា
        </h2>
        <div className="text-xs md:text-sm font-semibold text-slate-700 mt-1">
          {school_info.class_name} ឆ្នាំសិក្សា {school_info.academic_year}
        </div>
      </div>

      {/* Dual Column Layout matching Page 4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Left Column (1 to 16) */}
        <div className="border border-slate-300 rounded-lg overflow-hidden">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300 text-[11px]">
                <th className="p-2 border-r border-slate-300 w-10">ល.រ</th>
                <th className="p-2 border-r border-slate-300 text-left">គោត្តនាម នាម</th>
                <th className="p-2 border-r border-slate-300 w-10">ភេទ</th>
                <th className="p-2 border-r border-slate-300 w-16">មធ្យមភាគ</th>
                <th className="p-2 w-16">ចំណាត់ថ្នាក់</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {leftList.map((st, idx) => {
                const displayNo = idx + 1;
                return (
                  <tr
                    key={st.id}
                    onClick={() => onSelectStudent(st.id)}
                    className={`hover:bg-blue-50 cursor-pointer transition ${
                      st.overall_rank === 1
                        ? 'bg-amber-100/50 font-bold'
                        : st.overall_rank <= 3
                        ? 'bg-amber-50/40'
                        : ''
                    }`}
                  >
                    <td className="p-2 border-r border-slate-200 font-mono text-slate-500">{displayNo}</td>
                    <td className="p-2 border-r border-slate-200 text-left font-medium text-slate-900 flex items-center justify-between">
                      <span>{st.full_name}</span>
                      {st.overall_rank === 1 && <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0 inline ml-1" />}
                      {st.overall_rank === 2 && <Medal className="w-3.5 h-3.5 text-slate-400 shrink-0 inline ml-1" />}
                      {st.overall_rank === 3 && <Award className="w-3.5 h-3.5 text-amber-700 shrink-0 inline ml-1" />}
                    </td>
                    <td className={`p-2 border-r border-slate-200 font-semibold ${st.gender === 'ស' ? 'text-pink-600' : 'text-blue-600'}`}>
                      {st.gender}
                    </td>
                    <td className="p-2 border-r border-slate-200 font-mono font-bold text-blue-900">
                      {st.average_score.toFixed(2)}
                    </td>
                    <td className="p-2 font-mono font-bold">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs ${
                        st.overall_rank <= 5 ? 'bg-amber-400 text-amber-950 font-extrabold' : 'text-slate-800'
                      }`}>
                        {st.overall_rank}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Right Column (17 to 31) */}
        <div className="border border-slate-300 rounded-lg overflow-hidden">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300 text-[11px]">
                <th className="p-2 border-r border-slate-300 w-10">ល.រ</th>
                <th className="p-2 border-r border-slate-300 text-left">គោត្តនាម នាម</th>
                <th className="p-2 border-r border-slate-300 w-10">ភេទ</th>
                <th className="p-2 border-r border-slate-300 w-16">មធ្យមភាគ</th>
                <th className="p-2 w-16">ចំណាត់ថ្នាក់</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {rightList.map((st, idx) => {
                const displayNo = idx + 17;
                const isZero = st.average_score === 0;
                return (
                  <tr
                    key={st.id}
                    onClick={() => onSelectStudent(st.id)}
                    className={`hover:bg-blue-50 cursor-pointer transition ${
                      isZero ? 'bg-slate-50/70 text-slate-400' : ''
                    }`}
                  >
                    <td className="p-2 border-r border-slate-200 font-mono text-slate-500">{displayNo}</td>
                    <td className="p-2 border-r border-slate-200 text-left font-medium text-slate-900">
                      {st.full_name}
                    </td>
                    <td className={`p-2 border-r border-slate-200 font-semibold ${st.gender === 'ស' ? 'text-pink-600' : 'text-blue-600'}`}>
                      {st.gender}
                    </td>
                    <td className="p-2 border-r border-slate-200 font-mono font-bold text-slate-700">
                      {st.average_score.toFixed(2)}
                    </td>
                    <td className="p-2 font-mono font-bold text-slate-800">
                      {st.overall_rank}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Signatures matching Page 4 */}
      <div className="mt-12 pt-6 border-t border-slate-300 grid grid-cols-1 sm:grid-cols-2 gap-8 text-center text-xs">
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
  );
};
