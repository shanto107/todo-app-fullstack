import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../api/tasks.api";
import { taskQueryKeys } from "../constants/tasks.key-factory";

export function useUpdateTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateTask,
        onSuccess: (updatedTask) => {
            queryClient.invalidateQueries({
                queryKey: taskQueryKeys.detail(updatedTask.id)
            });
            queryClient.invalidateQueries({
                queryKey: taskQueryKeys.lists(),
            });
            queryClient.invalidateQueries({
                queryKey: taskQueryKeys.counts()
            });
        }
    });
}