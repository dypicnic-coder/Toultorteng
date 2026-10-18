import React, { useState } from 'react';
import { Terminal, Database, Play, Code2, Layers, CheckCircle2, AlertCircle } from 'lucide-react';

export const SqlPythonConsole: React.FC = () => {
  const [query, setQuery] = useState<string>(
    `SELECT s.roll_number, s.full_name, s.gender, e.total_score, e.average_score, e.overall_rank, e.overall_grade, e.result_status
FROM students s
JOIN monthly_evaluations e ON s.id = e.student_id
WHERE e.result_status = 'ជាប់'
ORDER BY e.overall_rank ASC
LIMIT 10;`
  );

  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);
  const [queryError, setQueryError] = useState<string | null>(null);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'query' | 'schema' | 'python'>('query');

  const presetQueries = [
    {
      name: 'សិស្សពូកែជាប់ចំណាត់ថ្នាក់កំពូល (Top Ranks)',
      sql: `SELECT s.roll_number AS 'លេខ', s.full_name AS 'ឈ្មោះ', s.gender AS 'ភេទ', e.total_score AS 'ពិន្ទុសរុប', e.average_score AS 'មធ្យមភាគ', e.overall_rank AS 'ចំណាត់ថ្នាក់', e.overall_grade AS 'និទ្ទេស'
FROM students s
JOIN monthly_evaluations e ON s.id = e.student_id
ORDER BY e.overall_rank ASC
LIMIT 10;`,
    },
    {
      name: 'ស្ថិតិពិន្ទុតាមមុខវិជ្ជានីមួយៗ (Subject Averages)',
      sql: `SELECT su.name_km AS 'មុខវិជ្ជា', su.max_score AS 'ពិន្ទុពេញ', ROUND(AVG(ms.score), 2) AS 'ពិន្ទុមធ្យម', MAX(ms.score) AS 'ពិន្ទុខ្ពស់បំផុត', MIN(CASE WHEN ms.score > 0 THEN ms.score END) AS 'ពិន្ទុទាបបំផុត'
FROM subjects su
JOIN monthly_scores ms ON su.id = ms.subject_id
WHERE su.is_active = 1
GROUP BY su.id
ORDER BY su.sort_order;`,
    },
    {
      name: 'សិស្សអវត្តមានច្រើនជាងគេ (Attendance Outliers)',
      sql: `SELECT s.roll_number AS 'លេខ', s.full_name AS 'ឈ្មោះ', a.permission_days AS 'ច្បាប់ខែនេះ', a.unexcused_days AS 'អត់ច្បាប់ខែនេះ', (a.permission_days + a.unexcused_days) AS 'អវត្តមានសរុបខែនេះ'
FROM students s
JOIN attendance_records a ON s.id = a.student_id
WHERE (a.permission_days + a.unexcused_days) > 3
ORDER BY (a.permission_days + a.unexcused_days) DESC;`,
    },
    {
      name: 'តារាងទាំងអស់ក្នុង Database (Tables Schema)',
      sql: `SELECT type, name, tbl_name FROM sqlite_master WHERE type IN ('table', 'index') ORDER BY type, name;`,
    },
  ];

  const handleRunQuery = async () => {
    if (!query.trim()) return;
    setIsRunning(true);
    setQueryError(null);
    setResults(null);
    const startTime = performance.now();

    try {
      const res = await fetch('/api/sql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      const endTime = performance.now();
      setExecutionTime(Math.round(endTime - startTime));

      if (data.error) {
        setQueryError(data.error);
      } else if (data.rows) {
        setResults(data.rows);
      } else if (data.affected !== undefined) {
        setResults([{ message: data.message, affected_rows: data.affected }]);
      }
    } catch (err: any) {
      setQueryError(err.message || 'Failed to execute query');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Console Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-xl p-6 text-white shadow-md border border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Python 3.10 Engine + SQLite Relational Database</span>
            </div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Database className="w-5 h-5 text-amber-400" />
              <span>ប្រព័ន្ធគ្រប់គ្រងមូលដ្ឋានទិន្នន័យ SQL & Python Console</span>
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              មូលដ្ឋានទិន្នន័យ SQL ផ្ទុកទិន្នន័យពិន្ទុ វត្តមាន និងព័ត៌មានសិស្សទាំងអស់ ត្រូវបានគ្រប់គ្រង និងគណនាដោយកូដ Python ផ្ទាល់ (Database SQLite File: <code className="text-amber-300">backend/school.db</code>).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-white/10 text-slate-200 text-xs rounded-lg font-mono">
              Driver: Python sqlite3
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 pb-2 text-xs">
        <button
          onClick={() => setActiveSubTab('query')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
            activeSubTab === 'query'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>ដំណើរការ SQL Query</span>
        </button>
        <button
          onClick={() => setActiveSubTab('schema')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
            activeSubTab === 'schema'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>រចនាសម្ព័ន្ធតារាង SQL (Schema DDL)</span>
        </button>
        <button
          onClick={() => setActiveSubTab('python')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
            activeSubTab === 'python'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>កូដ Python គណនាពិន្ទុ (Python Engine)</span>
        </button>
      </div>

      {activeSubTab === 'query' && (
        <div className="space-y-4">
          {/* Preset Buttons */}
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div className="text-xs font-semibold text-slate-700 mb-2">គំរូ SQL Queries រហ័ស:</div>
            <div className="flex flex-wrap gap-2">
              {presetQueries.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuery(item.sql)}
                  className="px-2.5 py-1 text-xs bg-white border border-slate-300 hover:border-blue-500 hover:text-blue-600 rounded-md shadow-2xs transition"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Editor and Run Bar */}
          <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-md">
            <div className="bg-slate-800/80 px-4 py-2 border-b border-slate-700 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-300 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                <span>SQL Query Editor</span>
              </span>
              <button
                onClick={handleRunQuery}
                disabled={isRunning}
                className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium shadow-xs disabled:opacity-50 transition"
              >
                <Play className="w-3 h-3 fill-white" />
                <span>{isRunning ? 'កំពុងដំណើរការ...' : 'Execute (F5)'}</span>
              </button>
            </div>

            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={6}
              className="w-full bg-slate-900 text-emerald-400 font-mono text-xs p-4 focus:outline-none resize-y selection:bg-blue-900"
              placeholder="វាយបញ្ចូល SQL Query ទីនេះ (ឧ. SELECT * FROM students;)"
            />
          </div>

          {/* Results Area */}
          {queryError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
              <div>
                <div className="font-bold">SQL Execution Error:</div>
                <div className="font-mono mt-1 text-[11px]">{queryError}</div>
              </div>
            </div>
          )}

          {results && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden text-xs">
              <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>លទ្ធផលសំណួរទិន្នន័យ ({results.length} ជួរ)</span>
                </span>
                {executionTime !== null && (
                  <span className="text-[11px] font-mono text-slate-500">
                    ពេលវេលាដំណើរការ: {executionTime}ms
                  </span>
                )}
              </div>

              {results.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  មិនមានទិន្នន័យត្រូវបង្ហាញ (0 rows returned)
                </div>
              ) : (
                <div className="overflow-x-auto max-h-[400px]">
                  <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
                    <thead className="bg-slate-100 text-slate-800 sticky top-0 border-b border-slate-300">
                      <tr>
                        {Object.keys(results[0]).map((col) => (
                          <th key={col} className="p-2 border-r border-slate-300 font-mono font-bold">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-mono">
                      {results.map((row, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/50">
                          {Object.values(row).map((val: any, cIdx) => (
                            <td key={cIdx} className="p-2 border-r border-slate-200 text-slate-700">
                              {val === null ? <span className="text-slate-400 italic">NULL</span> : String(val)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {activeSubTab === 'schema' && (
        <div className="bg-slate-900 rounded-xl p-6 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800">
          <div className="text-amber-400 font-bold mb-3">// Relational SQL Schema (`backend/schema.sql`)</div>
          <pre className="text-slate-300 leading-relaxed whitespace-pre-wrap">{`-- School Score & Attendance Management System
-- Database Schema for SQLite

CREATE TABLE school_info (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    province TEXT, district TEXT, school_name TEXT,
    academic_year TEXT, class_name TEXT, teacher_name TEXT,
    commune TEXT, exam_date_solar TEXT, exam_date_lunar TEXT
);

CREATE TABLE subjects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,
    name_km TEXT NOT NULL,
    max_score REAL NOT NULL,
    sort_order INTEGER NOT NULL,
    is_active INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    roll_number INTEGER NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    gender TEXT CHECK(gender IN ('ប', 'ស', 'ប្រុស', 'ស្រី')),
    dob TEXT NOT NULL,
    status TEXT DEFAULT 'សកម្ម'
);

CREATE TABLE monthly_scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL REFERENCES students(id),
    subject_id INTEGER NOT NULL REFERENCES subjects(id),
    month TEXT NOT NULL,
    academic_year TEXT NOT NULL,
    score REAL,
    is_absent INTEGER DEFAULT 0,
    UNIQUE(student_id, subject_id, month, academic_year)
);

CREATE TABLE attendance_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL REFERENCES students(id),
    month TEXT NOT NULL,
    academic_year TEXT NOT NULL,
    permission_days INTEGER DEFAULT 0,
    unexcused_days INTEGER DEFAULT 0,
    prev_permission_days INTEGER DEFAULT 0,
    prev_unexcused_days INTEGER DEFAULT 0,
    daily_records TEXT DEFAULT '',
    UNIQUE(student_id, month, academic_year)
);

CREATE TABLE monthly_evaluations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL REFERENCES students(id),
    month TEXT NOT NULL,
    academic_year TEXT NOT NULL,
    total_score REAL DEFAULT 0,
    average_score REAL DEFAULT 0,
    overall_grade TEXT DEFAULT 'F',
    overall_rank INTEGER DEFAULT 0,
    result_status TEXT CHECK(result_status IN ('ជាប់', 'ធ្លាក់', 'អវត្តមាន')),
    teacher_remarks TEXT DEFAULT '',
    UNIQUE(student_id, month, academic_year)
);`}</pre>
        </div>
      )}

      {activeSubTab === 'python' && (
        <div className="bg-slate-900 rounded-xl p-6 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800">
          <div className="text-emerald-400 font-bold mb-3"># Python Scoring & Ranking Algorithm (`backend/database.py`)</div>
          <pre className="text-slate-300 leading-relaxed whitespace-pre-wrap">{`def calculate_grade_and_mention(avg: float, is_all_absent: bool = False):
    """
    Cambodian grading scale for average score out of 50 (divisor 8.4)
    A (ល្អប្រសើរ): 45 - 50
    B (ល្អ): 40 - 44.99
    C (ល្អបង្គួរ): 35 - 39.99
    D (មធ្យម): 30 - 34.99
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

def recalculate_rankings_internal(cursor, month="មីនា", academic_year="២០២៥-២០២៦"):
    # Divisor 8.4 exact calculation:
    total_score = sum(scores)
    avg_score = round(total_score / 8.4, 2) if total_score > 0 else 0.0
    grade, mention, result = calculate_grade_and_mention(avg_score, all_absent)
    
    # Sorts active students by total_score descending to assign rank 1 to 23
    # Tied / absent students assigned rank 24
    cursor.execute("""
        INSERT INTO monthly_evaluations (...)
        ON CONFLICT(...) DO UPDATE ...
    """)`}</pre>
        </div>
      )}
    </div>
  );
};
