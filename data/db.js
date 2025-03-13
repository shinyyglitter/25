import pg from "pg";

const config = {
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DB_SSL === "true" ? process.env.DB_SSL : { "rejectUnauthorized": false }
};

export async function create(query, ...values) {
    return await runQuery(query, ...values);
}

export async function read(query, ...values) {
    return await runQuery(query, ...values);
}

export async function update(query, ...values) {
    return await runQuery(query, ...values);
}

export async function remove(query, ...values) {
    return await runQuery(query, ...values);
}

async function runQuery(query, ...values) {
    const client = new pg.Client(config);

    try {
        await client.connect(); // Corrected to await the connect
        const result = await client.query(query, [...values]); // Corrected query parameter
        if (result.rowCount <= 0) {
            throw new Error("No records created");
        }
        return result.rows[0]; // Corrected to return the first row of results
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        await client.end(); // Use end() instead of close()
    }
}

const DbManager = { create, update, read, remove };

export default DbManager;
