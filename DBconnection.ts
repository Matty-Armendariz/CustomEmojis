const express = require('express');
const mysql = require('mysql2');

const app = express();

// MySQL connection configuration
const connection = mysql.createConnection({
  host: 'jdbc:mysql://185.212.71.204/u364770181_MI24',
  user: 'u364770181_MI24',
  password: 'GoodGuys2023',
  database: 'u364770181_MI24',
});

// API to fetch data from MySQL
app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM emoji';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json(results);
    }
  });
});

// Other APIs for database operations go here...

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});