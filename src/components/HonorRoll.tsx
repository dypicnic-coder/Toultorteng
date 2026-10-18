import React from 'react';
import { SchoolInfo, Student } from '../types';
import { Trophy, Award, Sparkles, Star } from 'lucide-react';

interface HonorRollProps {
  schoolInfo: SchoolInfo;
  topStudents: Student[];
  onSelectStudent: (id: number) => void;
}

export const HonorRoll: React.FC<HonorRollProps> = ({
  schoolInfo,
  topStudents,
  onSelectStudent,
}) => {
  // Extract top 5 from students array
  const rank1 = topStudents[0];
  const rank2 = topStudents[1];
  const rank3 = topStudents[2];
  const rank4 = topStudents[3];
  const rank5 = topStudents[4];

  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-300 p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden">
      {/* Decorative Gold Border Corners */}
      <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-500 rounded-tl-lg pointer-events-none"></div>
      <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-500 rounded-tr-lg pointer-events-none"></div>
      <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-500 rounded-bl-lg pointer-events-none"></div>
      <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-500 rounded-br-lg pointer-events-none"></div>

      {/* Official Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6 text-xs font-serif">
        <div className="text-left space-y-0.5">
          <div className="font-semibold text-slate-800">មន្ទីរអប់រំ យុវជន និងកីឡា {schoolInfo.province}</div>
          <div className="text-slate-700">ការិយាល័យ អយក នៃរដ្ឋបាល {schoolInfo.district}</div>
          <div className="font-bold text-slate-900">{schoolInfo.school_name}</div>
        </div>

        <div className="text-center mx-auto space-y-0.5">
          <div className="font-moul text-sm text-slate-900">ព្រះរាជាណាចក្រកម្ពុជា</div>
          <div className="font-moul text-xs text-slate-800">ជាតិ សាសនា ព្រះមហាក្សត្រ</div>
        </div>
      </div>

      {/* Poster Title */}
      <div className="text-center my-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold mb-2">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>តារាងកិត្តិយសសិស្សពូកែប្រចាំខែ</span>
        </div>
        <h1 className="font-moul text-2xl md:text-3xl text-red-700 tracking-wide drop-shadow-xs">
          តារាងកិត្តិយសប្រចាំ ខែមីនា
        </h1>
        <div className="text-base font-bold text-slate-800 mt-2 font-serif">
          {schoolInfo.class_name} ឆ្នាំសិក្សា {schoolInfo.academic_year}
        </div>
      </div>

      {/* Honor Students Podium Grid matching Page 5 */}
      <div className="space-y-8 my-10 max-w-2xl mx-auto">
        {/* RANK 1 - Central Huge Card */}
        {rank1 && (
          <div 
            onClick={() => onSelectStudent(rank1.id)}
            className="flex flex-col items-center cursor-pointer group transform hover:-translate-y-1 transition duration-200"
          >
            <div className="font-serif font-black text-6xl md:text-7xl text-red-600 mb-1 drop-shadow-md select-none group-hover:scale-105 transition">
              1
            </div>
            <div className="relative w-full max-w-md bg-gradient-to-r from-emerald-50 via-white to-emerald-50 border-3 border-emerald-600 rounded-xl px-8 py-3.5 shadow-md text-center group-hover:border-amber-500 transition">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 px-3 py-0.5 rounded-full text-[11px] font-bold shadow-xs flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5" />
                <span>ចំណាត់ថ្នាក់លេខ ១</span>
              </div>
              <div className="font-moul text-xl md:text-2xl text-emerald-800 tracking-wide mt-1">
                {rank1.full_name}
              </div>
              <div className="text-xs text-slate-600 font-serif mt-0.5">
                ពិន្ទុសរុប: <span className="font-mono font-bold text-slate-900">{rank1.total_score}</span> | 
                មធ្យមភាគ: <span className="font-mono font-bold text-blue-800">{rank1.average_score.toFixed(2)}</span> ({rank1.overall_grade})
              </div>
            </div>
          </div>
        )}

        {/* RANK 2 & RANK 3 - Side by Side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          {/* RANK 2 */}
          {rank2 && (
            <div 
              onClick={() => onSelectStudent(rank2.id)}
              className="flex flex-col items-center cursor-pointer group transform hover:-translate-y-1 transition duration-200"
            >
              <div className="font-serif font-black text-5xl md:text-6xl text-red-600 mb-1 select-none">
                2
              </div>
              <div className="relative w-full bg-gradient-to-r from-blue-50/50 via-white to-blue-50/50 border-2 border-emerald-700 rounded-xl px-4 py-3 shadow-sm text-center group-hover:border-blue-500 transition">
                <div className="font-moul text-base md:text-lg text-emerald-800 tracking-wide">
                  {rank2.full_name}
                </div>
                <div className="text-[11px] text-slate-600 font-serif mt-0.5">
                  មធ្យមភាគ: <span className="font-mono font-bold text-blue-900">{rank2.average_score.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* RANK 3 */}
          {rank3 && (
            <div 
              onClick={() => onSelectStudent(rank3.id)}
              className="flex flex-col items-center cursor-pointer group transform hover:-translate-y-1 transition duration-200"
            >
              <div className="font-serif font-black text-5xl md:text-6xl text-red-600 mb-1 select-none">
                3
              </div>
              <div className="relative w-full bg-gradient-to-r from-blue-50/50 via-white to-blue-50/50 border-2 border-emerald-700 rounded-xl px-4 py-3 shadow-sm text-center group-hover:border-blue-500 transition">
                <div className="font-moul text-base md:text-lg text-emerald-800 tracking-wide">
                  {rank3.full_name}
                </div>
                <div className="text-[11px] text-slate-600 font-serif mt-0.5">
                  មធ្យមភាគ: <span className="font-mono font-bold text-blue-900">{rank3.average_score.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RANK 4 & RANK 5 - Side by Side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          {/* RANK 4 */}
          {rank4 && (
            <div 
              onClick={() => onSelectStudent(rank4.id)}
              className="flex flex-col items-center cursor-pointer group transform hover:-translate-y-1 transition duration-200"
            >
              <div className="font-serif font-black text-5xl md:text-6xl text-red-600 mb-1 select-none">
                4
              </div>
              <div className="relative w-full bg-gradient-to-r from-blue-50/50 via-white to-blue-50/50 border-2 border-emerald-700 rounded-xl px-4 py-3 shadow-sm text-center group-hover:border-blue-500 transition">
                <div className="font-moul text-base md:text-lg text-emerald-800 tracking-wide">
                  {rank4.full_name}
                </div>
                <div className="text-[11px] text-slate-600 font-serif mt-0.5">
                  មធ្យមភាគ: <span className="font-mono font-bold text-blue-900">{rank4.average_score.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* RANK 5 */}
          {rank5 && (
            <div 
              onClick={() => onSelectStudent(rank5.id)}
              className="flex flex-col items-center cursor-pointer group transform hover:-translate-y-1 transition duration-200"
            >
              <div className="font-serif font-black text-5xl md:text-6xl text-red-600 mb-1 select-none">
                5
              </div>
              <div className="relative w-full bg-gradient-to-r from-blue-50/50 via-white to-blue-50/50 border-2 border-emerald-700 rounded-xl px-4 py-3 shadow-sm text-center group-hover:border-blue-500 transition">
                <div className="font-moul text-base md:text-lg text-emerald-800 tracking-wide">
                  {rank5.full_name}
                </div>
                <div className="text-[11px] text-slate-600 font-serif mt-0.5">
                  មធ្យមភាគ: <span className="font-mono font-bold text-blue-900">{rank5.average_score.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Official Signatures matching Page 5 */}
      <div className="mt-14 pt-6 border-t border-slate-300 grid grid-cols-1 sm:grid-cols-2 gap-8 text-center text-xs">
        <div>
          <div className="text-slate-600 font-serif mb-1">{schoolInfo.exam_date_lunar}</div>
          <div className="text-slate-600 font-serif mb-2">ទួលទទឹង {schoolInfo.exam_date_solar}</div>
          <div className="font-bold text-slate-900 mb-1">បានឃើញ និងឯកភាព</div>
          <div className="font-semibold text-slate-700 mb-14">នាយកសាលា</div>
          <div className="border-t border-dashed border-slate-300 w-44 mx-auto pt-1 text-slate-400 italic">
            ហត្ថលេខា និងត្រា
          </div>
        </div>

        <div>
          <div className="text-slate-600 font-serif mb-1">{schoolInfo.exam_date_lunar}</div>
          <div className="text-slate-600 font-serif mb-2">ទួលទទឹង {schoolInfo.exam_date_solar}</div>
          <div className="font-bold text-slate-900 mb-1">គ្រូទទួលបន្ទុកថ្នាក់</div>
          <div className="font-semibold text-blue-900 text-sm mb-14 font-serif">{schoolInfo.teacher_name}</div>
          <div className="border-t border-dashed border-slate-300 w-44 mx-auto pt-1 text-slate-400 italic">
            ហត្ថលេខា
          </div>
        </div>
      </div>
    </div>
  );
};
