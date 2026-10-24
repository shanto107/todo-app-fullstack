import useEditTaskForm from "../hooks/use-edit-task-form";
import type { Task } from "../types/task.types";
import TaskActionBar from "./task-action-bar";
import TaskDetailsCard from "./task-details-card";
import TaskMetaCard from "./task-meta-card";

type TaskEditFormProps = {
    task: Task;
}

export default function TaskEditForm({
    task
}: TaskEditFormProps) {

    const { form, updateTaskMutation } = useEditTaskForm(task);
    const isDeleted = !!task.deletedAt;

    return (
        <form
            onSubmit={
                (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    form.handleSubmit();
                }
            }
        >
            <div className="container py-6">
                <div className="grid gap-6 md:grid-cols-4">
                    <div className="md:col-span-3">
                        <TaskDetailsCard
                            form={form}
                            task={task}
                        />
                    </div>
                    <div>
                        <TaskMetaCard
                            form={form}
                            task={task}
                        />
                    </div>
                </div>
                {
                    !isDeleted &&
                    <TaskActionBar
                        form={form}
                        updateTaskMutation={updateTaskMutation}
                    />
                }
            </div>
        </form>
    );
}