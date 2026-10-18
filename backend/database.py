"""
School Score & Attendance Management System (ប្រព័ន្ធគ្រប់គ្រងពិន្ទុ និងវត្តមានសិស្ស)
Python Database Engine with SQLite
"""

import sqlite3
import json
import os
import sys
from typing import List, Dict, Any, Optional

DB_PATH = os.path.join(os.path.dirname(__file__), "school.db")
SCHEMA_PATH = os.path.join(os.path.dirname(__file__), "schema.sql")

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initializes the database schema and seeds initial data if empty."""
    conn = get_connection()
    cursor = conn.cursor()
    
    with open(SCHEMA_PATH, "r", encoding="utf-8") as f:
        cursor.executescript(f.read())
    
    cursor.execute("SELECT COUNT(*) FROM students")
    count = cursor.fetchone()[0]
    
    if count == 0:
        seed_data(cursor)
        conn.commit()
        recalculate_rankings_internal(cursor, "មីនា", "២០២៥-២០២៦")
        conn.commit()
    
    conn.close()

def seed_data(cursor):
    """Seed data exactly as given in the school document."""
    cursor.execute("""
        INSERT INTO school_info (province, district, school_name, academic_year, class_name, teacher_name, commune, exam_date_solar, exam_date_lunar)
        VALUES ('ខេត្តព្រះសីហនុ', 'ស្រុកព្រៃនប់', 'អនុវិទ្យាល័យទួលទទឹង', '២០២៥-២០២៦', 'ថ្នាក់ទី ៩ "ក"', 'កាន់ វ៉ាន់ឌី', 'ឃុំទួលទទឹង', 'ថ្ងៃទី ២៥ ខែមីនា ឆ្នាំ២០២៦', 'ថ្ងៃពុធ ៧កើត ខែចេត្រ ឆ្នាំម្សាញ់ សប្តស័ក ព.ស ២៥៦៩')
    """)

    subjects = [
        ("KHM_ESSAY", "តែងសេចក្តី", 60.0, 1),
        ("KHM_DICTATION", "សរសេរតាមអាន", 40.0, 2),
        ("MATH", "គណិតវិទ្យា", 100.0, 3),
        ("PHYSICS", "រូបវិទ្យា", 35.0, 4),
        ("CHEMISTRY", "គីមីវិទ្យា", 25.0, 5),
        ("BIOLOGY", "ជីវវិទ្យា", 35.0, 6),
        ("EARTH_SCI", "ផែនដីវិទ្យា", 25.0, 7),
        ("HISTORY", "ប្រវត្តិវិទ្យា", 33.0, 8),
        ("GEOGRAPHY", "ភូមិវិទ្យា", 32.0, 9),
        ("CIVICS", "សីលធម៌-ពលរដ្ឋ", 35.0, 10),
        ("ENGLISH", "ភាសាអង់គ្លេស", 25.0, 11),
        ("HOME_ECON", "គេហវិទ្យា", 0.0, 12),
        ("AGRICULTURE", "កសិកម្ម", 0.0, 13),
        ("SPORTS", "កីឡា", 0.0, 14)
    ]

    for code, name, max_s, order in subjects:
        cursor.execute("""
            INSERT INTO subjects (code, name_km, max_score, sort_order, is_active)
            VALUES (?, ?, ?, ?, ?)
        """, (code, name, max_s, order, 1 if max_s > 0 else 0))

    students_data = [
        (1, "វ៉ាន់ លីយ៉ាង", "ប", "20/10/2011"),
        (2, "គៀន ណាគ្រិន", "ប", "19/11/2011"),
        (3, "ចែម វ៉ាន់ឃីម", "ប", "14-03-2011"),
        (4, "ចំរើន ណាណា", "ស", "27/1/2012"),
        (5, "ឆាយ លីណា", "ស", "8/4/2011"),
        (6, "ឆុំ ប៊ុនថៃ", "ប", "11/5/2009"),
        (7, "ឌី ស្រីនិច", "ស", "22/4/2011"),
        (8, "ជិន រ័ត្នធី", "ស", "12/3/2012"),
        (9, "ជិន ណាវីន", "ស", "3/8/2011"),
        (10, "ជិន រដ្ឋា", "ស", "6/9/2010"),
        (11, "ជឿន ចាន់សិរីរ័ត្ន", "ស", "2/7/2011"),
        (12, "ឈិន ចេនជុង", "ប", "25/11/2010"),
        (13, "ញក់ ណារ៉ាត់", "ប", "24/10/2011"),
        (14, "ណាត ហ្វារីដា", "ស", "28/4/2011"),
        (15, "តេង ស្រីលី", "ស", "18/11/2009"),
        (16, "ថន ស្រីណុច", "ស", "15/3/2012"),
        (17, "និត្យ គីមអេង", "ស", "12/10/2011"),
        (18, "ព្រាក់ ចាន់នី", "ស", "8/5/2011"),
        (19, "ម៉ាត់ អាស៊ីម៉ះ", "ស", "19/10/2011"),
        (20, "ម៉ាន អិលមី", "ស", "1/2/2012"),
        (21, "យ៉ាន សាវី", "ស", "29/1/2011"),
        (22, "យូ ម៉ាលីគី", "ប", "10/1/2012"),
        (23, "រឿន លីហួរ", "ប", "1/10/2010"),
        (24, "លី ម៉េងឈាង", "ប", "12/12/2011"),
        (25, "លីនន់ ម៉ានុត", "ស", "28/10/2011"),
        (26, "វ៉ាន់ វ៉ៃឆៃ", "ប", "11/10/2009"),
        (27, "សាន់ ស្រីមួយ", "ស", "8/2/2012"),
        (28, "សុខា ណារ័ត្ន", "ស", "7/9/2012"),
        (29, "សុផល បញ្ញា", "ប", "14/10/2011"),
        (30, "សេន រ៉ាវីត", "ប", "14/8/2011"),
        (31, "ហែម វាសនា", "ប", "3/12/2011"),
    ]

    for roll, name, gen, dob in students_data:
        cursor.execute("""
            INSERT INTO students (roll_number, full_name, gender, dob, status)
            VALUES (?, ?, ?, ?, 'សកម្ម')
        """, (roll, name, gen, dob))

    # Raw scores per student for the 11 active subjects (in order: តែងសេចក្តី, សរសេរតាមអាន, គណិត, រូប, គីមី, ជីវ, ផែនដី, ប្រវត្តិ, ភូមិ, សីល, អង់គ្លេស)
    # None indicates absent for that subject or whole exam
    raw_scores = {
        1: [None, None, None, None, None, None, None, None, None, None, None],
        2: [15, 30, 50, 12, 11, 26, 15, 24, 19, 28, 15],
        3: [10, 20, 50, 15, 13, 29, 12, 24, 21, 32, 16],
        4: [35, 40, 65, 30, 20, 34, 23, 31, 29, 34, 5],
        5: [None, None, None, None, None, None, None, None, None, None, None],
        6: [10, 10, 0, 17, 15, 18, 12, 25, 22, 26, 0],
        7: [None, None, None, None, None, None, None, None, None, None, None],
        8: [20, 20, 50, 15, 13, 32, 13, 23, 19, 32, 10],
        9: [20, 20, 50, 15, 14, 19, 20, 23, 19, 30, 12],
        10: [30, 40, 50, 14, 13, 32, 24, 31, 28, 32, 12],
        11: [25, 38, 0, 0, 0, 29, 22, 0, 0, 30, 15],
        12: [30, 37, 82, 20, 16, 20, 18, 26, 22, 33, 15],
        13: [None, None, 0, 0, 0, 29, 13, 18, 19, 25, None],
        14: [25, 38, 50, 20, 18, 32, 24, 29, 28, 25, 15],
        15: [20, 40, 0, 22, 21, 32, 24, 19, 19, 30, 10],
        16: [20, 35, 50, 16, 15, 30, 22, 31, 19, 30, 12],
        17: [None, None, None, None, None, None, None, None, None, None, None],
        18: [15, 36, 50, 17, 17, 29, 22, 29, 19, 29, 10],
        19: [25, 40, 50, 18, 20, 33, 22, 31, 28, 29, 15],
        20: [35, 40, 50, 25, 20, 32, 23, 31, 30, 33, 16],
        21: [20, 36, 50, 20, 21, 30, 23, 31, 28, 29, 5],
        22: [20, 35, 50, 20, 22, 29, 23, 29, 19, 30, 15],
        23: [25, 35, 50, 19, 17, 29, 20, 29, 25, 30, 5],
        24: [20, 30, 0, 15, 14, 15, 12, 19, 19, 27, 15],
        25: [None, None, 0, 20, 16, 31, 22, 19, 16, 0, 15],
        26: [None, None, None, None, None, None, None, None, None, None, None],
        27: [None, None, None, None, None, None, None, None, None, None, None],
        28: [40, 40, 65, 30, 20, 34, 23, 31, 30, 34, 16],
        29: [None, None, None, None, None, None, None, None, None, None, None],
        30: [15, 35, 50, 15, 13, 25, 19, 24, 27, 27, 30],
        31: [None, None, None, None, None, None, None, None, None, None, None],
    }

    cursor.execute("SELECT id, sort_order FROM subjects WHERE is_active = 1 ORDER BY sort_order")
    subject_map = cursor.fetchall()

    for roll, scores_list in raw_scores.items():
        cursor.execute("SELECT id FROM students WHERE roll_number = ?", (roll,))
        st_row = cursor.fetchone()
        if not st_row:
            continue
        student_id = st_row[0]

        for idx, score_val in enumerate(scores_list):
            if idx < len(subject_map):
                sub_id = subject_map[idx][0]
                is_absent = 1 if score_val is None else 0
                cursor.execute("""
                    INSERT INTO monthly_scores (student_id, subject_id, month, academic_year, score, is_absent)
                    VALUES (?, ?, 'មីនា', '២០២៥-២០២៦', ?, ?)
                """, (student_id, sub_id, score_val if score_val is not None else 0, is_absent))

    # Attendance records from page 3
    # Format: (roll, p_cur, a_cur, p_prev, a_prev, daily_notes)
    attendance_data = [
        (1, 0, 0, 0, 0, ""),
        (2, 0, 1, 5, 5, "Day 24: a"),
        (3, 3, 0, 12, 8, "Day 7, 8, 9: p"),
        (4, 0, 0, 0, 0, ""),
        (5, 0, 0, 0, 0, ""),
        (6, 3, 7, 6, 29, "p, a days"),
        (7, 0, 0, 0, 0, ""),
        (8, 0, 4, 4, 12, "4 unexcused"),
        (9, 0, 6, 4, 8, "6 unexcused"),
        (10, 0, 5, 5, 9, "5 unexcused"),
        (11, 1, 9, 4, 17, "1 p, 9 a"),
        (12, 8, 0, 12, 0, "8 excused (p)"),
        (13, 3, 16, 12, 30, "3 p, 16 a"),
        (14, 2, 0, 0, 0, "2 p"),
        (15, 1, 10, 8, 20, "1 p, 10 a"),
        (16, 1, 0, 5, 7, "1 p"),
        (17, 0, 0, 0, 0, ""),
        (18, 1, 10, 8, 23, "1 p, 10 a"),
        (19, 2, 0, 1, 0, "2 p"),
        (20, 2, 0, 0, 1, "2 p"),
        (21, 3, 0, 6, 1, "3 p"),
        (22, 3, 0, 6, 0, "3 p"),
        (23, 4, 1, 11, 3, "4 p, 1 a"),
        (24, 0, 3, 0, 3, "3 a"),
        (25, 3, 7, 8, 20, "3 p, 7 a"),
        (26, 0, 0, 0, 0, ""),
        (27, 0, 0, 4, 28, "prev absent"),
        (28, 2, 0, 6, 0, "2 p"),
        (29, 0, 0, 8, 2, ""),
        (30, 3, 0, 0, 0, "3 p"),
        (31, 0, 0, 0, 0, ""),
    ]

    for roll, p_c, a_c, p_p, a_p, notes in attendance_data:
        cursor.execute("SELECT id FROM students WHERE roll_number = ?", (roll,))
        st_row = cursor.fetchone()
        if st_row:
            cursor.execute("""
                INSERT INTO attendance_records (student_id, month, academic_year, permission_days, unexcused_days, prev_permission_days, prev_unexcused_days, daily_records)
                VALUES (?, 'មីនា', '២០២៥-២០២៦', ?, ?, ?, ?, ?)
            """, (st_row[0], p_c, a_c, p_p, a_p, notes))

def calculate_grade_and_mention(avg: float, is_all_absent: bool = False):
    """
    Cambodian grading scale for average score out of 50 (divisor 8.4)
    A (ល្អប្រសើរ): 45 - 50
    B (ល្អ): 40 - 44.99
    C (ល្អបង្គួរ): 35 - 39.99
    D (មធ្យម): 30 - 34.99 (or 25-29.99 depending on stream)
    E (ខ្សោយ): 25 - 29.99
    F (ខ្សោយណាស់ / ធ្លាក់): < 25
    """
    if is_all_absent or avg <= 0:
        return "F", "ខ្សោយ", "អវត្តមាន"
    if avg >= 45.0:
        return "A", "ល្អប្រសើរ", "ជាប់"
    elif avg >= 40.0:
        return "B", "ល្អ", "ជាប់"
    elif avg >= 35.0:
        return "C", "ល្អបង្គួរ", "ជាប់"
    elif avg >= 30.0:
        return "D", "ល្អបង្គួរ", "ជាប់"
    elif avg >= 25.0:
        return "E", "មធ្យម", "ជាប់"
    else:
        return "F", "ខ្សោយ", "ធ្លាក់"

def recalculate_rankings_internal(cursor, month: str = "មីនា", academic_year: str = "២០២៥-២០២៦"):
    """
    Recalculates totals, averages, subject ranks, overall ranks and evaluates pass/fail.
    """
    cursor.execute("SELECT id, roll_number, full_name, gender FROM students ORDER BY roll_number")
    students = cursor.fetchall()

    student_totals = []

    for st in students:
        s_id = st["id"]
        cursor.execute("""
            SELECT ms.score, ms.is_absent, s.max_score
            FROM monthly_scores ms
            JOIN subjects s ON ms.subject_id = s.id
            WHERE ms.student_id = ? AND ms.month = ? AND ms.academic_year = ? AND s.is_active = 1
        """, (s_id, month, academic_year))
        scores_rows = cursor.fetchall()

        if not scores_rows:
            continue

        all_absent = all(row["is_absent"] == 1 or row["score"] is None or row["score"] == 0 for row in scores_rows) and \
                     sum(row["score"] or 0 for row in scores_rows) == 0

        total_score = sum(row["score"] or 0 for row in scores_rows)
        # Using exact divisor 8.4 as established in official grade 9 curriculum sheet
        avg_score = round(total_score / 8.4, 2) if total_score > 0 else 0.0

        grade, mention, result = calculate_grade_and_mention(avg_score, all_absent)

        student_totals.append({
            "student_id": s_id,
            "roll_number": st["roll_number"],
            "total_score": total_score,
            "average_score": avg_score,
            "grade": grade,
            "mention": mention,
            "result": result,
            "is_absent": all_absent
        })

    # Sort to determine ranks:
    # 1. Non-absent first, sorted by total_score descending
    # 2. Absent students tied at rank 24
    active_students = [s for s in student_totals if not s["is_absent"] and s["total_score"] > 0]
    absent_students = [s for s in student_totals if s["is_absent"] or s["total_score"] == 0]

    active_students.sort(key=lambda x: x["total_score"], reverse=True)

    current_rank = 1
    for i, st in enumerate(active_students):
        if i > 0 and st["total_score"] < active_students[i - 1]["total_score"]:
            current_rank = i + 1
        st["rank"] = current_rank

    absent_rank = len(active_students) + 1  # 23 active students -> 24th rank
    for st in absent_students:
        st["rank"] = absent_rank

    # Save to monthly_evaluations
    for st in student_totals:
        remarks = f"ការសិក្សា {st['mention']}"
        if st["result"] == "ជាប់":
            remarks += " ត្រូវខិតខំរៀនសូត្របន្ថែមទៀត"
        elif st["result"] == "ធ្លាក់":
            remarks += " មិនទាន់គ្រប់កម្រិតស្ដង់ដា"
        else:
            remarks = "អវត្តមានពេលប្រឡង"

        cursor.execute("""
            INSERT INTO monthly_evaluations (student_id, month, academic_year, total_score, average_score, overall_grade, overall_rank, result_status, teacher_remarks)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(student_id, month, academic_year) DO UPDATE SET
                total_score = excluded.total_score,
                average_score = excluded.average_score,
                overall_grade = excluded.overall_grade,
                overall_rank = excluded.overall_rank,
                result_status = excluded.result_status,
                teacher_remarks = excluded.teacher_remarks
        """, (
            st["student_id"],
            month,
            academic_year,
            st["total_score"],
            st["average_score"],
            st["grade"],
            st["rank"],
            st["result"],
            remarks
        ))

def get_class_overview(month: str = "មីនា", academic_year: str = "២០២៥-២០២៦"):
    """Fetch complete data structure for the full score table, stats, and metadata."""
    init_db()
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM school_info LIMIT 1")
    info = dict(cursor.fetchone() or {})

    cursor.execute("SELECT * FROM subjects WHERE is_active = 1 ORDER BY sort_order")
    subjects = [dict(r) for r in cursor.fetchall()]

    # Calculate subject ranks for each subject
    for sub in subjects:
        cursor.execute("""
            SELECT ms.student_id, ms.score, ms.is_absent
            FROM monthly_scores ms
            WHERE ms.subject_id = ? AND ms.month = ? AND ms.academic_year = ?
            ORDER BY ms.score DESC
        """, (sub["id"], month, academic_year))
        sub_scores = cursor.fetchall()
        
        ranks = {}
        c_rank = 1
        valid_scores = [r for r in sub_scores if r["is_absent"] == 0 and r["score"] is not None and r["score"] > 0]
        for i, row in enumerate(valid_scores):
            if i > 0 and row["score"] < valid_scores[i-1]["score"]:
                c_rank = i + 1
            ranks[row["student_id"]] = c_rank
        sub["student_ranks"] = ranks

    cursor.execute("""
        SELECT 
            s.id, s.roll_number, s.full_name, s.gender, s.dob, s.status,
            e.total_score, e.average_score, e.overall_grade, e.overall_rank, e.result_status, e.teacher_remarks,
            a.permission_days, a.unexcused_days, a.prev_permission_days, a.prev_unexcused_days, a.daily_records
        FROM students s
        LEFT JOIN monthly_evaluations e ON s.id = e.student_id AND e.month = ? AND e.academic_year = ?
        LEFT JOIN attendance_records a ON s.id = a.student_id AND a.month = ? AND a.academic_year = ?
        ORDER BY s.roll_number
    """, (month, academic_year, month, academic_year))
    students_rows = cursor.fetchall()

    students = []
    for r in students_rows:
        st = dict(r)
        # Fetch individual subject scores
        cursor.execute("""
            SELECT ms.subject_id, ms.score, ms.is_absent
            FROM monthly_scores ms
            WHERE ms.student_id = ? AND ms.month = ? AND ms.academic_year = ?
        """, (st["id"], month, academic_year))
        score_rows = cursor.fetchall()
        st["scores"] = {row["subject_id"]: {"score": row["score"], "is_absent": bool(row["is_absent"])} for row in score_rows}
        students.append(st)

    # Statistics
    total_students = len(students)
    female_students = len([s for s in students if s["gender"] in ("ស", "ស្រី")])
    passed_students = len([s for s in students if s["result_status"] == "ជាប់"])
    passed_female = len([s for s in students if s["result_status"] == "ជាប់" and s["gender"] in ("ស", "ស្រី")])
    failed_students = len([s for s in students if s["result_status"] == "ធ្លាក់"])
    failed_female = len([s for s in students if s["result_status"] == "ធ្លាក់" and s["gender"] in ("ស", "ស្រី")])
    absent_students = len([s for s in students if s["result_status"] == "អវត្តមាន"])
    absent_female = len([s for s in students if s["result_status"] == "អវត្តមាន" and s["gender"] in ("ស", "ស្រី")])

    grades_count = {"A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0}
    grades_female = {"A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0}

    for s in students:
        g = s["overall_grade"] or "F"
        if g in grades_count:
            grades_count[g] += 1
            if s["gender"] in ("ស", "ស្រី"):
                grades_female[g] += 1

    conn.close()

    return {
        "school_info": info,
        "subjects": subjects,
        "students": students,
        "statistics": {
            "total_students": total_students,
            "female_students": female_students,
            "passed_students": passed_students,
            "passed_female": passed_female,
            "failed_students": failed_students,
            "failed_female": failed_female,
            "absent_students": absent_students,
            "absent_female": absent_female,
            "grades_count": grades_count,
            "grades_female": grades_female,
        }
    }

def update_student_score(student_id: int, subject_id: int, score: Optional[float], is_absent: bool = False, month: str = "មីនា", academic_year: str = "២០២៥-២០២៦"):
    """Update or insert a student's score in SQL and recalculate ranks."""
    init_db()
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO monthly_scores (student_id, subject_id, month, academic_year, score, is_absent)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(student_id, subject_id, month, academic_year) DO UPDATE SET
            score = excluded.score,
            is_absent = excluded.is_absent
    """, (student_id, subject_id, month, academic_year, score if score is not None else 0, 1 if is_absent else 0))

    recalculate_rankings_internal(cursor, month, academic_year)
    conn.commit()
    conn.close()
    return {"success": True}

def update_attendance_record(student_id: int, permission: int, unexcused: int, prev_permission: int, prev_unexcused: int, daily_records: str = "", month: str = "មីនា", academic_year: str = "២០២៥-២០២៦"):
    """Update student attendance in SQL."""
    init_db()
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO attendance_records (student_id, month, academic_year, permission_days, unexcused_days, prev_permission_days, prev_unexcused_days, daily_records)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(student_id, month, academic_year) DO UPDATE SET
            permission_days = excluded.permission_days,
            unexcused_days = excluded.unexcused_days,
            prev_permission_days = excluded.prev_permission_days,
            prev_unexcused_days = excluded.prev_unexcused_days,
            daily_records = excluded.daily_records
    """, (student_id, month, academic_year, permission, unexcused, prev_permission, prev_unexcused, daily_records))

    conn.commit()
    conn.close()
    return {"success": True}

