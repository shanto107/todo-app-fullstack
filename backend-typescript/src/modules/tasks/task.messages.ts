import { BulkTaskAction } from "./tasks.types.js";

export const successMessage = {
    addTask: (id: string) => `New task with id [${id}] CREATED successfully.`,
    getTasks: () => "All tasks fetched successfully.",
    getTaskById: (id: string) => `Task with id [${id}] fetched successfully.`,
    getTaskCounts: () => "Number of tasks in each task-page fetched successfully.",
    updateTask: (id: string) => `Task with id [${id}] UPDATED successfully!`,
    deleteTask: (id: string) => `Task with id [${id}] DELETED successfully!`,
    restoreTask: (id: string) => `Task with id [${id}] RESTORED successfully!`,
    bulkTask: (action: BulkTaskAction, count: number) => `${count} task(s) ${action}d successfully.`,
}

export const SUCCESS_CODES = {
    TASK_CREATED: "TASK_CREATED",
    TASKS_FETCHED: "TASKS_FETCHED",
    TASK_FETCHED: "TASK_FETCHED",
    TASK_COUNTS_FETCHED: "TASK_COUNTS_FETCHED",
    TASK_UPDATED: "TASK_UPDATED",
    TASK_DELETED: "TASK_DELETED",
    TASK_RESTORED: "TASK_RESTORED",
    TASKS_UPDATED: "TASKS_UPDATED",
} as const;

export type SuccessCode = typeof SUCCESS_CODES[keyof typeof SUCCESS_CODES];
