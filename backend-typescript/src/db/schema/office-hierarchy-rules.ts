import { sql } from "drizzle-orm";
import {
    check,
    pgTable,
    timestamp,
    uniqueIndex,
    uuid,
} from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

import { officeCategories } from "./office-categories.js"

export const officeHierarchyRules = pgTable(
    "office_hierarchy_rules",
    {
        id: uuid("id")
            .primaryKey()
            .$defaultFn(() => uuidv7()),
        parentOfficeCategoryId: uuid("parent_office_category_id")
            .notNull()
            .references(() => officeCategories.id, { onDelete: "restrict" }),
        childOfficeCategoryId: uuid("child_office_category_id")
            .notNull()
            .references(() => officeCategories.id, { onDelete: "restrict" }),
        createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
            .notNull()
            .defaultNow(),
    },
    (table) => [
        uniqueIndex("office_hierarchy_rules_pair_unique").on(
            table.parentOfficeCategoryId,
            table.childOfficeCategoryId,
        ),
        check(
            "office_hierarchy_rules_no_self_parent",
            sql`${table.parentOfficeCategoryId} <> ${table.childOfficeCategoryId}`,
        ),
    ],
);

export type OfficeHierarchyRule = typeof officeHierarchyRules.$inferSelect;
export type NewOfficeHierarchyRule = typeof officeHierarchyRules.$inferInsert;
