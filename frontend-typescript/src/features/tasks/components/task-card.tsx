import { DeadlineBadge } from "@/components/common/form/fields/form-date-picker";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { PRIORITY_OPTIONS } from "../constants/tasks.priorities";
import { STATUS_OPTIONS } from "../constants/tasks.status";
import type { Task } from "../types/task.types";

type TaskCardType = {
    task: Task;
};

export default function TaskCard({ task }: TaskCardType) {
    const taskStatus = STATUS_OPTIONS.find((status) => status.value === task.status);
    const taskPriority = PRIORITY_OPTIONS.find((priority) => priority.value === task.priority);

    return (
        <Card className="dark:border-accent/20 max-w-md rounded-sm shadow-sm md:max-w-xl dark:border-1">
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="min-w-0 truncate text-sm font-medium tracking-wider">
                        {task.title}
                    </div>
                    <div className="text-muted-foreground ml-6 shrink-0 text-xs font-light tracking-tight">
                        {task.id}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <Badge className="p-0" variant={"ghost"}>
                        <DeadlineBadge
                            date={task.deadline}
                            defaultLabel="No Deadline"
                            iconClassName="size-4 mr-2"
                            labelClassName="text-sm tracking-wide"
                        />
                    </Badge>
                    {taskPriority && (
                        <Badge className={`rounded-sm p-3 ${taskPriority.color}`} variant={"ghost"}>
                            <taskPriority.icon className="mr-1 size-3.5" />
                            <span>{taskPriority.label}</span>
                        </Badge>
                    )}
                    {taskStatus && (
                        <Badge
                            className={`bg-accent/10 rounded-sm p-3 ${taskStatus.color}`}
                            variant={"ghost"}
                        >
                            <taskStatus.icon className="mr-1 size-3.5" />
                            <span>{taskStatus.label}</span>
                        </Badge>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
