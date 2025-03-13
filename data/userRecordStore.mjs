import RecordStoreAbstractInterface from "./abstractRecordStore.mjs";
import DbManager from "./db.js";

class UserRecordStore {
    constructor() {
        this.abstractInterface = RecordStoreAbstractInterface();  // ✅ Use composition
    }

    async create(user) {
        try {
            console.log("Inserting user into DB:", user);  // ✅ Debugging log
            const result = await DbManager.create(
                `INSERT INTO "public"."users"("username") VALUES($1) RETURNING "user_id", "username";`,
                [user.username]
            );
            console.log("DB result:", result);
            return result;
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        }
    }

    read(user_id) {
        return DbManager.read(
            `SELECT "user_id", "username" FROM "public"."users" WHERE "user_id" = $1;`, 
            [user_id]
        );
    }

    update(user) {
        return DbManager.update(
            `UPDATE "public"."users" SET "username" = $1 WHERE "user_id" = $2 RETURNING "user_id", "username";`, 
            [user.username, user.user_id]
        );
    }

    remove(user_id) {
        return DbManager.remove(
            `DELETE FROM "public"."users" WHERE "user_id" = $1 RETURNING "user_id";`, 
            [user_id]
        );
    }
}

// ✅ Export as an instance
export default UserRecordStore;
