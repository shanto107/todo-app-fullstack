import { useQuery } from "@tanstack/react-query";
import { taskQueryKeys } from "../constants/tasks.key-factory";
import { getTaskCounts } from "../api/tasks.api";

export function useTaskCounts() {
    return useQuery({
        queryKey: taskQueryKeys.counts(),
        queryFn: getTaskCounts
    });
}