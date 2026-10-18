"""
School Score & Attendance Management System - Python API CLI Bridge
Processes commands and outputs JSON for the web server and terminal.
"""

import sys
import json
import os

# Ensure backend directory is in path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
import database

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No command provided"}))
        sys.exit(1)

    command = sys.argv[1]

    try:
        if command == "overview":
            month = sys.argv[2] if len(sys.argv) > 2 else "មីនា"
            res = database.get_class_overview(month)
            print(json.dumps(res, ensure_ascii=False))

        elif command == "bulletin":
            if len(sys.argv) < 3:
                print(json.dumps({"error": "Missing student_id"}))
                sys.exit(1)
            student_id = int(sys.argv[2])
            month = sys.argv[3] if len(sys.argv) > 3 else "មីនា"
            res = database.get_student_bulletin(student_id, month)
            print(json.dumps(res, ensure_ascii=False))

        elif command == "honor":
            month = sys.argv[2] if len(sys.argv) > 2 else "មីនា"
            res = database.get_honor_roll(month)
            print(json.dumps(res, ensure_ascii=False))

        elif command == "update_score":
            student_id = int(sys.argv[2])
            subject_id = int(sys.argv[3])
            score_arg = sys.argv[4]
            score = float(score_arg) if score_arg.lower() != "null" and score_arg != "none" else None
            is_absent = sys.argv[5].lower() in ("true", "1") if len(sys.argv) > 5 else (score is None)
            res = database.update_student_score(student_id, subject_id, score, is_absent)
            print(json.dumps(res, ensure_ascii=False))

        elif command == "update_attendance":
            student_id = int(sys.argv[2])
            permission = int(sys.argv[3])
            unexcused = int(sys.argv[4])
            prev_permission = int(sys.argv[5])
            prev_unexcused = int(sys.argv[6])
            notes = sys.argv[7] if len(sys.argv) > 7 else ""
            res = database.update_attendance_record(student_id, permission, unexcused, prev_permission, prev_unexcused, notes)
            print(json.dumps(res, ensure_ascii=False))

        elif command == "recalculate":
            month = sys.argv[2] if len(sys.argv) > 2 else "មីនា"
            conn = database.get_connection()
            cur = conn.cursor()
            database.recalculate_rankings_internal(cur, month)
            conn.commit()
            conn.close()
            print(json.dumps({"success": True, "message": "Rankings recalculated successfully"}))

        elif command == "sql":
            query = sys.argv[2]
            res = database.execute_raw_sql(query)
            print(json.dumps(res, ensure_ascii=False))

        elif command == "add_student":
            payload = json.loads(sys.argv[2])
            conn = database.get_connection()
            cur = conn.cursor()
            cur.execute("""
                INSERT INTO students (roll_number, full_name, gender, dob, status)
                VALUES (?, ?, ?, ?, ?)
            """, (payload["roll_number"], payload["full_name"], payload["gender"], payload["dob"], "សកម្ម"))
            new_id = cur.lastrowid
            # Seed 0 scores for active subjects
            cur.execute("SELECT id FROM subjects WHERE is_active = 1")
            for sub in cur.fetchall():
                cur.execute("""
                    INSERT INTO monthly_scores (student_id, subject_id, month, academic_year, score, is_absent)
                    VALUES (?, ?, 'មីនា', '២០២៥-២០២៦', 0, 1)
                """, (new_id, sub[0]))
            cur.execute("""
                INSERT INTO attendance_records (student_id, month, academic_year, permission_days, unexcused_days, prev_permission_days, prev_unexcused_days)
                VALUES (?, 'មីនា', '២០២៥-២០២៦', 0, 0, 0, 0)
            """, (new_id,))
            database.recalculate_rankings_internal(cur, "មីនា")
            conn.commit()
            conn.close()
            print(json.dumps({"success": True, "id": new_id}))

        elif command == "delete_student":
            student_id = int(sys.argv[2])
            conn = database.get_connection()
            cur = conn.cursor()
            cur.execute("DELETE FROM students WHERE id = ?", (student_id,))
            database.recalculate_rankings_internal(cur, "មីនា")
            conn.commit()
            conn.close()
            print(json.dumps({"success": True}))

        elif command == "update_school_info":
            payload = json.loads(sys.argv[2])
            conn = database.get_connection()
            cur = conn.cursor()
            cur.execute("""
                UPDATE school_info SET
                    province = ?, district = ?, school_name = ?, academic_year = ?,
                    class_name = ?, teacher_name = ?, commune = ?,
                    exam_date_solar = ?, exam_date_lunar = ?
                WHERE id = 1
            """, (
                payload.get("province", "ខេត្តព្រះសីហនុ"),
                payload.get("district", "ស្រុកព្រៃនប់"),
                payload.get("school_name", "អនុវិទ្យាល័យទួលទទឹង"),
                payload.get("academic_year", "២០២៥-២០២៦"),
                payload.get("class_name", "ថ្នាក់ទី ៩ \"ក\""),
                payload.get("teacher_name", "កាន់ វ៉ាន់ឌី"),
                payload.get("commune", "ឃុំទួលទទឹង"),
                payload.get("exam_date_solar", "ថ្ងៃទី ២៥ ខែមីនា ឆ្នាំ២០២៦"),
                payload.get("exam_date_lunar", "ថ្ងៃពុធ ៧កើត ខែចេត្រ ឆ្នាំម្សាញ់ សប្តស័ក ព.ស ២៥៦៩")
            ))
            conn.commit()
            conn.close()
            print(json.dumps({"success": True}))

        else:
            print(json.dumps({"error": f"Unknown command {command}"}))
            sys.exit(1)

    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

if __name__ == "__main__":
    main()
