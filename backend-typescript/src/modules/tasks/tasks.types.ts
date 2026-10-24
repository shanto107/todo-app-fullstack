import z from "zod";
import { tasks } from "../../db/schema/tasks.js";
import {
    bulkTaskActionSchema,
    createTaskSchema,
    getTaskSchema,
    idInParamsSchema,
    updateTaskSchema,
} from "./tasks.validation.js";
import { TypedRequest } from "../../shared/http.types.js";

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

// http request types for controllers
export type AddTaskRequest = TypedRequest<{}, AddTaskBody, {}>;
export type GetTasksRequest = TypedRequest<{}, {}, TaskFilters>;
export type GetTaskRequest = TypedRequest<IdInParams>;
export type UpdateTaskRequest = TypedRequest<IdInParams, UpdateTaskBody, {}>;
export type DeleteTaskRequst = TypedRequest<IdInParams>;
export type RestoreTaskRequst = TypedRequest<IdInParams>;
export type BulkTaskActionRequst = TypedRequest<{}, BulkTaskActionBody, {}>;

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
