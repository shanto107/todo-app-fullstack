import { useQuery } from "@tanstack/react-query";

import { getTaskCounts } from "../api/tasks.api";
import { taskQueryKeys } from "../constants/tasks.key-factory";

export function useTaskCounts() {
    return useQuery({
        queryKey: taskQueryKeys.counts(),
        queryFn: getTaskCounts,
    });
}
