import { useAppForm } from "@/components/common/form/hooks";
import { addTaskSchema, type AddTaskForm } from "../schemas/add-task-schema";
import { PRIORITY_OPTIONS } from "../constants/tasks.priorities";
import { Button } from "@/components/ui/button";
import { useCreateTask } from "../hooks/use-create-task";
import { toast } from "sonner";

type AddTaskFormProps = {
    onSuccess?: () => void;
}

export default function AddTaskForm({ onSuccess }: AddTaskFormProps) {

    const createTaskMutation = useCreateTask();

    const defaultValues: AddTaskForm = {
        title: "",
        description: "",
        deadline: undefined,
        priority: undefined,
    }

    const form = useAppForm({
        defaultValues,
        validators: {
            onSubmit: addTaskSchema
        },
        onSubmit: async ({ value, formApi }) => {
            try {
                const createdTask = await createTaskMutation.mutateAsync(value);
                formApi.reset();
                toast.success("Task created", {
                    description: `Task with id:${createdTask.id} created successfully!`
                });
                onSuccess?.();
            }
            catch (error) {
                console.log(error);
            }
        }
        // error handling
    });

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                form.handleSubmit();
            }}
        >
            <div className="flex flex-col gap-2 px-4 pt-4 pb-4">

                <form.AppField name="title">
                    {
                        (field) => (
                            <field.Input
                                variant="default"
                                placeholder="Check office email."
                                autoFocus
                                className="h-10 rounded-sm text-sm md:text-sm font-medium border-none tracking-wider dark:bg-transparent"
                            />
                        )
                    }
                </form.AppField>
                <form.AppField name="description">
                    {
                        (field) => (
                            <field.TextEditor
                                variant="bare"
                            />
                        )
                    }
                </form.AppField>

                <div className="flex flex-wrap items-center gap-4 mt-2 mb-6 md:mb-2">
                    <form.AppField name="deadline">
                        {
                            (field) => <field.DatePicker />
                        }
                    </form.AppField>

                    <form.AppField name="priority">
                        {
                            (field) => (
                                <field.PopoverPicker
                                    options={PRIORITY_OPTIONS}
                                    placeholder="Priority"
                                />
                            )
                        }
                    </form.AppField>
                </div>

                {/* Button section */}

                <div className="flex justify-between md:justify-end items-center gap-4">
                    <Button
                        type="button"
                        variant={"outline"}
                        size={"sm"}
                        className={"h-8 rounded-sm text-sm tracking-wide"}
                        onClick={() => form.reset()}
                    >
                        Reset
                    </Button>
                    <form.AppForm>
                        <form.SubmitButton
                            label="Add Task"
                        />
                    </form.AppForm>
                </div>

            </div>
        </form>
    )
}
