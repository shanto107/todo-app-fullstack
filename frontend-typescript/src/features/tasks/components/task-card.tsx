import { Card, CardContent } from "@/components/ui/card";
import { DeadlineBadge } from "@/components/common/form/fields/form-date-picker";
import { Badge } from "@/components/ui/badge";
import { STATUS_OPTIONS } from "../constants/tasks.status";
import { PRIORITY_OPTIONS } from "../constants/tasks.priorities";
import type { Task } from "../types/task.types";

type TaskCardType = {
    task: Task
}

export default function TaskCard({
    task
}: TaskCardType) {

    const taskStatus = STATUS_OPTIONS.find(status => status.value === task.status);
    const taskPriority = PRIORITY_OPTIONS.find(priority => priority.value === task.priority);

    return (
        <Card className="rounded-sm max-w-md shadow-sm dark:border-1 dark:border-accent/20 md:max-w-xl">
            <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                    <div className="text-sm tracking-wider font-medium truncate min-w-0">
                        {
                            task.title
                        }
                    </div>
                    <div className="text-xs text-muted-foreground font-light tracking-tight shrink-0 ml-6">
                        {
                            task.id
                        }
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <Badge
                        className="p-0"
                        variant={"ghost"}
                    >
                        <DeadlineBadge
                            date={task.deadline}
                            defaultLabel="No Deadline"
                            iconClassName="size-4 mr-2"
                            labelClassName="text-sm tracking-wide"
                        />
                    </Badge>
                    {
                        taskPriority && (
                            <Badge
                                className={`rounded-sm p-3 ${taskPriority.color}`}
                                variant={"ghost"}
                            >
                                <taskPriority.icon className="size-3.5 mr-1" />
                                <span>{taskPriority.label}</span>
                            </Badge>
                        )
                    }
                    {
                        taskStatus && (
                            <Badge
                                className={`rounded-sm bg-accent/10 p-3 ${taskStatus.color}`}
                                variant={"ghost"}
                            >
                                <taskStatus.icon className="size-3.5 mr-1" />
                                <span>{taskStatus.label}</span>
                            </Badge>
                        )
                    }
                </div>
            </CardContent>
        </Card>
    )
}