import { SortAsc, SortDesc, type LucideIcon } from "lucide-react";
import type { SortDirection, TaskPageKey, TaskSortBy } from "../types/task.types";

type SortLabel = "Created At" | "Deleted At" | "Completed At" | "Deadline";

export type TaskSortOption = {
    sortBy: TaskSortBy;
    sortDirection: SortDirection;
    label: SortLabel;
    symbol: LucideIcon
}

type Direction = {
    value: SortDirection;
    symbol: LucideIcon
}

export const DIRECTIONS: Direction[] = [
    {
        value: "asc",
        symbol: SortAsc
    },
    {
        value: "dsc",
        symbol: SortDesc
    }
]

function createSortOptions(sortBy: TaskSortBy, label: SortLabel): TaskSortOption[] {
    return DIRECTIONS.map(direction => ({
        sortBy,
        sortDirection: direction.value,
        label,
        symbol: direction.symbol
    }))
}

export const TASK_SORT_OPTIONS: Record<TaskPageKey, TaskSortOption[]> = {
    inbox: [
        ...createSortOptions("deadline", "Deadline"),
        ...createSortOptions("createdAt", "Created At")
    ],
    today: [
        ...createSortOptions("deadline", "Deadline"),
        ...createSortOptions("createdAt", "Created At")
    ],
    upcoming: [
        ...createSortOptions("deadline", "Deadline"),
        ...createSortOptions("createdAt", "Created At")
    ],
    completed: [
        ...createSortOptions("deadline", "Deadline"),
        ...createSortOptions("updatedAt", "Completed At")
    ],
    deleted: [
        ...createSortOptions("deadline", "Deadline"),
        ...createSortOptions("deletedAt", "Deleted At")
    ],
}