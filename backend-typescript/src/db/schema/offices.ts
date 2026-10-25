import {
    boolean,
    foreignKey,
    index,
    pgTable,
    text,
    timestamp,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

import { organization } from "./auth-schema.js";
import { officeCategories } from "./office-categories.js";

export const offices = pgTable(
    "offices",
    {
        id: uuid("id")
            .primaryKey()
            .$defaultFn(() => uuidv7()),
        organizationId: text("organization_id")
            .notNull()
            .unique()
            .references(() => organization.id, { onDelete: "restrict" }),
        parentOfficeId: uuid("parent_office_id"),
        officeCategoryId: uuid("office_category_id")
            .notNull()
            .references(() => officeCategories.id, { onDelete: "restrict" }),
        code: varchar("code", { length: 20 }).notNull().unique(),
        name: varchar("name", { length: 200 }).notNull(),
        isActive: boolean("is_active").notNull().default(true),
        createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
            .notNull()
            .defaultNow(),
        updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
            .notNull()
            .defaultNow()
            .$onUpdate(() => new Date()),
    },
    (table) => [
        foreignKey({
            name: "offices_parent_office_id_fk",
            columns: [table.parentOfficeId],
            foreignColumns: [table.id],
        }).onDelete("restrict"),
        index("offices_parent_office_id_idx").on(table.parentOfficeId),
        index("offices_office_category_id_idx").on(table.officeCategoryId),
    ],
);

export type Office = typeof offices.$inferSelect;
export type NewOffice = typeof offices.$inferInsert;
