import { loadEnvFile } from "node:process";

import { connection, db } from "../index.js";
import { designations } from "../schema/designations.js";
import { tasks } from "../schema/tasks.js";

loadEnvFile(".env");

async function clearMockTasks() {
    console.log("Removing mock tasks...");
    const result = await db.delete(tasks).returning({ id: tasks.id });
    console.log(`✅ Removed ${result.length} mock tasks.`);
}

async function clearDesignations() {
    console.log("Removing designations...");
    const result = await db
        .delete(designations)
        .returning({ id: designations.id });
    console.log(`✅ Removed ${result.length} designations.`);
}

async function main() {
    if (process.env.NODE_ENV === "production") {
        throw new Error("Clearing mock data is disabled in production.");
    }
    try {
        await clearMockTasks();
        await clearDesignations();
    } finally {
        await connection.end();
    }
}

main().catch((error) => {
    console.error("🚫 Failed to clear mock data:");
    console.error(error);
    process.exitCode = 1;
});
