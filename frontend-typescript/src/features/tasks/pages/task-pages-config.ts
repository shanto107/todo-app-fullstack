import { createTodayFilters, createUpcomingFilters } from "@/lib/create-filters";
import type { TaskPagesKey } from "../types/task.types";
import type { TaskListPageProps } from "./task-list-page";

export const TASK_PAGE_TITLES = {
    inbox: "Inbox",
    today: "Today",
    upcoming: "Upcoming Tasks",
    completed: "Completed Tasks",
    deleted: "Deleted Tasks",
} as const;

export const taskPagesConfig: Record<TaskPagesKey, TaskListPageProps> = {
    inbox: {
        pageKey: "inbox",
        pageTitle: TASK_PAGE_TITLES.inbox,
        tableView: "inbox",
        query: {
            status: ["todo", "in_progress"],
            sortBy: "createdAt",
            sortDirection: "dsc"
        }
    },
    today: {
        pageKey: "today",
        pageTitle: TASK_PAGE_TITLES.today,
        tableView: "inbox",
        query: createTodayFilters(),
    },
    upcoming: {
        pageKey: "upcoming",
        pageTitle: TASK_PAGE_TITLES.upcoming,
        tableView: "inbox",
        query: createUpcomingFilters()
    },
    completed: {
        pageKey: "completed",
        pageTitle: TASK_PAGE_TITLES.completed,
        tableView: "completed",
        query: {
            status: ["done"],
            sortBy: "updatedAt",
            sortDirection: "dsc"
        },
    },
    deleted: {
        pageKey: "deleted",
        pageTitle: TASK_PAGE_TITLES.deleted,
        tableView: "deleted",
        query: {
            deleted: true,
            sortBy: "deletedAt",
            sortDirection: "dsc"
        }
    }
}

export const taskPages = Object.entries(taskPagesConfig) as Array<[TaskPagesKey, TaskListPageProps]>;
