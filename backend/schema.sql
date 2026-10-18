-- School Score & Attendance Management System (ប្រព័ន្ធគ្រប់គ្រងពិន្ទុ និងវត្តមានសិស្ស)
-- Database Schema for SQLite

CREATE TABLE IF NOT EXISTS school_info (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    province TEXT NOT NULL DEFAULT 'ខេត្តព្រះសីហនុ',
    district TEXT NOT NULL DEFAULT 'ស្រុកព្រៃនប់',
    school_name TEXT NOT NULL DEFAULT 'អនុវិទ្យាល័យទួលទទឹង',
    academic_year TEXT NOT NULL DEFAULT '២០២៥-២០២៦',
    class_name TEXT NOT NULL DEFAULT 'ថ្នាក់ទី ៩ "ក"',
    teacher_name TEXT NOT NULL DEFAULT 'កាន់ វ៉ាន់ឌី',
    commune TEXT NOT NULL DEFAULT 'ឃុំទួលទទឹង',
    exam_date_solar TEXT NOT NULL DEFAULT 'ថ្ងៃទី ២៥ ខែមីនា ឆ្នាំ២០២៦',
    exam_date_lunar TEXT NOT NULL DEFAULT 'ថ្ងៃពុធ ៧កើត ខែចេត្រ ឆ្នាំម្សាញ់ សប្តស័ក ព.ស ២៥៦៩'
);

CREATE TABLE IF NOT EXISTS subjects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,
    name_km TEXT NOT NULL,
    max_score REAL NOT NULL,
    sort_order INTEGER NOT NULL,
    is_active INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    roll_number INTEGER NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    gender TEXT NOT NULL CHECK(gender IN ('ប', 'ស', 'ប្រុស', 'ស្រី')),
    dob TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'សកម្ម' CHECK(status IN ('សកម្ម', 'ឈប់', 'ផ្អាក'))
);

CREATE TABLE IF NOT EXISTS monthly_scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    subject_id INTEGER NOT NULL,
    month TEXT NOT NULL,
    academic_year TEXT NOT NULL,
    score REAL,
    is_absent INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY(subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
    UNIQUE(student_id, subject_id, month, academic_year)
);

CREATE TABLE IF NOT EXISTS attendance_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    month TEXT NOT NULL,
    academic_year TEXT NOT NULL,
    daily_records TEXT NOT NULL DEFAULT '', -- JSON or comma string e.g. "p,a,,p..."
    permission_days INTEGER NOT NULL DEFAULT 0,
    unexcused_days INTEGER NOT NULL DEFAULT 0,
    prev_permission_days INTEGER NOT NULL DEFAULT 0,
    prev_unexcused_days INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE,
    UNIQUE(student_id, month, academic_year)
);

CREATE TABLE IF NOT EXISTS monthly_evaluations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    month TEXT NOT NULL,
    academic_year TEXT NOT NULL,
    total_score REAL NOT NULL DEFAULT 0,
    average_score REAL NOT NULL DEFAULT 0,
    overall_grade TEXT NOT NULL DEFAULT 'F',
    overall_rank INTEGER NOT NULL DEFAULT 0,
    result_status TEXT NOT NULL DEFAULT 'ធ្លាក់' CHECK(result_status IN ('ជាប់', 'ធ្លាក់', 'អវត្តមាន')),
    teacher_remarks TEXT DEFAULT '',
    FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE,
    UNIQUE(student_id, month, academic_year)
);

-- Index for fast lookup
CREATE INDEX IF NOT EXISTS idx_scores_student ON monthly_scores(student_id);
CREATE INDEX IF NOT EXISTS idx_scores_subject ON monthly_scores(subject_id);
CREATE INDEX IF NOT EXISTS idx_attendance_student ON attendance_records(student_id);
CREATE INDEX IF NOT EXISTS idx_eval_rank ON monthly_evaluations(overall_rank);
