import { pgTable, uuid, timestamp, varchar, boolean } from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

export const tasks = pgTable("tasks", {
    id: uuid("id").primaryKey().$defaultFn(() => uuidv7()),
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow().$onUpdate(() => new Date()),
    title: varchar("title", { length: 256 }).notNull(),
    description: varchar("description").notNull().default(""),
    isCompleted: boolean("is_completed").notNull().default(false),
});

