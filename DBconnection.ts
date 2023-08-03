// Import required modules
import mysql from 'mysql2/promise';
import Jimp from "jimp";

interface EmojiData {
    id: number;
    name: string;
    image: string;
  }

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
    const rows = await connection.query(query, params);
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

export async function getEmojis(query: string, params: any[] = []): Promise<any> {
    const connection = await pool.getConnection();

    try{
        return executeQuery('SELECT * FROM emoji');
    }  catch (error){
        throw error;
    } finally { 
        connection.release();
    }

}

export async function getEmoji(name: string): Promise<any>{
    try{
    const connection = await pool.getConnection()
    // Define the SQL query
    const query = 'SELECT * FROM emoji WHERE name =';
    
    const fullQuery = query 
    // Execute the query with the provided name as a parameter
    // const [rows] = await connection.execute<any[]>(query, [name]);
    const rows = await executeQuery(query + ' \'' + name + '\'')

    // Return the emoji or null if no match was found
    if (rows) {
      console.log(rows);
      const imageUrl = rows[0][0].url.toString();
      // const matchingString = rows[0].image.toString('base64');
      // const image = 
      // Close the connection
      connection.end();
      return rows[0][0];
    } else {
      // Close the connection
      await connection.end();
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

async function blobToImage(buffer: Buffer, originalImageType: string): Promise<Jimp> {
    return new Promise<Jimp>((resolve, reject) => {
      Jimp.read(buffer, (error, image) => {
        if (error) {
          reject(error);
        } else {
          resolve(image);
        }
      });
    });
  }


// Example usage
async function exampleUsage() {
  try {
    const rows = await executeQuery('SELECT * FROM emoji');
  } catch (error) {
    console.error('Error executing query:', error);
  }
}

// exampleUsage();