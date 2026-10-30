import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getTaskById } from "../api/tasks.api";
import { taskQueryKeys } from "../constants/tasks.key-factory";
import type { Task } from "../types/task.types";

export function useTask(taskId: string) {
    const queryClient = useQueryClient();

    function placeholderDataFn() {
        const tasks = queryClient.getQueryData<Task[]>(taskQueryKeys.lists());
        return tasks?.find((task) => task.id === taskId);
    }

    const queryInfo = useQuery({
        queryKey: taskQueryKeys.detail(taskId),
        queryFn: () => getTaskById(taskId),
        enabled: Boolean(taskId),
        staleTime: 0,
        placeholderData: placeholderDataFn,
    });
    return queryInfo;
}
