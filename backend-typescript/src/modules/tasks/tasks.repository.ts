import {
    and,
    count,
    eq,
    gte,
    inArray,
    isNotNull,
    isNull,
    lte,
} from "drizzle-orm";

import { NotFoundError } from "#src/utils/errors/app-error.js";

import { type DB } from "../../db/index.js";
import { tasks } from "../../db/schema/tasks.js";
import { buildTaskQuery } from "../../utils/helper-functions/build-task-query-conditions.js";
import setDate from "../../utils/helper-functions/set-date.js";
import type {
    NewTask,
    PaginatedTasks,
    Task,
    TaskCounts,
    TaskQuery,
    UpdateTaskPayload,
} from "./tasks.types.js";

export type TaskRepo = {
    addTask: (newTask: NewTask) => Promise<Task>;
    getTasks: (filters: TaskQuery) => Promise<PaginatedTasks>;
    getTaskById: (id: string) => Promise<Task>;
    getTaskCounts: () => Promise<TaskCounts>;
    updateTask: (payload: UpdateTaskPayload) => Promise<Task>;
    deleteTask: (id: string) => Promise<Task>;
    restoreTask: (id: string) => Promise<Task>;
    // bulk actions
    bulkCompleteTasks: (ids: string[]) => Promise<number>;
    bulkActivateTasks: (ids: string[]) => Promise<number>;
    bulkDeleteTasks: (ids: string[]) => Promise<number>;
    bulkRestoreTasks: (ids: string[]) => Promise<number>;
    // bulkPermanentDeleteTasks: (ids: string[]) => Promise<number>;
};

export function createTaskRepo(db: DB): TaskRepo {
    return {
        addTask: async (newTask: NewTask): Promise<Task> => {
            const [result] = await db.insert(tasks).values(newTask).returning();
            if (!result) {
                throw new Error("Failed to create new Task! Please try again!");
            }
            return result;
        },

        getTasks: async (query: TaskQuery): Promise<PaginatedTasks> => {
            const { where, orderBy, page, limit, offset } =
                buildTaskQuery(query);

            const [items, numberOfItems] = await Promise.all([
                db
                    .select()
                    .from(tasks)
                    .where(and(...where))
                    .orderBy(orderBy)
                    .limit(limit)
                    .offset(offset),

                db
                    .select({
                        count: count(),
                    })
                    .from(tasks)
                    .where(and(...where)),
            ]);

            const total = Number(numberOfItems[0]?.count ?? 0);
            const totalPages = Math.ceil(total / limit);

            return {
                items,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages,
                },
            };
        },

        getTaskById: async (id: string): Promise<Task> => {
            const [result] = await db
                .select()
                .from(tasks)
                .where(and(eq(tasks.id, id)));
            if (!result) {
                throw new NotFoundError(`Task with id [${id}] not found!`);
            }
            return result;
        },

        getTaskCounts: async () => {
            const now = new Date();
            const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
            const endOfToday = setDate("to", now.toISOString());
            const startOfTomorrow = setDate("from", tomorrow.toISOString());

            const [
                [inboxCountsRow],
                [todayCountsRow],
                [upcomingCountsRow],
                [completedCountsRow],
                [deletedCountsRow],
            ] = await Promise.all([
                db
                    .select({ inbox: count() })
                    .from(tasks)
                    .where(
                        and(
                            inArray(tasks.status, ["todo", "in_progress"]),
                            isNull(tasks.deletedAt),
                        ),
                    ),

                db
                    .select({ today: count() })
                    .from(tasks)
                    .where(
                        and(
                            inArray(tasks.status, ["todo", "in_progress"]),
                            lte(tasks.deadline, endOfToday),
                            isNull(tasks.deletedAt),
                        ),
                    ),

                db
                    .select({ upcoming: count() })
                    .from(tasks)
                    .where(
                        and(
                            inArray(tasks.status, ["todo", "in_progress"]),
                            gte(tasks.deadline, startOfTomorrow),
                            isNull(tasks.deletedAt),
                        ),
                    ),

                db
                    .select({ completed: count() })
                    .from(tasks)
                    .where(
                        and(eq(tasks.status, "done"), isNull(tasks.deletedAt)),
                    ),

                db
                    .select({ deleted: count() })
                    .from(tasks)
                    .where(isNotNull(tasks.deletedAt)),
            ]);

            return {
                inbox: Number(inboxCountsRow?.inbox ?? 0),
                today: Number(todayCountsRow?.today ?? 0),
                upcoming: Number(upcomingCountsRow?.upcoming ?? 0),
                completed: Number(completedCountsRow?.completed ?? 0),
                deleted: Number(deletedCountsRow?.deleted ?? 0),
            };
        },

        updateTask: async (payload: UpdateTaskPayload): Promise<Task> => {
            const { id, ...updates } = payload;
            const [result] = await db
                .update(tasks)
                .set(updates)
                .where(and(eq(tasks.id, id), isNull(tasks.deletedAt)))
                .returning();
            if (!result) {
                throw new NotFoundError(`Task with id [${id}] not found!`);
            }
            return result;
        },

        deleteTask: async (id: string): Promise<Task> => {
            const [result] = await db
                .update(tasks)
                .set({
                    deletedAt: new Date(),
                })
                .where(and(eq(tasks.id, id), isNull(tasks.deletedAt)))
                .returning();
            if (!result) {
                throw new NotFoundError(`Task with id [${id}] not found!`);
            }
            return result;
        },

        restoreTask: async (id: string): Promise<Task> => {
            const [result] = await db
                .update(tasks)
                .set({
                    deletedAt: null,
                })
                .where(and(eq(tasks.id, id), isNotNull(tasks.deletedAt)))
                .returning();
            if (!result) {
                throw new NotFoundError(`Task with id [${id}] not found!`);
            }
            return result;
        },

        // bulk actions
        bulkCompleteTasks: async (ids: string[]): Promise<number> => {
            const result = await db
                .update(tasks)
                .set({
                    status: "done",
                })
                .where(and(inArray(tasks.id, ids), isNull(tasks.deletedAt)))
                .returning({ id: tasks.id });
            return result.length;
        },

        bulkActivateTasks: async (ids: string[]): Promise<number> => {
            const result = await db
                .update(tasks)
                .set({
                    status: "todo",
                })
                .where(and(inArray(tasks.id, ids), isNull(tasks.deletedAt)))
                .returning({ id: tasks.id });
            return result.length;
        },

        bulkDeleteTasks: async (ids: string[]): Promise<number> => {
            const result = await db
                .update(tasks)
                .set({
                    deletedAt: new Date(),
                })
                .where(and(inArray(tasks.id, ids), isNull(tasks.deletedAt)))
                .returning({ id: tasks.id });
            return result.length;
        },

        bulkRestoreTasks: async (ids: string[]): Promise<number> => {
            const result = await db
                .update(tasks)
                .set({
                    deletedAt: null,
                })
                .where(inArray(tasks.id, ids))
                .returning({ id: tasks.id });
            return result.length;
        },
    };
}
