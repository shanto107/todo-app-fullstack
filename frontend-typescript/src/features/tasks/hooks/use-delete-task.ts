import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { deleteTask } from "../api/tasks.api";
import { taskQueryKeys } from "../constants/tasks.key-factory";
import { toast } from "sonner";

export default function useDeleteTask() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTask,
        onSuccess: (deletedTask) => {
            queryClient.removeQueries({
                queryKey: taskQueryKeys.detail(deletedTask.id),
                exact: true
            });
            queryClient.invalidateQueries({
                queryKey: taskQueryKeys.lists()
            });
            queryClient.invalidateQueries({
                queryKey: taskQueryKeys.counts()
            });
            navigate("/tasks/inbox");
            toast.warning("Task Deleted", {
                description: `Task with Id:${deletedTask.id} deleted.`
            })
        }
    })
}