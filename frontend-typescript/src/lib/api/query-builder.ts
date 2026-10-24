import type { TaskQuery } from "@/features/tasks/types/task-query.types";

export default function queryBuilder(filters: TaskQuery) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
        if (value === undefined) continue;
        if (Array.isArray(value)) {
            if (value.length > 0) {

                params.set(key, value.join(","));
            }
        }
        else {
            params.set(key, String(value));
        }
    }
    return params.toString();
}