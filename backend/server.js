const express = require('express');  // minimal web server framework for handling HTTP requests and routes
const cors = require('cors'); // middleware to let backend accept requests (from frontend)
const pool = require('./db') // postgresql connection pool from db.js
require('dotenv').config() 

// creates express instance
const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(cors());
app.use(express.json());

// create table
const createTable = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS books (
            id SERIAL PRIMARY KEY, 
            title VARCHAR(255) NOT NULL,
            author VARCHAR(255),
            status VARCHAR(20) CHECK (status IN ('to-read', 'reading', 'completed')) DEFAULT 'to-read',
            created_at TIMESTAMP DEFAULT NOW()
        );
    `);
};
createTable()

// routes -> routs for express server at /books
// async -> makes function asycnhronous to use await (wait for db query to finish befores sending response)
// req -> contains information about incoming request
// res -> lets you send data base to client (frontend)
app.get('/books', async (req, res) => {
    const { status } = req.query;
    const query = status
        ? 'SELECT * FROM books WHERE status = $1 ORDER BY created_at DESC'
        : 'SELECT * FROM books ORDER BY created_at DESC';
    const params = status ? [status] : [];
    const result = await pool.query(query, params);
    res.json(result.rows);
});

// $1, $2, $3 to prevent SQL injection
// 201 -> HTTP for "created"
app.post('/books', async (req, res) => {
    const { title, author, status } = req.body;
    const result = await pool.query(
        'INSERT INTO books (title, author, status) VALUES ($1, $2, $3) RETURNING *',
        [title, author, status]
    );
    res.status(201).json(result.rows[0]);
});

// deletes book by ID
// 204 -> no content aka "request succeeded, but nothing to send back"
app.delete('/books/:id', async(req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM books WHERE id = $1', [id]);
    res.sendStatus(204);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})