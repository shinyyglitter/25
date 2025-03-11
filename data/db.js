
import pg from "pg";



const config = {
   connectionString: process.env.DATABASE_URL,
    ssl: process.env.DB_SSL === "true" ? process.env.DB_SSL : { "rejectUnauthorized": false }
 }

 export async function create(statement,...values){
  return await runQuery(statement, ...values);  
}
export async function read(statement,...values){
   return await runQuery(statement,...values);
}
 export async function update(statement,...values){
   return await runQuery(statement,...values);
}
export async function remove(statement,...values){
   return await runQuery(statement,...values);
}  

 async function runQuery(query, ...values){
  const client = new pg.Client(config);

  try {
      client.connect();
      const result = client.query(statment, [...values])
      if (result.rowcount <= 0) {
          throw new Error("No records created");
      }
      return result.row[0];

  } catch (error) {
      console.error(error);
      return null;

  } finally {
      client.close();
  }
}

const DbManager = { create, update, read, remove };

export default DbManager;