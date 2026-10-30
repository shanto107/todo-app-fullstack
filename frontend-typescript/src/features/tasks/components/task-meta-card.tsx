import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { PRIORITY_OPTIONS } from "../constants/tasks.priorities";
import { STATUS_OPTIONS } from "../constants/tasks.status";
import type useEditTaskForm from "../hooks/use-edit-task-form";
import type { Task } from "../types/task.types";

type MetaRowProps = {
    label: string;
    value: React.ReactNode;
};

function MetaRow({ label, value }: MetaRowProps) {
    return (
        <div className="grid h-12 grid-cols-2 items-center">
            <p className="text-muted-foreground text-sm font-medium">{label}</p>

            <div>{value}</div>
        </div>
    );
}

type TaskMetaCardProps = {
    task: Task;
    form: ReturnType<typeof useEditTaskForm>["form"];
};

export default function TaskMetaCard({ task, form }: TaskMetaCardProps) {
    const isDeleted = !!task.deletedAt;
    return (
        <Card className="rounded-sm">
            <CardHeader>
                <CardTitle className="text-[1rem] tracking-wider">Details</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
                <MetaRow
                    label="Task ID"
                    value={
                        <span className="text-sm font-medium tracking-wider">
                            {form.state.values.id.slice(0, 8).toUpperCase()}
                        </span>
                    }
                />
                <MetaRow
                    label="Status"
                    value={
                        <form.AppField name="status">
                            {(field) => (
                                <field.PopoverPicker
                                    options={STATUS_OPTIONS}
                                    placeholder="Status"
                                    disabled={isDeleted}
                                />
                            )}
                        </form.AppField>
                    }
                />
                <MetaRow
                    label="Priority"
                    value={
                        <form.AppField name="priority">
                            {(field) => (
                                <field.PopoverPicker
                                    options={PRIORITY_OPTIONS}
                                    placeholder="Priority"
                                    disabled={isDeleted}
                                />
                            )}
                        </form.AppField>
                    }
                />
                <MetaRow
                    label="Deadline"
                    value={
                        <form.AppField name="deadline">
                            {(field) => <field.DatePicker disabled={isDeleted} />}
                        </form.AppField>
                    }
                />
            </CardContent>
        </Card>
    );
}
