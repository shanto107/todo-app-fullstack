import { useAppForm } from "@/components/common/form/hooks";
import type { Task } from "../types/task.types"
import { updateTaskFormSchema, type UpdateTaskForm, type UpdateTaskRequest } from "../schemas/update-task-schema";
import { useUpdateTask } from "./use-update-task";
import { EDITABLE_FIELDS } from "../constants/tasks.form";
import { toast } from "sonner";
import { getUpdateToastMessage } from "@/lib/update-toast-messge";
import { ApiError } from "@/lib/api/api-error";

export default function useEditTaskForm(task: Task) {
    const updateTaskMutation = useUpdateTask();

    const defaultValues: UpdateTaskForm = {
        id: task.id,
        title: task.title,
        description: task.description ?? "",
        deadline: task.deadline ? new Date(task.deadline) : undefined,
        priority: task.priority,
        status: task.status
    }
    const form = useAppForm({
        defaultValues,
        validators: {
            onSubmit: updateTaskFormSchema,
        },
        onSubmit: async ({ value, formApi }) => {
            const dirtyFields = EDITABLE_FIELDS.filter((field) => formApi.getFieldMeta(field)?.isDirty);
            const payload: UpdateTaskRequest = {
                id: value.id,
                ...Object.fromEntries(dirtyFields.map(field => [field, value[field]]))
            };
            try {
                const {
                    id,
                    title,
                    description,
                    deadline,
                    priority,
                    status
                } = await updateTaskMutation.mutateAsync(payload);
                formApi.reset({
                    id,
                    title,
                    description: description ?? "",
                    deadline: deadline ? new Date(deadline) : undefined,
                    priority,
                    status
                });
                toast.success("Task updated", {
                    description: getUpdateToastMessage(dirtyFields),
                });
            }
            catch (error) {
                console.log(error);
                console.log(error instanceof ApiError);

                if (error instanceof ApiError) {
                    console.log(error.message);
                    console.log(error.errors);
                    console.log(error.code);
                }
            }

        }
    })

    return {
        form,
        updateTaskMutation
    }
}


