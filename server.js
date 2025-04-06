const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'calcuser',
  password: 'KPNS1@kpns',
  database: 'calculator_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Save calculation
app.post('/api/history', (req, res) => {
    const { expression, result } = req.body;
    const sql = 'INSERT INTO history (expression, result) VALUES (?, ?)';
    db.query(sql, [expression, result], (err) => {
        if (err) return res.status(500).send(err);
        res.sendStatus(200);
    });
});

// Get history
app.get('/api/history', (req, res) => {
  db.query('SELECT * FROM history', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' }); // use return
    }
    res.json(results);
  });
});


app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on http://13.53.131.60:3000');
});


