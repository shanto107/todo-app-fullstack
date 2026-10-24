import type { TaskQuery } from "../types/task-query.types";

export const taskQueryKeys = {
    all: ["tasks"] as const,
    lists: () => [...taskQueryKeys.all, "list"] as const,
    counts: () => [...taskQueryKeys.all, "counts"] as const,
    list: (query?: TaskQuery) => [...taskQueryKeys.lists(), query] as const,
    detail: (id: string) => [...taskQueryKeys.all, "detail", id] as const
}