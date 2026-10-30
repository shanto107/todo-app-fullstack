import { apiFetch } from "@/lib/api/client";
import queryBuilder from "@/lib/api/query-builder";

import { ENDPOINTS } from "../constants/tasks.endpoints";
import { taskCountsSchema } from "../schemas/get-task-counts";
import {
    type BulkTasksAction,
    type CreateTask,
    type Task,
    type TaskCounts,
    type UpdateTask,
} from "../types/task.types";
import type { PaginatedTasks, TaskQuery } from "../types/task-query.types";

export function getTasks(filters?: TaskQuery) {
    const query = filters ? queryBuilder(filters) : "";
    const endpoint = query ? `${ENDPOINTS.api.tasks.root}?${query}` : ENDPOINTS.api.tasks.root;
    return apiFetch<PaginatedTasks>(endpoint);
}

export function getTaskById(id: string) {
    return apiFetch<Task>(ENDPOINTS.api.tasks.byId(id));
}

export function getTaskCounts() {
    return apiFetch<TaskCounts>(ENDPOINTS.api.tasks.counts, undefined, taskCountsSchema);
}

export function createTask(payload: CreateTask) {
    const createOptions: RequestInit = {
        method: "POST",
        body: JSON.stringify(payload),
    };
    const endpoint = ENDPOINTS.api.tasks.root;
    return apiFetch<Task>(endpoint, createOptions);
}

export function updateTask(data: UpdateTask) {
    const { id, ...payload } = data;
    const updateOptions: RequestInit = {
        method: "PUT",
        body: JSON.stringify(payload),
    };
    const endpoint = ENDPOINTS.api.tasks.byId(id);
    return apiFetch<Task>(endpoint, updateOptions);
}

export function deleteTask(id: string) {
    const deleteOptions: RequestInit = {
        method: "DELETE",
    };
    const endpoint = ENDPOINTS.api.tasks.byId(id);
    return apiFetch<Task>(endpoint, deleteOptions);
}

export function restoreTask(id: string) {
    const restoreOptions: RequestInit = {
        method: "PATCH",
    };
    const endpoint = ENDPOINTS.api.tasks.restore(id);
    return apiFetch<Task>(endpoint, restoreOptions);
}

export function bulkTasks(action: BulkTasksAction, ids: string[]) {
    const endpoint = ENDPOINTS.api.tasks.bulk(action);
    const bulkTaskActionOption: RequestInit = {
        method: "PATCH",
        body: JSON.stringify({ ids }),
    };
    return apiFetch<{ count: number }>(endpoint, bulkTaskActionOption);
}
