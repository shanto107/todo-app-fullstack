import type {
    SortDirection,
    TaskSortBy,
    TaskPriority,
    TaskStatus,
    Task
} from "./task.types"

export type TaskQuery = {
    search?: string;
    status?: TaskStatus[];
    priority?: TaskPriority;
    deleted?: boolean;
    deadlineFrom?: string;
    deadlineTo?: string;
    sortBy?: TaskSortBy;
    sortDirection?: SortDirection;
    page?: number;
    limit?: number;
}

export type TaskSearchSuggestion = {
    id: string;
    title: string;
};

export type TaskPagination = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export type PaginatedTasks = {
    items: Task[];
    pagination: TaskPagination;
}

export type TaskFilterValues = {
    status?: TaskStatus[];
    priority?: TaskPriority;
    deadlineFrom?: string;
    deadlineTo?: string;
};