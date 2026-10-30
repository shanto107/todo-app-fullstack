import { loadEnvFile } from "node:process";

import {
    taskPriorityValues,
    taskStatusValues,
} from "../../modules/tasks/tasks.validation.js";
import { connection, db } from "../index.js";
import { designations } from "../schema/designations.js";
import { tasks } from "../schema/tasks.js";
import { designationSeeds } from "./designations.js";
import { MOCK_TASK_MARKER, mockTasks } from "./tasks.js";
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

async function seedDesignations() {
    console.log("🚀 Seeding designations...");

    const result = await db
        .insert(designations)
        .values([...designationSeeds])
        .onConflictDoNothing({
            target: designations.code,
        })
        .returning({
            id: designations.id,
            name: designations.name,
            code: designations.code,
        });

    console.log(`✅ Created ${result.length} designations.`);
}

await seedDesignations();
