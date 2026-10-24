import {
    taskPriorityValues,
    taskStatusValues,
} from "../../modules/tasks/tasks.validation.js";
import { connection, db } from "../index.js";
import { tasks } from "../schema/tasks.js";
import { MOCK_TASK_MARKER, mockTasks } from "./mock-tasks.js";

import { loadEnvFile } from "node:process";
loadEnvFile(".env");

async function seed() {
    if (process.env.NODE_ENV === "production") {
        throw new Error("Database seeding is disabled in production.");
    }

    console.log(`🚀 Seeding ${mockTasks.length} mock tasks...`);

    const now = new Date();

    const entries = mockTasks.map((task, index) => {
        const createdAt = new Date(now);
        createdAt.setDate(now.getDate() - index);

        const deadline = new Date(now);
        deadline.setDate(now.getDate() + (index % 20) - 7);

        const deletedAt = index % 10 === 0 ? new Date() : null;
        const status = taskStatusValues[index % taskStatusValues.length];
        const priority = taskPriorityValues[index % 4];

        return {
            title: `${MOCK_TASK_MARKER} ${task.title}`,
            status,
            priority,
            createdAt,
            updatedAt: createdAt,
            deadline,
            deletedAt,
        };
    });

    const result = await db.insert(tasks).values(entries).returning({
        id: tasks.id,
    });

    console.log(`✅ Created ${result.length} mock tasks Successfully.`);
}

seed()
    .catch((error) => {
        console.error("🚫 Failed to seed mock tasks!");
        console.error(error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await connection.end();
    });