def get_honor_roll(month: str = "មីនា", academic_year: str = "២០២៥-២០២៦"):
    """Top 5 honor students for the honor poster."""
    init_db()
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT 
            s.id, s.roll_number, s.full_name, s.gender, s.dob,
            e.total_score, e.average_score, e.overall_grade, e.overall_rank, e.result_status
        FROM students s
        JOIN monthly_evaluations e ON s.id = e.student_id AND e.month = ? AND e.academic_year = ?
        WHERE e.result_status = 'ជាប់'
        ORDER BY e.overall_rank ASC
        LIMIT 5
    """, (month, academic_year))

    top_students = [dict(r) for r in cursor.fetchall()]

    cursor.execute("SELECT * FROM school_info LIMIT 1")
    info = dict(cursor.fetchone() or {})
    conn.close()

    return {
        "school_info": info,
        "top_students": top_students
    }

def get_student_bulletin(student_id: int, month: str = "មីនា", academic_year: str = "២០២៥-២០២៦"):
    """Fetch individual bulletin for student report card (Page 7)."""
    init_db()
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM school_info LIMIT 1")
    info = dict(cursor.fetchone() or {})

    cursor.execute("SELECT * FROM students WHERE id = ?", (student_id,))
    student = dict(cursor.fetchone() or {})

    cursor.execute("""
        SELECT * FROM monthly_evaluations 
        WHERE student_id = ? AND month = ? AND academic_year = ?
    """, (student_id, month, academic_year))
    evaluation = dict(cursor.fetchone() or {})

    cursor.execute("""
        SELECT * FROM attendance_records
        WHERE student_id = ? AND month = ? AND academic_year = ?
    """, (student_id, month, academic_year))
    attendance = dict(cursor.fetchone() or {})

    cursor.execute("""
        SELECT 
            s.id, s.code, s.name_km, s.max_score, s.sort_order,
            ms.score, ms.is_absent
        FROM subjects s
        LEFT JOIN monthly_scores ms ON s.id = ms.subject_id AND ms.student_id = ? AND ms.month = ? AND ms.academic_year = ?
        ORDER BY s.sort_order
    """, (student_id, month, academic_year))
    subject_rows = cursor.fetchall()

    subjects_detail = []
    total_max = 0.0
    for row in subject_rows:
        sub = dict(row)
        if sub["max_score"] > 0:
            total_max += sub["max_score"]
            # Get class rank for this subject
            cursor.execute("""
                SELECT COUNT(*) + 1 
                FROM monthly_scores 
                WHERE subject_id = ? AND month = ? AND academic_year = ? AND score > ? AND is_absent = 0
            """, (sub["id"], month, academic_year, sub["score"] or 0))
            sub_rank = cursor.fetchone()[0]
            
            # Subject grade
            pct = (sub["score"] / sub["max_score"]) * 100 if sub["score"] else 0
            if sub["is_absent"] or sub["score"] is None:
                sub_grade = "F"
                sub_mention = "ខ្សោយ"
            elif pct >= 80:
                sub_grade = "A"
                sub_mention = "ល្អប្រសើរ"
            elif pct >= 70:
                sub_grade = "B"
                sub_mention = "ល្អ"
            elif pct >= 60:
                sub_grade = "C"
                sub_mention = "ល្អបង្គួរ"
            elif pct >= 50:
                sub_grade = "D"
                sub_mention = "មធ្យម"
            elif pct >= 40:
                sub_grade = "E"
                sub_mention = "ខ្សោយ"
            else:
                sub_grade = "F"
                sub_mention = "ខ្សោយ"

            sub["grade"] = sub_grade
            sub["rank"] = f"{sub_rank:02d}"
            sub["mention"] = sub_mention
        else:
            sub["grade"] = "N/A"
            sub["rank"] = "N/A"
            sub["mention"] = "N/A"
            sub["score"] = "N/A"
            sub["max_score"] = "N/A"

        subjects_detail.append(sub)

    conn.close()

    return {
        "school_info": info,
        "student": student,
        "evaluation": evaluation,
        "attendance": attendance,
        "subjects": subjects_detail,
        "total_max": total_max
    }

def execute_raw_sql(query: str, params: list = []):
    """Executes arbitrary SQL query and returns rows or affected count."""
    init_db()
    conn = get_connection()
    cursor = conn.cursor()
    query_strip = query.strip()
    
    try:
        cursor.execute(query, params)
        if query_strip.upper().startswith(("SELECT", "PRAGMA", "EXPLAIN")):
            rows = [dict(r) for r in cursor.fetchall()]
            conn.close()
            return {"success": True, "rows": rows, "count": len(rows)}
        else:
            conn.commit()
            affected = cursor.rowcount
            conn.close()
            return {"success": True, "affected": affected, "message": "Query executed successfully"}
    except Exception as e:
        conn.close()
        return {"success": False, "error": str(e)}

if __name__ == "__main__":
    init_db()
    print("Database initialized successfully at", DB_PATH)
    overview = get_class_overview()
    print(f"Loaded {len(overview['students'])} students and {len(overview['subjects'])} subjects.")
    print("Top student:", overview['students'][27]['full_name'], "with rank:", overview['students'][27]['overall_rank'])
