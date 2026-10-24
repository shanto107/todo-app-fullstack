import type { TaskQuery } from "../types/task-query.types";

export function parseSearchParams(queryParams: URLSearchParams) {
    const query: TaskQuery = {};

    const search = queryParams.get("search")?.trim();
    if (search) {
        query.search = search;
    }

    const status = queryParams.get("status");
    if (status) {
        const values = status.split(",").filter(Boolean);
        if (values.length > 0) {
            query.status = values as NonNullable<TaskQuery["status"]>;
        }
    }

    const priority = queryParams.get("priority");
    if (priority) {
        query.priority = priority as TaskQuery["priority"];
    }

    const deadlineFrom = queryParams.get("deadlineFrom");
    if (deadlineFrom) {
        query.deadlineFrom = deadlineFrom;
    }

    const deadlineTo = queryParams.get("deadlineTo");
    if (deadlineTo) {
        query.deadlineTo = deadlineTo;
    }

    const page = Number(queryParams.get("page"));
    if(Number.isInteger(page) && page > 0) {
        query.page = page
    }

    const sortBy = queryParams.get("sortBy");
    if(sortBy) {
        query.sortBy = sortBy as TaskQuery["sortBy"];
    }

    const sortDirection = queryParams.get("sortDirection");
    if(sortDirection) {
        query.sortDirection = sortDirection as TaskQuery["sortDirection"]
    }

    return query;
}

function setSearchParam(params: URLSearchParams, key: keyof TaskQuery, value: string | undefined) {
    return value ? params.set(key, value) : params.delete(key);
}

export function updateSearchParams(queryParams: URLSearchParams, query: TaskQuery) {
    const params = new URLSearchParams(queryParams);

    setSearchParam(params, "search", query.search);
    setSearchParam(params, "status", query.status?.join(","));
    setSearchParam(params, "priority", query.priority);
    setSearchParam(params, "deadlineFrom", query.deadlineFrom);
    setSearchParam(params, "deadlineTo", query.deadlineTo);
    setSearchParam(params, "page", query.page ? String(query.page) : undefined);
    setSearchParam(params, "sortBy", query.sortBy);
    setSearchParam(params, "sortDirection", query.sortDirection);

    return params;
}