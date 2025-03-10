import { config } from "dotenv"
import pkg from "pg";
const { Pool } = pkg;
config()

const pool = new Pool({
   connectionString: process.env.DATABASE_URL,
    ssl: false
 })

 /*async function testConnection() {
   console.log("Tester tilkobling...");
   try {
      const res = await pool.query("SELECT 1 + 1");
       console.log("Resultat fra spørring:", res); 
       if (res && res.rows && res.rows.length > 0) {
           console.log("Koblet til database:", res.rows[0].current_database);
       }
   } catch (err) {
       console.error("Feil ved tilkobling:", err.message || err);
       console.error("Feilstack:", err.stack);
   }
}*/

 async function runQuery(query, ...values){
   const client = await pool.connect();
   
   try{
      
       const result = await client.query(query, values);

       if(result.rowCount <= 0){
           throw new Error("Row count is 0. Nothing created.");
       }

       return result.rows[0];

   } catch(error){
       console.error("Database error:", error);
       throw error

   }finally{
      client.release();
   }
}
/*async function run() {
   console.log("Starter tilkoblingstest...");
   await testConnection();
   console.log("Tilkoblingstest fullført.");
}

run();  */

//CRUD
 export async function create(statement,...values){
   console.log("Kjører spørring:", statement, "med verdier:", values); 

  const result = await runQuery(statement, ...values);  

  console.log("Resultat fra spørring:", result);  
  return result;
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
