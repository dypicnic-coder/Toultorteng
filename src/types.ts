export interface SchoolInfo {
  id: number;
  province: string;
  district: string;
  school_name: string;
  academic_year: string;
  class_name: string;
  teacher_name: string;
  commune: string;
  exam_date_solar: string;
  exam_date_lunar: string;
}

export interface Subject {
  id: number;
  code: string;
  name_km: string;
  max_score: number;
  sort_order: number;
  is_active: number;
  student_ranks?: Record<number, number>;
}

export interface StudentScoreDetail {
  score: number | null;
  is_absent: boolean;
}

export interface Student {
  id: number;
  roll_number: number;
  full_name: string;
  gender: string;
  dob: string;
  status: string;
  total_score: number;
  average_score: number;
  overall_grade: string;
  overall_rank: number;
  result_status: 'ជាប់' | 'ធ្លាក់' | 'អវត្តមាន';
  teacher_remarks: string;
  permission_days: number;
  unexcused_days: number;
  prev_permission_days: number;
  prev_unexcused_days: number;
  daily_records: string;
  scores: Record<number, StudentScoreDetail>;
}

export interface Statistics {
  total_students: number;
  female_students: number;
  passed_students: number;
  passed_female: number;
  failed_students: number;
  failed_female: number;
  absent_students: number;
  absent_female: number;
  grades_count: Record<string, number>;
  grades_female: Record<string, number>;
}

export interface ClassOverview {
  school_info: SchoolInfo;
  subjects: Subject[];
  students: Student[];
  statistics: Statistics;
}

export interface BulletinSubject {
  id: number;
  code: string;
  name_km: string;
  max_score: number | string;
  score: number | string;
  is_absent: boolean;
  grade: string;
  rank: string;
  mention: string;
}

export interface BulletinData {
  school_info: SchoolInfo;
  student: Student;
  evaluation: {
    total_score: number;
    average_score: number;
    overall_grade: string;
    overall_rank: number;
    result_status: string;
    teacher_remarks: string;
  };
  attendance: {
    permission_days: number;
    unexcused_days: number;
    prev_permission_days: number;
    prev_unexcused_days: number;
  };
  subjects: BulletinSubject[];
  total_max: number;
}
