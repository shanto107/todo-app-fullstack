import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { restoreTask } from "../api/tasks.api";
import { taskQueryKeys } from "../constants/tasks.key-factory";

export default function useRestoreTask() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: restoreTask,
        onSuccess: async (restoredTask) => {
            toast.success("Task Deleted", {
                description: `Task with Id:${restoredTask.id} restored successfully.`,
            });
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: taskQueryKeys.lists(),
                }),
                queryClient.invalidateQueries({
                    queryKey: taskQueryKeys.detail(restoredTask.id),
                }),
                queryClient.invalidateQueries({
                    queryKey: taskQueryKeys.counts(),
                }),
            ]);
        },
    });
}
