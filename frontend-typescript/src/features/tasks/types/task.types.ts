import type { LucideIcon } from "lucide-react";
import type z from "zod";

import type { taskCountsSchema } from "../schemas/get-task-counts";

export type Task = {
    id: string;
    title: string;
    description?: string;
    priority?: TaskPriority;
    deadline?: Date;
    status: TaskStatus;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
};

export type CreateTask = {
    title: string;
    description?: string;
    priority?: TaskPriority;
    deadline?: Date;
};

export type UpdateTask = {
    id: string;
    title?: string;
    description?: string;
    priority?: TaskPriority;
    deadline?: Date;
    status?: TaskStatus;
};

export type TaskCounts = z.infer<typeof taskCountsSchema>;
export type TaskCountKeys = keyof TaskCounts;

export type AppSidebarItem = {
    title: string;
    url: string;
    count?: TaskCountKeys;
    icon: LucideIcon;
    active: string;
    hover: string;
};

export type TaskPriority = "low" | "medium" | "high" | "urgent";

export type TaskStatus = "todo" | "in_progress" | "done" | "cancelled";

export type BulkTasksAction = "complete" | "activate" | "delete" | "restore";

export type TaskTableView = "inbox" | "completed" | "deleted";

export type TaskPagesKey = "inbox" | "today" | "upcoming" | "completed" | "deleted";

export type TaskSortBy = "createdAt" | "updatedAt" | "deletedAt" | "deadline";

export type SortDirection = "asc" | "dsc";

export type TaskPageKey = "inbox" | "today" | "upcoming" | "deleted" | "completed";
