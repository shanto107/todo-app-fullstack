import type { BulkTasksAction } from "@/features/tasks/types/task.types";

const taskRootEndpoint = "/api/tasks";
const settingsRootpoint = "/api/settings";

export const ENDPOINTS = {
    api: {
        tasks: {
            root: taskRootEndpoint,
            counts: `${taskRootEndpoint}/counts`,
            bulk: (action: BulkTasksAction) =>
                `${taskRootEndpoint}/bulk/${action}`,
            byId: (id: string) => `${taskRootEndpoint}/${id}`,
            restore: (id: string) => `${taskRootEndpoint}/${id}/restore`,
        },

        settings: {
            profile: {
                me: `${settingsRootpoint}/profile/me`,
                designations: `${settingsRootpoint}/profile/designations`,
            },
        },
    },
} as const;
