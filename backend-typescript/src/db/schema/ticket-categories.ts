import {
    boolean,
    pgTable,
    timestamp,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

export const ticketCategories = pgTable("ticket_categories", {
    id: uuid("id")
        .primaryKey()
        .$defaultFn(() => uuidv7()),
    code: varchar("code", { length: 50 }).notNull().unique(),
    name: varchar("name", { length: 150 }).notNull(),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
});

export type TicketCategory = typeof ticketCategories.$inferSelect;
export type NewTicketCategory = typeof ticketCategories.$inferInsert;
