import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { taskQueryKeys } from "../constants/tasks.key-factory";
import { getTasks } from "../api/tasks.api";
import type { TaskQuery } from "../types/task-query.types";

export function useTasks(query?: TaskQuery) {
    const queryInfo = useQuery({
        queryKey: taskQueryKeys.list(query),
        queryFn: () => getTasks(query),
        placeholderData: keepPreviousData
    });
    return queryInfo;
}