import mysql from "mysql2/promise";
import dotenv from "dotenv";

export async function query({ query, values = [] }) {
  const dbconnection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DB,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    // socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
  });
  try {
    const [results] = await dbconnection.execute(query, values);
    dbconnection.end();
    return results;
  } catch (error) {
    throw Error(error.message);
    return { error };
  }
}
export async function queryTransaction(operations) {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DB,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    // Uncomment the next line if you are using a local server that requires it, like MAMP:
    // socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
  });

  try {
    // Starting transaction
    await connection.beginTransaction();

    // Processing all operations
    for (let { query, values } of operations) {
      await connection.execute(query, values);
    }

    // If all operations are successful, commit the transaction
    await connection.commit();
    return { success: true };
  } catch (error) {
    // If any operation fails, rollback the transaction
    await connection.rollback();
    throw error; // Re-throw the error for further handling
  } finally {
    // Always close the connection whether the transaction succeeds or fails
    await connection.end();
  }
}