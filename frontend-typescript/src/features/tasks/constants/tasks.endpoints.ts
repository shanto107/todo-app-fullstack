import type { BulkTasksAction } from "../types/task.types";

export const ENDPOINTS = {
    api: {
        tasks: {
            root: "/api/tasks",
            counts: "/api/tasks/counts",
            bulk: (action: BulkTasksAction) => `/api/tasks/bulk/${action}`,
            byId: (id: string) => `/api/tasks/${id}`,
            restore: (id: string) => `/api/tasks/${id}/restore`
        }
    }
} as const;