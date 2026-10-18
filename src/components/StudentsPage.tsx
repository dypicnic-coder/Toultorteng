import React, { useState } from 'react';
import { ClassOverview, Student } from '../types';
import { Plus, Trash2, Edit2, Users, School, Calendar, BookOpen, Check, X } from 'lucide-react';

interface StudentsPageProps {
  overview: ClassOverview;
  onAddStudent: (data: { roll_number: number; full_name: string; gender: string; dob: string }) => Promise<void>;
  onDeleteStudent: (id: number) => Promise<void>;
  onUpdateSchoolInfo: (info: any) => Promise<void>;
}

export const StudentsPage: React.FC<StudentsPageProps> = ({
  overview,
  onAddStudent,
  onDeleteStudent,
  onUpdateSchoolInfo,
}) => {
  const { school_info, students, subjects } = overview;

  // Add student modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRoll, setNewRoll] = useState(students.length + 1);
  const [newName, setNewName] = useState('');
  const [newGender, setNewGender] = useState('ប');
  const [newDob, setNewDob] = useState('01/01/2011');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit school info modal
  const [showSchoolModal, setShowSchoolModal] = useState(false);
  const [schoolForm, setSchoolForm] = useState({ ...school_info });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setIsSubmitting(true);
    try {
      await onAddStudent({
        roll_number: Number(newRoll),
        full_name: newName.trim(),
        gender: newGender,
        dob: newDob.trim(),
      });
      setShowAddModal(false);
      setNewName('');
      setNewRoll(students.length + 2);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveSchool = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onUpdateSchoolInfo(schoolForm);
      setShowSchoolModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const femaleCount = students.filter((s) => s.gender === 'ស').length;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* 4 Cards Grid mirroring Page 1 structure */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: School Info */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <School className="w-4 h-4 text-blue-600" />
              <span>ព័ត៌មានសាលា</span>
            </h3>
            <button
              onClick={() => setShowSchoolModal(true)}
              className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <Edit2 className="w-3 h-3" />
              <span>កែប្រែ</span>
            </button>
          </div>

          <div className="space-y-1.5 text-xs text-slate-700">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">1. ខេត្ត/ក្រុង/រាជធានី:</span>
              <span className="font-semibold text-slate-900">{school_info.province}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">2. ស្រុក/ខណ្ឌ:</span>
              <span className="font-semibold text-slate-900">{school_info.district}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">3. សាលារៀន:</span>
              <span className="font-bold text-blue-900">{school_info.school_name}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">4. ឆ្នាំសិក្សា:</span>
              <span className="font-semibold text-slate-900">{school_info.academic_year}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">5. ថ្នាក់ទី:</span>
              <span className="font-bold text-blue-900">{school_info.class_name}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">6. គ្រូទទួលបន្ទុកថ្នាក់:</span>
              <span className="font-bold text-emerald-800">{school_info.teacher_name}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">7. ចំនួនសិស្សសរុប:</span>
              <span className="font-mono font-bold text-slate-900">{students.length} នាក់</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">8. សិស្សស្រីសរុប:</span>
              <span className="font-mono font-bold text-pink-700">{femaleCount} នាក់</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">9. ឃុំ/សង្កាត់:</span>
              <span className="font-semibold text-slate-900">{school_info.commune}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Dates */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
          <div className="border-b border-slate-200 pb-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>កាលបរិច្ឆេទប្រឡង</span>
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-100">
              <div className="text-[11px] font-medium text-blue-800 mb-1">សុរិយគតិ (Solar Calendar):</div>
              <div className="font-bold text-slate-900 text-sm">{school_info.exam_date_solar}</div>
              <div className="text-slate-500 text-[11px] mt-0.5">ខែមីនា ២០២៦</div>
            </div>

            <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-100">
              <div className="text-[11px] font-medium text-amber-800 mb-1">ចន្ទគតិ (Lunar Calendar):</div>
              <div className="font-serif font-bold text-slate-900 text-xs leading-relaxed">
                {school_info.exam_date_lunar}
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Subjects & Max Scores */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
          <div className="border-b border-slate-200 pb-2 flex justify-between items-center">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>ពិន្ទុតាមមុខវិជ្ជា</span>
            </h3>
            <span className="text-[10px] text-slate-500">ពិន្ទុអតិបរមា</span>
          </div>

          <div className="overflow-y-auto max-h-[300px] text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-[10px]">
                  <th className="py-1">ល.រ</th>
                  <th className="py-1">មុខវិជ្ជា</th>
                  <th className="py-1 text-right">ពិន្ទុអតិបរមា</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subjects.map((sub, idx) => (
                  <tr key={sub.id} className="hover:bg-slate-50">
                    <td className="py-1 font-mono text-slate-400">{idx + 1}</td>
                    <td className="py-1 font-medium text-slate-800">{sub.name_km}</td>
                    <td className="py-1 text-right font-mono font-bold text-blue-900">
                      {sub.max_score > 0 ? sub.max_score : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Main Student Directory Table mirroring Page 1 */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-sm">
              បញ្ជីឈ្មោះសិស្ស (ព័ត៌មានសិស្ស)
            </h3>
            <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full font-mono">
              {students.length} នាក់
            </span>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>បន្ថែមសិស្សថ្មី</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/90 text-slate-800 font-bold border-b border-slate-300">
                <th className="p-2.5 border-r border-slate-200 w-12 text-center">ល.រ</th>
                <th className="p-2.5 border-r border-slate-200 min-w-[160px]">គោត្តនាម នាម</th>
                <th className="p-2.5 border-r border-slate-200 w-14 text-center">ភេទ</th>
                <th className="p-2.5 border-r border-slate-200 min-w-[120px]">ថ្ងៃខែឆ្នាំកំណើត</th>
                <th className="p-2.5 border-r border-slate-200 text-center w-24">ពិន្ទុសរុប</th>
                <th className="p-2.5 border-r border-slate-200 text-center w-24">មធ្យមភាគ</th>
                <th className="p-2.5 border-r border-slate-200 text-center w-24">ចំណាត់ថ្នាក់</th>
                <th className="p-2.5 border-r border-slate-200 text-center w-24">លទ្ធផល</th>
                <th className="p-2.5 text-center w-20">សកម្មភាព</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {students.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-2.5 border-r border-slate-200 text-center font-mono font-medium text-slate-500">
                    {st.roll_number}
                  </td>
                  <td className="p-2.5 border-r border-slate-200 font-medium text-slate-900">
                    {st.full_name}
                  </td>
                  <td className={`p-2.5 border-r border-slate-200 text-center font-bold ${
                    st.gender === 'ស' ? 'text-pink-600' : 'text-blue-600'
                  }`}>
                    {st.gender}
                  </td>
                  <td className="p-2.5 border-r border-slate-200 font-mono text-slate-700">
                    {st.dob}
                  </td>
                  <td className="p-2.5 border-r border-slate-200 text-center font-mono font-bold text-slate-800">
                    {st.total_score}
                  </td>
                  <td className="p-2.5 border-r border-slate-200 text-center font-mono font-bold text-blue-900">
                    {st.average_score.toFixed(2)}
                  </td>
                  <td className="p-2.5 border-r border-slate-200 text-center font-mono font-bold">
                    #{st.overall_rank}
                  </td>
                  <td className="p-2.5 border-r border-slate-200 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      st.result_status === 'ជាប់' ? 'bg-emerald-100 text-emerald-800' :
                      st.result_status === 'ធ្លាក់' ? 'bg-red-100 text-red-800' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {st.result_status}
                    </span>
                  </td>
                  <td className="p-2.5 text-center">
                    <button
                      onClick={() => {
                        if (confirm(`តើអ្នកពិតជាចង់លុបឈ្មោះសិស្ស "${st.full_name}" ដែរឬទេ?`)) {
                          onDeleteStudent(st.id);
                        }
                      }}
                      className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                      title="លុបសិស្ស"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleAdd} className="bg-white rounded-xl shadow-xl max-w-sm w-full p-5 border border-slate-200 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm">បន្ថែមសិស្សថ្មី</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3">
              <div>
                <label className="text-slate-600 font-medium block mb-1">លេខរៀង (Roll No.):</label>
                <input
                  type="number"
                  min={1}
                  required
                  value={newRoll}
                  onChange={(e) => setNewRoll(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-mono"
                />
              </div>

              <div>
                <label className="text-slate-600 font-medium block mb-1">គោត្តនាម និងនាម:</label>
                <input
                  type="text"
                  required
                  placeholder="ឧ. សុខ ពិសិដ្ឋ"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded"
                />
              </div>

              <div>
                <label className="text-slate-600 font-medium block mb-1">ភេទ:</label>
                <select
                  value={newGender}
                  onChange={(e) => setNewGender(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded"
                >
                  <option value="ប">ប្រុស (ប)</option>
                  <option value="ស">ស្រី (ស)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-600 font-medium block mb-1">ថ្ងៃខែឆ្នាំកំណើត:</label>
                <input
                  type="text"
                  required
                  placeholder="ឧ. 15/05/2011"
                  value={newDob}
                  onChange={(e) => setNewDob(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded"
              >
                បោះបង់
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded shadow-xs"
              >
                {isSubmitting ? 'កំពុងបញ្ចូល...' : 'រក្សាទុក'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit School Info Modal */}
      {showSchoolModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleSaveSchool} className="bg-white rounded-xl shadow-xl max-w-md w-full p-5 border border-slate-200 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm">កែប្រែព័ត៌មានសាលា & កាលបរិច្ឆេទ</h3>
              <button
                type="button"
                onClick={() => setShowSchoolModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              <div>
                <label className="text-slate-600 font-medium block mb-1">ឈ្មោះសាលា:</label>
                <input
                  type="text"
                  value={schoolForm.school_name}
                  onChange={(e) => setSchoolForm({ ...schoolForm, school_name: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-600 font-medium block mb-1">ខេត្ត/រាជធានី:</label>
                  <input
                    type="text"
                    value={schoolForm.province}
                    onChange={(e) => setSchoolForm({ ...schoolForm, province: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="text-slate-600 font-medium block mb-1">ស្រុក/ខណ្ឌ:</label>
                  <input
                    type="text"
                    value={schoolForm.district}
                    onChange={(e) => setSchoolForm({ ...schoolForm, district: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-600 font-medium block mb-1">ថ្នាក់ទី:</label>
                  <input
                    type="text"
                    value={schoolForm.class_name}
                    onChange={(e) => setSchoolForm({ ...schoolForm, class_name: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="text-slate-600 font-medium block mb-1">ឆ្នាំសិក្សា:</label>
                  <input
                    type="text"
                    value={schoolForm.academic_year}
                    onChange={(e) => setSchoolForm({ ...schoolForm, academic_year: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-600 font-medium block mb-1">គ្រូទទួលបន្ទុកថ្នាក់:</label>
                <input
                  type="text"
                  value={schoolForm.teacher_name}
                  onChange={(e) => setSchoolForm({ ...schoolForm, teacher_name: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="text-slate-600 font-medium block mb-1">កាលបរិច្ឆេទ សុរិយគតិ:</label>
                <input
                  type="text"
                  value={schoolForm.exam_date_solar}
                  onChange={(e) => setSchoolForm({ ...schoolForm, exam_date_solar: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded"
                />
              </div>

              <div>
                <label className="text-slate-600 font-medium block mb-1">កាលបរិច្ឆេទ ចន្ទគតិ:</label>
                <input
                  type="text"
                  value={schoolForm.exam_date_lunar}
                  onChange={(e) => setSchoolForm({ ...schoolForm, exam_date_lunar: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowSchoolModal(false)}
                className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded"
              >
                បោះបង់
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded shadow-xs"
              >
                រក្សាទុកការកែប្រែ
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
