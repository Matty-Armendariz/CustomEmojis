// Import required modules
import mysql from 'mysql2/promise';

interface EmojiData {
    id: number;
    name: string;
    emoji: string;
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
    console.log(rows);
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
    const query = 'SELECT * FROM your_table_name WHERE name = ?';
    
    const fullQuery = query 
    // Execute the query with the provided name as a parameter
    // const [rows] = await connection.execute<any[]>(query, [name]);
    const rows = executeQuery(query + ' ' + name)

    // Close the connection
    await connection.end();

    // Return the emoji or null if no match was found
    if (rows) {
      const matchingString = rows[0].emoji;
      const myBlob = new Blob([matchingString], { type: 'text/plain' });
      // Convert the Blob back to an Image
      const originalImageType = 'image/jpeg'; // Replace with the actual image type you have before converting to Blob
      const imageElement = await blobToImage(myBlob, originalImageType);
      return imageElement;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

async function blobToImage(blob: Blob, originalImageType: string): Promise<HTMLImageElement> {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = (error) => reject(error);
        image.src = reader.result as string;
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(blob);
    });
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