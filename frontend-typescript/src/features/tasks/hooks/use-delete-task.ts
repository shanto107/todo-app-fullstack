import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { deleteTask } from "../api/tasks.api";
import { taskQueryKeys } from "../constants/tasks.key-factory";

export default function useDeleteTask() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTask,
        onSuccess: async (deletedTask) => {
            queryClient.removeQueries({
                queryKey: taskQueryKeys.detail(deletedTask.id),
                exact: true,
            });
            void navigate("/tasks/inbox");
            toast.warning("Task Deleted", {
                description: `Task with Id:${deletedTask.id} deleted.`,
            });
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
