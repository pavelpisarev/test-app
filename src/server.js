const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./db');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

// GET /posts
app.get('/posts', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM posts ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /posts/:id
app.get('/posts/:id', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM posts WHERE id = $1', [
      req.params.id,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'Post not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST /posts
app.post('/posts', async (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  try {
    const result = await db.query(
      'INSERT INTO posts (title, content, author) VALUES ($1, $2, $3) RETURNING *',
      [title, content, author || 'Anonymous']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date(),
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Глобальные обработчики ошибок
process.on('uncaughtException', (err) => {
  console.error('[FATAL] Uncaught Exception:', err.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('[FATAL] Unhandled Promise Rejection:', reason);
  process.exit(1);
});

module.exports = { app };
