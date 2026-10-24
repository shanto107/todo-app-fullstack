import { taskStatusValues } from "../../modules/tasks/tasks.validation.js";
import { connection, db } from "../index.js";
import { tasks } from "../schema/tasks.js";


import { loadEnvFile } from "node:process";
loadEnvFile(".env");

async function clearMockTasks() {
    if (process.env.NODE_ENV === "production") {
        throw new Error(
            "Clearing mock tasks is disabled in production."
        );
    }

    console.log("Removing mock tasks...");

    const result = await db
        .delete(tasks)
        .returning({
            id: tasks.id
        });

    console.log(
        `✅ Removed ${result.length} mock tasks.`
    );
}

clearMockTasks()
    .catch(error => {
        console.error(
            "🚫 Failed to clear mock tasks:"
        );

        console.error(error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await connection.end();
    });
