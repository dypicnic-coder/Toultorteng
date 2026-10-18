import { ClassOverview } from '../types';

export const INITIAL_DATA: ClassOverview = {
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
  subjects: [
    { id: 1, code: 'KHM_ESSAY', name_km: 'តែងសេចក្តី', max_score: 60, sort_order: 1, is_active: 1 },
    { id: 2, code: 'KHM_DICTATION', name_km: 'សរសេរតាមអាន', max_score: 40, sort_order: 2, is_active: 1 },
    { id: 3, code: 'MATH', name_km: 'គណិតវិទ្យា', max_score: 100, sort_order: 3, is_active: 1 },
    { id: 4, code: 'PHYSICS', name_km: 'រូបវិទ្យា', max_score: 35, sort_order: 4, is_active: 1 },
    { id: 5, code: 'CHEMISTRY', name_km: 'គីមីវិទ្យា', max_score: 25, sort_order: 5, is_active: 1 },
    { id: 6, code: 'BIOLOGY', name_km: 'ជីវវិទ្យា', max_score: 35, sort_order: 6, is_active: 1 },
    { id: 7, code: 'EARTH_SCI', name_km: 'ផែនដីវិទ្យា', max_score: 25, sort_order: 7, is_active: 1 },
    { id: 8, code: 'HISTORY', name_km: 'ប្រវត្តិវិទ្យា', max_score: 33, sort_order: 8, is_active: 1 },
    { id: 9, code: 'GEOGRAPHY', name_km: 'ភូមិវិទ្យា', max_score: 32, sort_order: 9, is_active: 1 },
    { id: 10, code: 'CIVICS', name_km: 'សីលធម៌-ពលរដ្ឋ', max_score: 35, sort_order: 10, is_active: 1 },
    { id: 11, code: 'ENGLISH', name_km: 'ភាសាអង់គ្លេស', max_score: 25, sort_order: 11, is_active: 1 }
  ],
  students: [
    {
      id: 1, roll_number: 1, full_name: 'វ៉ាន់ លីយ៉ាង', gender: 'ប', dob: '20/10/2011', status: 'សកម្ម',
      total_score: 0, average_score: 0.00, overall_grade: 'F', overall_rank: 24, result_status: 'អវត្តមាន',
      teacher_remarks: 'អវត្តមានពេលប្រឡង', permission_days: 0, unexcused_days: 0, prev_permission_days: 0, prev_unexcused_days: 0, daily_records: '',
      scores: { 1: { score: null, is_absent: true }, 2: { score: null, is_absent: true }, 3: { score: null, is_absent: true }, 4: { score: null, is_absent: true }, 5: { score: null, is_absent: true }, 6: { score: null, is_absent: true }, 7: { score: null, is_absent: true }, 8: { score: null, is_absent: true }, 9: { score: null, is_absent: true }, 10: { score: null, is_absent: true }, 11: { score: null, is_absent: true } }
    },
    {
      id: 2, roll_number: 2, full_name: 'គៀន ណាគ្រិន', gender: 'ប', dob: '19/11/2011', status: 'សកម្ម',
      total_score: 245, average_score: 29.17, overall_grade: 'E', overall_rank: 15, result_status: 'ជាប់',
      teacher_remarks: 'ការសិក្សា មធ្យម ត្រូវខិតខំរៀនសូត្របន្ថែមទៀត', permission_days: 0, unexcused_days: 1, prev_permission_days: 5, prev_unexcused_days: 5, daily_records: 'Day 24: a',
      scores: { 1: { score: 15, is_absent: false }, 2: { score: 30, is_absent: false }, 3: { score: 50, is_absent: false }, 4: { score: 12, is_absent: false }, 5: { score: 11, is_absent: false }, 6: { score: 26, is_absent: false }, 7: { score: 15, is_absent: false }, 8: { score: 24, is_absent: false }, 9: { score: 19, is_absent: false }, 10: { score: 28, is_absent: false }, 11: { score: 15, is_absent: false } }
    },
    {
      id: 3, roll_number: 3, full_name: 'ចែម វ៉ាន់ឃីម', gender: 'ប', dob: '14-03-2011', status: 'សកម្ម',
      total_score: 242, average_score: 28.81, overall_grade: 'E', overall_rank: 16, result_status: 'ជាប់',
      teacher_remarks: 'ការសិក្សា មធ្យម ត្រូវខិតខំរៀនសូត្របន្ថែមទៀត', permission_days: 3, unexcused_days: 0, prev_permission_days: 12, prev_unexcused_days: 8, daily_records: 'p',
      scores: { 1: { score: 10, is_absent: false }, 2: { score: 20, is_absent: false }, 3: { score: 50, is_absent: false }, 4: { score: 15, is_absent: false }, 5: { score: 13, is_absent: false }, 6: { score: 29, is_absent: false }, 7: { score: 12, is_absent: false }, 8: { score: 24, is_absent: false }, 9: { score: 21, is_absent: false }, 10: { score: 32, is_absent: false }, 11: { score: 16, is_absent: false } }
    },
    {
      id: 4, roll_number: 4, full_name: 'ចំរើន ណាណា', gender: 'ស', dob: '27/1/2012', status: 'សកម្ម',
      total_score: 346, average_score: 41.19, overall_grade: 'B', overall_rank: 2, result_status: 'ជាប់',
      teacher_remarks: 'ការសិក្សា ល្អ ត្រូវខិតខំរៀនសូត្របន្ថែមទៀត', permission_days: 0, unexcused_days: 0, prev_permission_days: 0, prev_unexcused_days: 0, daily_records: '',
      scores: { 1: { score: 35, is_absent: false }, 2: { score: 40, is_absent: false }, 3: { score: 65, is_absent: false }, 4: { score: 30, is_absent: false }, 5: { score: 20, is_absent: false }, 6: { score: 34, is_absent: false }, 7: { score: 23, is_absent: false }, 8: { score: 31, is_absent: false }, 9: { score: 29, is_absent: false }, 10: { score: 34, is_absent: false }, 11: { score: 5, is_absent: false } }
    },
    {
      id: 5, roll_number: 5, full_name: 'ឆាយ លីណា', gender: 'ស', dob: '8/4/2011', status: 'សកម្ម',
      total_score: 0, average_score: 0.00, overall_grade: 'F', overall_rank: 24, result_status: 'អវត្តមាន',
      teacher_remarks: 'អវត្តមានពេលប្រឡង', permission_days: 0, unexcused_days: 0, prev_permission_days: 0, prev_unexcused_days: 0, daily_records: '',
      scores: { 1: { score: null, is_absent: true }, 2: { score: null, is_absent: true }, 3: { score: null, is_absent: true }, 4: { score: null, is_absent: true }, 5: { score: null, is_absent: true }, 6: { score: null, is_absent: true }, 7: { score: null, is_absent: true }, 8: { score: null, is_absent: true }, 9: { score: null, is_absent: true }, 10: { score: null, is_absent: true }, 11: { score: null, is_absent: true } }
    },
    {
      id: 6, roll_number: 6, full_name: 'ឆុំ ប៊ុនថៃ', gender: 'ប', dob: '11/5/2009', status: 'សកម្ម',
      total_score: 155, average_score: 18.45, overall_grade: 'F', overall_rank: 21, result_status: 'ធ្លាក់',
      teacher_remarks: 'ការសិក្សា ខ្សោយ មិនទាន់គ្រប់កម្រិតស្ដង់ដា', permission_days: 3, unexcused_days: 7, prev_permission_days: 6, prev_unexcused_days: 29, daily_records: 'p, a',
      scores: { 1: { score: 10, is_absent: false }, 2: { score: 10, is_absent: false }, 3: { score: 0, is_absent: false }, 4: { score: 17, is_absent: false }, 5: { score: 15, is_absent: false }, 6: { score: 18, is_absent: false }, 7: { score: 12, is_absent: false }, 8: { score: 25, is_absent: false }, 9: { score: 22, is_absent: false }, 10: { score: 26, is_absent: false }, 11: { score: 0, is_absent: false } }
    },
    {
      id: 7, roll_number: 7, full_name: 'ឌី ស្រីនិច', gender: 'ស', dob: '22/4/2011', status: 'សកម្ម',
      total_score: 0, average_score: 0.00, overall_grade: 'F', overall_rank: 24, result_status: 'អវត្តមាន',
      teacher_remarks: 'អវត្តមានពេលប្រឡង', permission_days: 0, unexcused_days: 0, prev_permission_days: 0, prev_unexcused_days: 0, daily_records: '',
      scores: { 1: { score: null, is_absent: true }, 2: { score: null, is_absent: true }, 3: { score: null, is_absent: true }, 4: { score: null, is_absent: true }, 5: { score: null, is_absent: true }, 6: { score: null, is_absent: true }, 7: { score: null, is_absent: true }, 8: { score: null, is_absent: true }, 9: { score: null, is_absent: true }, 10: { score: null, is_absent: true }, 11: { score: null, is_absent: true } }
    },
    {
      id: 8, roll_number: 8, full_name: 'ជិន រ័ត្នធី', gender: 'ស', dob: '12/3/2012', status: 'សកម្ម',
      total_score: 247, average_score: 29.40, overall_grade: 'E', overall_rank: 14, result_status: 'ជាប់',
      teacher_remarks: 'ការសិក្សា មធ្យម ត្រូវខិតខំរៀនសូត្របន្ថែមទៀត', permission_days: 0, unexcused_days: 4, prev_permission_days: 4, prev_unexcused_days: 12, daily_records: '4 a',
      scores: { 1: { score: 20, is_absent: false }, 2: { score: 20, is_absent: false }, 3: { score: 50, is_absent: false }, 4: { score: 15, is_absent: false }, 5: { score: 13, is_absent: false }, 6: { score: 32, is_absent: false }, 7: { score: 13, is_absent: false }, 8: { score: 23, is_absent: false }, 9: { score: 19, is_absent: false }, 10: { score: 32, is_absent: false }, 11: { score: 10, is_absent: false } }
    },
    {
      id: 9, roll_number: 9, full_name: 'ជិន ណាវីន', gender: 'ស', dob: '3/8/2011', status: 'សកម្ម',
      total_score: 242, average_score: 28.81, overall_grade: 'E', overall_rank: 16, result_status: 'ជាប់',
      teacher_remarks: 'ការសិក្សា មធ្យម ត្រូវខិតខំរៀនសូត្របន្ថែមទៀត', permission_days: 0, unexcused_days: 6, prev_permission_days: 4, prev_unexcused_days: 8, daily_records: '6 a',
      scores: { 1: { score: 20, is_absent: false }, 2: { score: 20, is_absent: false }, 3: { score: 50, is_absent: false }, 4: { score: 15, is_absent: false }, 5: { score: 14, is_absent: false }, 6: { score: 19, is_absent: false }, 7: { score: 20, is_absent: false }, 8: { score: 23, is_absent: false }, 9: { score: 19, is_absent: false }, 10: { score: 30, is_absent: false }, 11: { score: 12, is_absent: false } }
    },
    {
      id: 10, roll_number: 10, full_name: 'ជិន រដ្ឋា', gender: 'ស', dob: '6/9/2010', status: 'សកម្ម',
      total_score: 306, average_score: 36.43, overall_grade: 'C', overall_rank: 6, result_status: 'ជាប់',
      teacher_remarks: 'ការសិក្សា ល្អបង្គួរ ត្រូវខិតខំរៀនសូត្របន្ថែមទៀត', permission_days: 0, unexcused_days: 5, prev_permission_days: 5, prev_unexcused_days: 9, daily_records: '5 a',
      scores: { 1: { score: 30, is_absent: false }, 2: { score: 40, is_absent: false }, 3: { score: 50, is_absent: false }, 4: { score: 14, is_absent: false }, 5: { score: 13, is_absent: false }, 6: { score: 32, is_absent: false }, 7: { score: 24, is_absent: false }, 8: { score: 31, is_absent: false }, 9: { score: 28, is_absent: false }, 10: { score: 32, is_absent: false }, 11: { score: 12, is_absent: false } }
    },
    {
      id: 11, roll_number: 11, full_name: 'ជឿន ចាន់សិរីរ័ត្ន', gender: 'ស', dob: '2/7/2011', status: 'សកម្ម',
      total_score: 159, average_score: 18.93, overall_grade: 'F', overall_rank: 20, result_status: 'ធ្លាក់',
      teacher_remarks: 'ការសិក្សា ខ្សោយ មិនទាន់គ្រប់កម្រិតស្ដង់ដា', permission_days: 1, unexcused_days: 9, prev_permission_days: 4, prev_unexcused_days: 17, daily_records: '1 p, 9 a',
      scores: { 1: { score: 25, is_absent: false }, 2: { score: 38, is_absent: false }, 3: { score: 0, is_absent: false }, 4: { score: 0, is_absent: false }, 5: { score: 0, is_absent: false }, 6: { score: 29, is_absent: false }, 7: { score: 22, is_absent: false }, 8: { score: 0, is_absent: false }, 9: { score: 0, is_absent: false }, 10: { score: 30, is_absent: false }, 11: { score: 15, is_absent: false } }
    },
    {
      id: 12, roll_number: 12, full_name: 'ឈិន ចេនជុង', gender: 'ប', dob: '25/11/2010', status: 'សកម្ម',
      total_score: 319, average_score: 37.98, overall_grade: 'C', overall_rank: 4, result_status: 'ជាប់',
      teacher_remarks: 'ការសិក្សា ល្អបង្គួរ ត្រូវខិតខំរៀនសូត្របន្ថែមទៀត', permission_days: 8, unexcused_days: 0, prev_permission_days: 12, prev_unexcused_days: 0, daily_records: '8 p',
      scores: { 1: { score: 30, is_absent: false }, 2: { score: 37, is_absent: false }, 3: { score: 82, is_absent: false }, 4: { score: 20, is_absent: false }, 5: { score: 16, is_absent: false }, 6: { score: 20, is_absent: false }, 7: { score: 18, is_absent: false }, 8: { score: 26, is_absent: false }, 9: { score: 22, is_absent: false }, 10: { score: 33, is_absent: false }, 11: { score: 15, is_absent: false } }
    },
    {
      id: 13, roll_number: 13, full_name: 'ញក់ ណារ៉ាត់', gender: 'ប', dob: '24/10/2011', status: 'សកម្ម',
      total_score: 104, average_score: 12.38, overall_grade: 'F', overall_rank: 23, result_status: 'ធ្លាក់',
      teacher_remarks: 'ការសិក្សា ខ្សោយ មិនទាន់គ្រប់កម្រិតស្ដង់ដា', permission_days: 3, unexcused_days: 16, prev_permission_days: 12, prev_unexcused_days: 30, daily_records: '3 p, 16 a',
      scores: { 1: { score: null, is_absent: true }, 2: { score: null, is_absent: true }, 3: { score: 0, is_absent: false }, 4: { score: 0, is_absent: false }, 5: { score: 0, is_absent: false }, 6: { score: 29, is_absent: false }, 7: { score: 13, is_absent: false }, 8: { score: 18, is_absent: false }, 9: { score: 19, is_absent: false }, 10: { score: 25, is_absent: false }, 11: { score: null, is_absent: true } }
    },
    {
      id: 14, roll_number: 14, full_name: 'ណាត ហ្វារីដា', gender: 'ស', dob: '28/4/2011', status: 'សកម្ម',
      total_score: 304, average_score: 36.19, overall_grade: 'C', overall_rank: 7, result_status: 'ជាប់',
      teacher_remarks: 'ការសិក្សា ល្អបង្គួរ ត្រូវខិតខំរៀនសូត្របន្ថែមទៀត', permission_days: 2, unexcused_days: 0, prev_permission_days: 0, prev_unexcused_days: 0, daily_records: '2 p',
      scores: { 1: { score: 25, is_absent: false }, 2: { score: 38, is_absent: false }, 3: { score: 50, is_absent: false }, 4: { score: 20, is_absent: false }, 5: { score: 18, is_absent: false }, 6: { score: 32, is_absent: false }, 7: { score: 24, is_absent: false }, 8: { score: 29, is_absent: false }, 9: { score: 28, is_absent: false }, 10: { score: 25, is_absent: false }, 11: { score: 15, is_absent: false } }
    },
    {
      id: 15, roll_number: 15, full_name: 'តេង ស្រីលី', gender: 'ស', dob: '18/11/2009', status: 'សកម្ម',
      total_score: 237, average_score: 28.21, overall_grade: 'E', overall_rank: 18, result_status: 'ជាប់',
      teacher_remarks: 'ការសិក្សា មធ្យម ត្រូវខិតខំរៀនសូត្របន្ថែមទៀត', permission_days: 1, unexcused_days: 10, prev_permission_days: 8, prev_unexcused_days: 20, daily_records: '1 p, 10 a',
      scores: { 1: { score: 20, is_absent: false }, 2: { score: 40, is_absent: false }, 3: { score: 0, is_absent: false }, 4: { score: 22, is_absent: false }, 5: { score: 21, is_absent: false }, 6: { score: 32, is_absent: false }, 7: { score: 24, is_absent: false }, 8: { score: 19, is_absent: false }, 9: { score: 19, is_absent: false }, 10: { score: 30, is_absent: false }, 11: { score: 10, is_absent: false } }
    },
    {
      id: 16, roll_number: 16, full_name: 'ថន ស្រីណុច', gender: 'ស', dob: '15/3/2012', status: 'សកម្ម',
      total_score: 280, average_score: 33.33, overall_grade: 'D', overall_rank: 11, result_status: 'ជាប់',
      teacher_remarks: 'ការសិក្សា ល្អបង្គួរ ត្រូវខិតខំរៀនសូត្របន្ថែមទៀត', permission_days: 1, unexcused_days: 0, prev_permission_days: 5, prev_unexcused_days: 7, daily_records: '1 p',
      scores: { 1: { score: 20, is_absent: false }, 2: { score: 35, is_absent: false }, 3: { score: 50, is_absent: false }, 4: { score: 16, is_absent: false }, 5: { score: 15, is_absent: false }, 6: { score: 30, is_absent: false }, 7: { score: 22, is_absent: false }, 8: { score: 31, is_absent: false }, 9: { score: 19, is_absent: false }, 10: { score: 30, is_absent: false }, 11: { score: 12, is_absent: false } }
    },
    {
      id: 17, roll_number: 17, full_name: 'និត្យ គីមអេង', gender: 'ស', dob: '12/10/2011', status: 'សកម្ម',
      total_score: 0, average_score: 0.00, overall_grade: 'F', overall_rank: 24, result_status: 'អវត្តមាន',
      teacher_remarks: 'អវត្តមានពេលប្រឡង', permission_days: 0, unexcused_days: 0, prev_permission_days: 0, prev_unexcused_days: 0, daily_records: '',
      scores: { 1: { score: null, is_absent: true }, 2: { score: null, is_absent: true }, 3: { score: null, is_absent: true }, 4: { score: null, is_absent: true }, 5: { score: null, is_absent: true }, 6: { score: null, is_absent: true }, 7: { score: null, is_absent: true }, 8: { score: null, is_absent: true }, 9: { score: null, is_absent: true }, 10: { score: null, is_absent: true }, 11: { score: null, is_absent: true } }
    },
    {
      id: 18, roll_number: 18, full_name: 'ព្រាក់ ចាន់នី', gender: 'ស', dob: '8/5/2011', status: 'សកម្ម',
      total_score: 273, average_score: 32.50, overall_grade: 'D', overall_rank: 13, result_status: 'ជាប់',
      teacher_remarks: 'ការសិក្សា ល្អបង្គួរ ត្រូវខិតខំរៀនសូត្របន្ថែមទៀត', permission_days: 1, unexcused_days: 10, prev_permission_days: 8, prev_unexcused_days: 23, daily_records: '1 p, 10 a',
      scores: { 1: { score: 15, is_absent: false }, 2: { score: 36, is_absent: false }, 3: { score: 50, is_absent: false }, 4: { score: 17, is_absent: false }, 5: { score: 17, is_absent: false }, 6: { score: 29, is_absent: false }, 7: { score: 22, is_absent: false }, 8: { score: 29, is_absent: false }, 9: { score: 19, is_absent: false }, 10: { score: 29, is_absent: false }, 11: { score: 10, is_absent: false } }
    },
    {
      id: 19, roll_number: 19, full_name: 'ម៉ាត់ អាស៊ីម៉ះ', gender: 'ស', dob: '19/10/2011', status: 'សកម្ម',
      total_score: 311, average_score: 37.02, overall_grade: 'C', overall_rank: 5, result_status: 'ជាប់',
      teacher_remarks: 'ការសិក្សា ល្អបង្គួរ ត្រូវខិតខំរៀនសូត្របន្ថែមទៀត', permission_days: 2, unexcused_days: 0, prev_permission_days: 1, prev_unexcused_days: 0, daily_records: '2 p',
      scores: { 1: { score: 25, is_absent: false }, 2: { score: 40, is_absent: false }, 3: { score: 50, is_absent: false }, 4: { score: 18, is_absent: false }, 5: { score: 20, is_absent: false }, 6: { score: 33, is_absent: false }, 7: { score: 22, is_absent: false }, 8: { score: 31, is_absent: false }, 9: { score: 28, is_absent: false }, 10: { score: 29, is_absent: false }, 11: { score: 15, is_absent: false } }
    },
    {
      id: 20, roll_number: 20, full_name: 'ម៉ាន អិលមី', gender: 'ស', dob: '1/2/2012', status: 'សកម្ម',
      total_score: 335, average_score: 39.88, overall_grade: 'C', overall_rank: 3, result_status: 'ជាប់',
      teacher_remarks: 'ការសិក្សា ល្អបង្គួរ ត្រូវខិតខំរៀនសូត្របន្ថែមទៀត', permission_days: 2, unexcused_days: 0, prev_permission_days: 0, prev_unexcused_days: 1, daily_records: '2 p',
      scores: { 1: { score: 35, is_absent: false }, 2: { score: 40, is_absent: false }, 3: { score: 50, is_absent: false }, 4: { score: 25, is_absent: false }, 5: { score: 20, is_absent: false }, 6: { score: 32, is_absent: false }, 7: { score: 23, is_absent: false }, 8: { score: 31, is_absent: false }, 9: { score: 30, is_absent: false }, 10: { score: 33, is_absent: false }, 11: { score: 16, is_absent: false } }
    },
    {
      id: 21, roll_number: 21, full_name: 'យ៉ាន សាវី', gender: 'ស', dob: '29/1/2011', status: 'សកម្ម',
      total_score: 293, average_score: 34.88, overall_grade: 'D', overall_rank: 8, result_status: 'ជាប់',
      teacher_remarks: 'ការសិក្សា ល្អបង្គួរ ត្រូវខិតខំរៀនសូត្របន្ថែមទៀត', permission_days: 3, unexcused_days: 0, prev_permission_days: 6, prev_unexcused_days: 1, daily_records: '3 p',
      scores: { 1: { score: 20, is_absent: false }, 2: { score: 36, is_absent: false }, 3: { score: 50, is_absent: false }, 4: { score: 20, is_absent: false }, 5: { score: 21, is_absent: false }, 6: { score: 30, is_absent: false }, 7: { score: 23, is_absent: false }, 8: { score: 31, is_absent: false }, 9: { score: 28, is_absent: false }, 10: { score: 29, is_absent: false }, 11: { score: 5, is_absent: false } }
    },
    {
      id: 22, roll_number: 22, full_name: 'យូ ម៉ាលីគី', gender: 'ប', dob: '10/1/2012', status: 'សកម្ម',
      total_score: 292, average_score: 34.76, overall_grade: 'D', overall_rank: 9, result_status: 'ជាប់',
      teacher_remarks: 'ការសិក្សា ល្អបង្គួរ ត្រូវខិតខំរៀនសូត្របន្ថែមទៀត', permission_days: 3, unexcused_days: 0, prev_permission_days: 6, prev_unexcused_days: 0, daily_records: '3 p',
      scores: { 1: { score: 20, is_absent: false }, 2: { score: 35, is_absent: false }, 3: { score: 50, is_absent: false }, 4: { score: 20, is_absent: false }, 5: { score: 22, is_absent: false }, 6: { score: 29, is_absent: false }, 7: { score: 23, is_absent: false }, 8: { score: 29, is_absent: false }, 9: { score: 19, is_absent: false }, 10: { score: 30, is_absent: false }, 11: { score: 15, is_absent: false } }
    },
    {
      id: 23, roll_number: 23, full_name: 'រឿន លីហួរ', gender: 'ប', dob: '1/10/2010', status: 'សកម្ម',
      total_score: 284, average_score: 33.81, overall_grade: 'D', overall_rank: 10, result_status: 'ជាប់',
      teacher_remarks: 'ការសិក្សា ល្អបង្គួរ ត្រូវខិតខំរៀនសូត្របន្ថែមទៀត', permission_days: 4, unexcused_days: 1, prev_permission_days: 11, prev_unexcused_days: 3, daily_records: '4 p, 1 a',
      scores: { 1: { score: 25, is_absent: false }, 2: { score: 35, is_absent: false }, 3: { score: 50, is_absent: false }, 4: { score: 19, is_absent: false }, 5: { score: 17, is_absent: false }, 6: { score: 29, is_absent: false }, 7: { score: 20, is_absent: false }, 8: { score: 29, is_absent: false }, 9: { score: 25, is_absent: false }, 10: { score: 30, is_absent: false }, 11: { score: 5, is_absent: false } }
    },
    {
      id: 24, roll_number: 24, full_name: 'លី ម៉េងឈាង', gender: 'ប', dob: '12/12/2011', status: 'សកម្ម',
      total_score: 186, average_score: 22.14, overall_grade: 'F', overall_rank: 19, result_status: 'ធ្លាក់',
      teacher_remarks: 'ការសិក្សា ខ្សោយ មិនទាន់គ្រប់កម្រិតស្ដង់ដា', permission_days: 0, unexcused_days: 3, prev_permission_days: 0, prev_unexcused_days: 3, daily_records: '3 a',
      scores: { 1: { score: 20, is_absent: false }, 2: { score: 30, is_absent: false }, 3: { score: 0, is_absent: false }, 4: { score: 15, is_absent: false }, 5: { score: 14, is_absent: false }, 6: { score: 15, is_absent: false }, 7: { score: 12, is_absent: false }, 8: { score: 19, is_absent: false }, 9: { score: 19, is_absent: false }, 10: { score: 27, is_absent: false }, 11: { score: 15, is_absent: false } }
    },
    {
      id: 25, roll_number: 25, full_name: 'លីនន់ ម៉ានុត', gender: 'ស', dob: '28/10/2011', status: 'សកម្ម',
      total_score: 139, average_score: 16.55, overall_grade: 'F', overall_rank: 22, result_status: 'ធ្លាក់',
      teacher_remarks: 'ការសិក្សា ខ្សោយ មិនទាន់គ្រប់កម្រិតស្ដង់ដា', permission_days: 3, unexcused_days: 7, prev_permission_days: 8, prev_unexcused_days: 20, daily_records: '3 p, 7 a',
      scores: { 1: { score: null, is_absent: true }, 2: { score: null, is_absent: true }, 3: { score: 0, is_absent: false }, 4: { score: 20, is_absent: false }, 5: { score: 16, is_absent: false }, 6: { score: 31, is_absent: false }, 7: { score: 22, is_absent: false }, 8: { score: 19, is_absent: false }, 9: { score: 16, is_absent: false }, 10: { score: 0, is_absent: false }, 11: { score: 15, is_absent: false } }
    },
    {
      id: 26, roll_number: 26, full_name: 'វ៉ាន់ វ៉ៃឆៃ', gender: 'ប', dob: '11/10/2009', status: 'សកម្ម',
      total_score: 0, average_score: 0.00, overall_grade: 'F', overall_rank: 24, result_status: 'អវត្តមាន',
      teacher_remarks: 'អវត្តមានពេលប្រឡង', permission_days: 0, unexcused_days: 0, prev_permission_days: 0, prev_unexcused_days: 0, daily_records: '',
      scores: { 1: { score: null, is_absent: true }, 2: { score: null, is_absent: true }, 3: { score: null, is_absent: true }, 4: { score: null, is_absent: true }, 5: { score: null, is_absent: true }, 6: { score: null, is_absent: true }, 7: { score: null, is_absent: true }, 8: { score: null, is_absent: true }, 9: { score: null, is_absent: true }, 10: { score: null, is_absent: true }, 11: { score: null, is_absent: true } }
    },
    {
      id: 27, roll_number: 27, full_name: 'សាន់ ស្រីមួយ', gender: 'ស', dob: '8/2/2012', status: 'សកម្ម',
      total_score: 0, average_score: 0.00, overall_grade: 'F', overall_rank: 24, result_status: 'អវត្តមាន',
      teacher_remarks: 'អវត្តមានពេលប្រឡង', permission_days: 0, unexcused_days: 0, prev_permission_days: 4, prev_unexcused_days: 28, daily_records: 'prev absent',
      scores: { 1: { score: null, is_absent: true }, 2: { score: null, is_absent: true }, 3: { score: null, is_absent: true }, 4: { score: null, is_absent: true }, 5: { score: null, is_absent: true }, 6: { score: null, is_absent: true }, 7: { score: null, is_absent: true }, 8: { score: null, is_absent: true }, 9: { score: null, is_absent: true }, 10: { score: null, is_absent: true }, 11: { score: null, is_absent: true } }
    },
    {
      id: 28, roll_number: 28, full_name: 'សុខា ណារ័ត្ន', gender: 'ស', dob: '7/9/2012', status: 'សកម្ម',
      total_score: 363, average_score: 43.21, overall_grade: 'B', overall_rank: 1, result_status: 'ជាប់',
      teacher_remarks: 'ការសិក្សា ល្អ ត្រូវខិតខំរៀនសូត្របន្ថែមទៀត', permission_days: 2, unexcused_days: 0, prev_permission_days: 6, prev_unexcused_days: 0, daily_records: '2 p',
      scores: { 1: { score: 40, is_absent: false }, 2: { score: 40, is_absent: false }, 3: { score: 65, is_absent: false }, 4: { score: 30, is_absent: false }, 5: { score: 20, is_absent: false }, 6: { score: 34, is_absent: false }, 7: { score: 23, is_absent: false }, 8: { score: 31, is_absent: false }, 9: { score: 30, is_absent: false }, 10: { score: 34, is_absent: false }, 11: { score: 16, is_absent: false } }
    },
    {
      id: 29, roll_number: 29, full_name: 'សុផល បញ្ញា', gender: 'ប', dob: '14/10/2011', status: 'សកម្ម',
      total_score: 0, average_score: 0.00, overall_grade: 'F', overall_rank: 24, result_status: 'អវត្តមាន',
      teacher_remarks: 'អវត្តមានពេលប្រឡង', permission_days: 0, unexcused_days: 0, prev_permission_days: 8, prev_unexcused_days: 2, daily_records: '',
      scores: { 1: { score: null, is_absent: true }, 2: { score: null, is_absent: true }, 3: { score: null, is_absent: true }, 4: { score: null, is_absent: true }, 5: { score: null, is_absent: true }, 6: { score: null, is_absent: true }, 7: { score: null, is_absent: true }, 8: { score: null, is_absent: true }, 9: { score: null, is_absent: true }, 10: { score: null, is_absent: true }, 11: { score: null, is_absent: true } }
    },
    {
      id: 30, roll_number: 30, full_name: 'សេន រ៉ាវីត', gender: 'ប', dob: '14/8/2011', status: 'សកម្ម',
      total_score: 280, average_score: 33.33, overall_grade: 'D', overall_rank: 11, result_status: 'ជាប់',
      teacher_remarks: 'ការសិក្សា ល្អបង្គួរ ត្រូវខិតខំរៀនសូត្របន្ថែមទៀត', permission_days: 3, unexcused_days: 0, prev_permission_days: 0, prev_unexcused_days: 0, daily_records: '3 p',
      scores: { 1: { score: 15, is_absent: false }, 2: { score: 35, is_absent: false }, 3: { score: 50, is_absent: false }, 4: { score: 15, is_absent: false }, 5: { score: 13, is_absent: false }, 6: { score: 25, is_absent: false }, 7: { score: 19, is_absent: false }, 8: { score: 24, is_absent: false }, 9: { score: 27, is_absent: false }, 10: { score: 27, is_absent: false }, 11: { score: 30, is_absent: false } }
    },
    {
      id: 31, roll_number: 31, full_name: 'ហែម វាសនា', gender: 'ប', dob: '3/12/2011', status: 'សកម្ម',
      total_score: 0, average_score: 0.00, overall_grade: 'F', overall_rank: 24, result_status: 'អវត្តមាន',
      teacher_remarks: 'អវត្តមានពេលប្រឡង', permission_days: 0, unexcused_days: 0, prev_permission_days: 0, prev_unexcused_days: 0, daily_records: '',
      scores: { 1: { score: null, is_absent: true }, 2: { score: null, is_absent: true }, 3: { score: null, is_absent: true }, 4: { score: null, is_absent: true }, 5: { score: null, is_absent: true }, 6: { score: null, is_absent: true }, 7: { score: null, is_absent: true }, 8: { score: null, is_absent: true }, 9: { score: null, is_absent: true }, 10: { score: null, is_absent: true }, 11: { score: null, is_absent: true } }
    }
  ],
  statistics: {
    total_students: 31,
    female_students: 17,
    passed_students: 18,
    passed_female: 11,
    failed_students: 5,
    failed_female: 2,
    absent_students: 8,
    absent_female: 4,
    grades_count: { A: 0, B: 2, C: 5, D: 6, E: 5, F: 13 },
    grades_female: { A: 0, B: 2, C: 4, D: 2, E: 3, F: 6 }
  }
};
