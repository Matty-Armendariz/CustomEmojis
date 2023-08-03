// Import required modules
import mysql from 'mysql2/promise';

// Connection settings
const dbConfig = {
  host: 'srv734.hstgr.io', // Replace with your MariaDB host
  user: 'u364770181_MI24', // Replace with your database username
  password: 'GoodGuys2023', // Replace with your database password
  database: 'u364770181_MI24', // Replace with your database name
};

// Create the database connection pool
const pool = mysql.createPool(dbConfig);

// Function to execute queries
async function executeQuery(query: string, params: any[] = []): Promise<any> {
  const connection = await pool.getConnection();

  try {
    const [rows] = await connection.query(query, params);
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

// Example usage
async function exampleUsage() {
  try {
    const rows = await executeQuery('SELECT * FROM emoji');
    console.log(rows);
  } catch (error) {
    console.error('Error executing query:', error);
  }
}

exampleUsage();