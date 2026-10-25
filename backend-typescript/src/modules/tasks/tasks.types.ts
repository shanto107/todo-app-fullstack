import z from "zod";

import { tasks } from "../../db/schema/tasks.js";
import type { TypedRequest } from "../../shared/http.types.js";
import {
    bulkTaskActionSchema,
    createTaskSchema,
    getTaskSchema,
    idInParamsSchema,
    updateTaskSchema,
} from "./tasks.validation.js";

export type AtleastOne<T> = {
    [key in keyof T]-?: Required<Pick<T, key>> & Partial<Omit<T, key>>;
}[keyof T];

export type BulkTaskAction = "complete" | "activate" | "delete" | "restore";

// inference from drizzle (DB)
export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;

// inference from zod
export type AddTaskBody = z.infer<typeof createTaskSchema>;
export type UpdateTaskBody = AtleastOne<z.infer<typeof updateTaskSchema>>;
export type UpdateTaskPayload = Pick<Task, "id"> & UpdateTaskBody;
export type IdInParams = z.infer<typeof idInParamsSchema>;
export type TaskQuery = z.infer<typeof getTaskSchema>;
export type TaskFilters = Omit<TaskQuery, "sortBy" | "sortDirection">;
export type TaskFilterKeys = keyof TaskFilters;
export type BulkTaskActionBody = z.infer<typeof bulkTaskActionSchema>;

// HTTP request types for controllers
export type AddTaskRequest = TypedRequest<Record<string, never>, AddTaskBody>;
export type GetTasksRequest = TypedRequest<
    Record<string, never>,
    unknown,
    TaskFilters
>;
export type GetTaskRequest = TypedRequest<IdInParams>;
export type UpdateTaskRequest = TypedRequest<IdInParams, UpdateTaskBody>;
export type DeleteTaskRequest = TypedRequest<IdInParams>;
export type RestoreTaskRequest = TypedRequest<IdInParams>;
export type BulkTaskActionRequest = TypedRequest<
    Record<string, never>,
    BulkTaskActionBody
>;

export type PaginatedTasks = {
    items: Task[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};

export type TaskCounts = {
    inbox: number;
    today: number;
    upcoming: number;
    completed: number;
    deleted: number;
};
