import express, { Request, Response } from 'express';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Helper function to call Python backend script
function callPython(args: string[]): Promise<any> {
  return new Promise((resolve, reject) => {
    const pythonScript = path.join(__dirname, 'backend', 'app.py');
    const proc = spawn('python3', [pythonScript, ...args], { cwd: __dirname });

    let stdout = '';
    let stderr = '';

    proc.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    proc.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    proc.on('close', (code) => {
      if (code !== 0) {
        console.error('Python error:', stderr);
        return reject(new Error(stderr || `Python process exited with code ${code}`));
      }
      try {
        const json = JSON.parse(stdout);
        resolve(json);
      } catch (err) {
        console.error('JSON parse error from python:', stdout);
        reject(new Error(`Failed to parse Python output: ${stdout}`));
      }
    });
  });
}

// API Routes
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', engine: 'Python 3 + SQLite', timestamp: new Date().toISOString() });
});

// Get full class overview, scores, ranks, stats
app.get('/api/overview', async (req: Request, res: Response) => {
  const month = (req.query.month as string) || 'មីនា';
  try {
    const data = await callPython(['overview', month]);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Get individual student bulletin / report card
app.get('/api/bulletin/:id', async (req: Request, res: Response) => {
  const studentId = req.params.id;
  const month = (req.query.month as string) || 'មីនា';
  try {
    const data = await callPython(['bulletin', studentId, month]);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Get top 5 honor students
app.get('/api/honor', async (req: Request, res: Response) => {
  const month = (req.query.month as string) || 'មីនា';
  try {
    const data = await callPython(['honor', month]);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Update a student's score
app.post('/api/score', async (req: Request, res: Response) => {
  const { student_id, subject_id, score, is_absent } = req.body;
  if (!student_id || !subject_id) {
    return res.status(400).json({ error: 'Missing student_id or subject_id' });
  }
  try {
    const scoreVal = score === null || score === undefined ? 'null' : String(score);
    const absentVal = is_absent ? 'true' : 'false';
    const data = await callPython(['update_score', String(student_id), String(subject_id), scoreVal, absentVal]);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Update attendance record
app.post('/api/attendance', async (req: Request, res: Response) => {
  const { student_id, permission_days, unexcused_days, prev_permission_days, prev_unexcused_days, notes } = req.body;
  if (!student_id) {
    return res.status(400).json({ error: 'Missing student_id' });
  }
  try {
    const data = await callPython([
      'update_attendance',
      String(student_id),
      String(permission_days || 0),
      String(unexcused_days || 0),
      String(prev_permission_days || 0),
      String(prev_unexcused_days || 0),
      notes || ''
    ]);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Recalculate rankings
app.post('/api/recalculate', async (_req: Request, res: Response) => {
  try {
    const data = await callPython(['recalculate']);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Execute raw SQL query via Python
app.post('/api/sql', async (req: Request, res: Response) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'Missing SQL query' });
  }
  try {
    const data = await callPython(['sql', query]);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Add student
app.post('/api/students', async (req: Request, res: Response) => {
  const { roll_number, full_name, gender, dob } = req.body;
  if (!roll_number || !full_name || !gender) {
    return res.status(400).json({ error: 'Missing required student fields' });
  }
  try {
    const data = await callPython(['add_student', JSON.stringify({ roll_number, full_name, gender, dob })]);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Delete student
app.delete('/api/students/:id', async (req: Request, res: Response) => {
  try {
    const data = await callPython(['delete_student', req.params.id]);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Update school info
app.post('/api/school-info', async (req: Request, res: Response) => {
  try {
    const data = await callPython(['update_school_info', JSON.stringify(req.body)]);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Setup Vite middleware in dev or static in prod
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} (dev: ${!isProd})`);
  });
}

startServer();
