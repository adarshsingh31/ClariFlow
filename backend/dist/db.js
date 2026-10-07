const dotenv = require("dotenv");
const contract = require("../prisma/contract.json");

dotenv.config();

let db;

async function connectDatabase() {
    const { default: postgres } = await import("@prisma/orm-postgres/runtime");

    db = postgres({
        url: process.env.DATABASE_URL,
        contract,
    });

    await db.connect();

    console.log("Prisma 8 PostgreSQL connected");
}

async function closeDatabase() {
    if (db) {
        await db.close();
    }
}

module.exports = {
    connectDatabase,
    closeDatabase,
};