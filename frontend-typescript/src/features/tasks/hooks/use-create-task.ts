import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTask } from "../api/tasks.api";
import { taskQueryKeys } from "../constants/tasks.key-factory";

export function useCreateTask() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createTask,
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: taskQueryKeys.lists(),
                }),
                queryClient.invalidateQueries({
                    queryKey: taskQueryKeys.counts(),
                }),
            ]);
        },
    });
}
