import {
    index,
    pgEnum,
    pgTable,
    text,
    timestamp,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

import { user } from "./auth-schema.js";
import { offices } from "./offices.js";
import { ticketCategories } from "./ticket-categories.js";

export const ticketPriorityEnum = pgEnum("ticket_priority", [
    "low",
    "medium",
    "high",
    "urgent",
]);

export const ticketStatusEnum = pgEnum("ticket_status", [
    "open",
    "in_progress",
    "resolved",
    "closed",
    "cancelled",
]);

export const tickets = pgTable(
    "tickets",
    {
        id: uuid("id")
            .primaryKey()
            .$defaultFn(() => uuidv7()),
        title: varchar("title", { length: 256 }).notNull(),
        description: text("description").notNull().default(""),
        status: ticketStatusEnum("status").notNull().default("open"),
        priority: ticketPriorityEnum("priority").notNull().default("medium"),
        officeId: uuid("office_id")
            .notNull()
            .references(() => offices.id, {
                onDelete: "restrict",
            }),
        categoryId: uuid("category_id")
            .notNull()
            .references(() => ticketCategories.id, {
                onDelete: "restrict",
            }),
        createdBy: text("created_by")
            .notNull()
            .references(() => user.id, {
                onDelete: "restrict",
            }),
        assignedTo: text("assigned_to").references(() => user.id, {
            onDelete: "set null",
        }),
        deadline: timestamp("deadline", {
            mode: "date",
            withTimezone: true,
        }),
        createdAt: timestamp("created_at", {
            mode: "date",
            withTimezone: true,
        })
            .notNull()
            .defaultNow(),
        updatedAt: timestamp("updated_at", {
            mode: "date",
            withTimezone: true,
        })
            .notNull()
            .defaultNow()
            .$onUpdate(() => new Date()),
        deletedAt: timestamp("deleted_at", {
            mode: "date",
            withTimezone: true,
        }),
    },
    (table) => [
        index("tickets_office_id_idx").on(table.officeId),
        index("tickets_category_id_idx").on(table.categoryId),
        index("tickets_created_by_idx").on(table.createdBy),
        index("tickets_assigned_to_idx").on(table.assignedTo),
        index("tickets_status_idx").on(table.status),
        index("tickets_deadline_idx").on(table.deadline),
        index("tickets_created_at_idx").on(table.createdAt),
    ],
);

export type Ticket = typeof tickets.$inferSelect;
export type NewTicket = typeof tickets.$inferInsert;
