const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // change if different
    password: '', // add your MySQL password here
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
    db.query('SELECT * FROM history ORDER BY calculated_at DESC LIMIT 10', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

