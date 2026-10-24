import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useBulkTasks } from "../../hooks/use-bulk-tasks";
import type { BulkTasksAction, Task, TaskTableView } from "../../types/task.types";
import { Button } from "@/components/ui/button";
import { CircleCheckBig, Link2, MoreHorizontal, Recycle, RotateCcw, Trash } from "lucide-react";
import { Link } from "react-router";

type RowActionsProps = {
    task: Task;
    view: TaskTableView;
};

export default function RowActions({
    task,
    view
}: RowActionsProps) {

    const mutation = useBulkTasks();

    async function handleAction(action: BulkTasksAction) {
        await mutation.mutateAsync({
            action,
            ids: [task.id]
        });
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button
                        variant="ghost"
                        size="icon"
                        disabled={mutation.isPending}
                    >
                        <MoreHorizontal className="size-4" />
                    </Button>
                }
            />
            <DropdownMenuContent
                align="end"
                className={"w-36 rounded-sm"}
            >
                {
                    view === "inbox" && (
                        <div>
                            <DropdownMenuItem
                                render={
                                    <Link to={`/tasks/${task.id}`}>
                                        <Link2 />
                                        <span>Open</span>
                                    </Link>
                                }
                            />
                            <DropdownMenuItem
                                className={"text-green-600 dark:text-green-300"}
                                onClick={() => handleAction("complete")}
                            >
                                <CircleCheckBig />
                                <span>Mark as Complete</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className={"text-destructive"}
                                onClick={() => handleAction("delete")}
                            >
                                <Trash />
                                <span>Delete</span>
                            </DropdownMenuItem>
                        </div>
                    )
                }

                {
                    view === "completed" && (
                        <div>
                            <DropdownMenuItem
                                render={
                                    <Link to={`/tasks/${task.id}`}>
                                        <Link2 />
                                        <span>Open</span>
                                    </Link>
                                }
                            />
                            <DropdownMenuItem
                                onClick={() => handleAction("activate")}
                                className={"text-accent/80 dark:text-chart-1"}
                            >
                                <RotateCcw />
                                <span>Activate</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className={"text-destructive"}
                                onClick={() => handleAction("delete")}
                            >
                                <Trash />
                                <span>Delete</span>
                            </DropdownMenuItem>
                        </div>
                    )
                }

                {
                    view === "deleted" && (
                        <div>
                            <DropdownMenuItem
                                render={
                                    <Link to={`/tasks/${task.id}`}>
                                        <Link2 />
                                        <span>Open</span>
                                    </Link>
                                }
                            />
                            <DropdownMenuItem
                                onClick={() => handleAction("restore")}
                                className={"text-yellow-600 dark:text-yellow-300"}
                            >
                                <Recycle />
                                <span>Restore</span>
                            </DropdownMenuItem>
                        </div>
                    )
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}