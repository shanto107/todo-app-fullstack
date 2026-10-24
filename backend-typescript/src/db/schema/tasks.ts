import { pgTable, uuid, timestamp, varchar, boolean, pgEnum } from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

export const taskPriorityEnum = pgEnum("task_priority", ["low", "medium", "high", "urgent"]);
export const taskStatusEnum = pgEnum("task_status", ["todo", "in_progress", "done", "cancelled"])

export const tasks = pgTable("tasks", {
    id: uuid("id")
        .primaryKey()
        .$defaultFn(() => uuidv7()),
    createdAt: timestamp("created_at", { mode: "date" })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" })
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at", { mode: "date" }),
    title: varchar("title", { length: 256 })
        .notNull(),
    description: varchar("description")
        .notNull()
        .default(""),
    deadline: timestamp("deadline", { mode: "date" }),
    priority: taskPriorityEnum("priority"),
    status: taskStatusEnum("status")
        .notNull()
        .default("todo")
});

