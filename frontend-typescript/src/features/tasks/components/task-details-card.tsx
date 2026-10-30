import type useEditTaskForm from "../hooks/use-edit-task-form";
import type { Task } from "../types/task.types";
import DeleteTaskDialog from "./delete-task-dialog";
import RestoreTaskButton from "./restore-task-button";

type TaskDetailsCardProps = {
    form: ReturnType<typeof useEditTaskForm>["form"];
    task: Task;
};

export default function TaskDetailsCard({ form, task }: TaskDetailsCardProps) {
    const isDeleted = !!task.deletedAt;
    return (
        <div className="space-y-2 rounded-sm md:space-y-4 md:bg-transparent">
            <div className="flex items-center justify-between gap-1">
                <form.AppField name="title">
                    {(field) => (
                        <field.Input
                            variant="default"
                            placeholder="Check office email."
                            disabled={isDeleted}
                            className="h-auto rounded-sm border-none text-xl font-medium tracking-tight md:text-xl dark:bg-transparent"
                        />
                    )}
                </form.AppField>
                {isDeleted ? (
                    <RestoreTaskButton taskId={task.id} />
                ) : (
                    <DeleteTaskDialog taskId={task.id} />
                )}
            </div>

            <section className="p-2">
                <h3 className="text-muted-foreground mb-2 text-sm font-medium tracking-wide">
                    Description
                </h3>
                <form.AppField name="description">
                    {(field) => <field.TextEditor variant="bare" disabled={isDeleted} />}
                </form.AppField>
            </section>
        </div>
    );
}
