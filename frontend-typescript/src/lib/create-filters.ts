import { addDays, format } from "date-fns";

import type { TaskQuery } from "@/features/tasks/types/task-query.types";

export function createTodayFilters(): TaskQuery {
    const today = format(new Date(), "yyyy-MM-dd");

    return {
        status: ["todo", "in_progress"],
        deadlineTo: today,
        sortBy: "deadline",
        sortDirection: "asc",
    };
}

export function createUpcomingFilters(): TaskQuery {
    return {
        status: ["todo", "in_progress"],
        deadlineFrom: format(addDays(new Date(), 1), "yyyy-MM-dd"),
        sortBy: "deadline",
        sortDirection: "asc",
    };
}
