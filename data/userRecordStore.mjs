import RecordStoreAbstractInterface from "./abstractRecordStore.mjs";
import * as db from "./db.js";


class UserRecordStore extends RecordStoreAbstractInterface{
    async create(user_id, username) {
        console.log("Oppretter bruker med id:", user_id, "og username:", username);
    
        const query = `
            INSERT INTO users (user_id, username)
            VALUES ($1, $2)
            RETURNING *;
        `;
    
        const values = [
          user_id,
          username
        ];
    
      }      


async readAll(){
    let query = `SELECT * FROM users`;

    return await db.read(query);
}

async read(user_id){
    const query = `SELECT * FROM users WHERE user_id = $1`;

    return await db.read(query, user_id);
}

async update(user_id, username){
    const query = `
        UPDATE users
        SET username = $1
        WHERE user_id = $2
        RETURNING *;
    `;

    return await db.update(query, username, user_id);
}

async remove(user_id){
    const query = `DELETE FROM users WHERE user_id = $1 RETURNING *`;

    return await db.remove(query, user_id);
}
}

export default UserRecordStore
