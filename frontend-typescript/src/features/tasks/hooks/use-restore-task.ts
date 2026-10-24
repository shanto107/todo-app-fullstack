import { useMutation, useQueryClient } from "@tanstack/react-query";
import { restoreTask } from "../api/tasks.api";
import { taskQueryKeys } from "../constants/tasks.key-factory";
import { toast } from "sonner";

export default function useRestoreTask() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: restoreTask,
        onSuccess: (restoredTask) => {
            queryClient.invalidateQueries({
                queryKey: taskQueryKeys.lists()
            });
            queryClient.invalidateQueries({
                queryKey: taskQueryKeys.detail(restoredTask.id)
            });
            queryClient.invalidateQueries({
                queryKey: taskQueryKeys.counts()
            });
            toast.success("Task Deleted", {
                description: `Task with Id:${restoredTask.id} restored successfully.`
            })
        }
    })
}