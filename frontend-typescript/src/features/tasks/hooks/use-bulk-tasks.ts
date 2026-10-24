import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { BulkTasksAction } from "../types/task.types";
import { bulkTasks } from "../api/tasks.api";
import { taskQueryKeys } from "../constants/tasks.key-factory";
import { toast } from "sonner";

type BulkTaskMutation = {
    action: BulkTasksAction;
    ids: string[];
};

export function useBulkTasks() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({action, ids}: BulkTaskMutation) => bulkTasks(action, ids),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
                queryKey: taskQueryKeys.lists()
            });
            queryClient.invalidateQueries({
                queryKey: taskQueryKeys.counts()
            });
            toast.success("TASKS UPDATED", {
                description: `${data.count} ${data.count > 1? "tasks" : "task"} ${variables.action}d successfully!`
            })
        }
    })
}