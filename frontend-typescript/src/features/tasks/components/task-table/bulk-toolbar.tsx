import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { useBulkTasks } from "../../hooks/use-bulk-tasks";
import type { BulkTasksAction, Task, TaskTableView } from "../../types/task.types";

type BulkToolbarProps = {
    selectedTasks: Task[];
    view: TaskTableView;
    onClearSelection: () => void;
};

export default function BulkToolbar({ selectedTasks, view, onClearSelection }: BulkToolbarProps) {
    const [pendingAction, setPendingAction] = useState<BulkTasksAction | null>(null);
    const mutation = useBulkTasks();

    if (!selectedTasks.length) {
        return null;
    }
    const ids = selectedTasks.map((task) => task.id);

    async function handleAction(action: BulkTasksAction) {
        setPendingAction(action);
        try {
            await mutation.mutateAsync({
                action,
                ids,
            });
            onClearSelection();
        } catch (error) {
            console.log(error);
        } finally {
            setPendingAction(null);
        }
    }

    return (
        <div className="bg-accent/10 flex items-center justify-between rounded-sm border px-4 py-3">
            <p className="text-sm font-medium">
                {selectedTasks.length} task{selectedTasks.length > 1 ? "s" : ""} selected
            </p>

            <div className="flex gap-2">
                {view === "inbox" && (
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            onClick={() => void handleAction("complete")}
                            disabled={mutation.isPending}
                            className={"rounded-sm bg-green-200 text-green-700 hover:bg-green-300"}
                        >
                            {pendingAction === "complete" ? (
                                <span className="flex items-center gap-1">
                                    <Spinner data-icon="inline-start" /> Completing
                                </span>
                            ) : (
                                <span>Mark as Complete</span>
                            )}
                        </Button>
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => void handleAction("delete")}
                            disabled={mutation.isPending}
                            className={"rounded-sm"}
                        >
                            {pendingAction === "delete" ? (
                                <span className="flex items-center gap-1">
                                    <Spinner data-icon="inline-start" /> Deleting
                                </span>
                            ) : (
                                <span>Delete</span>
                            )}
                        </Button>
                    </div>
                )}
                {view === "completed" && (
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            onClick={() => void handleAction("activate")}
                            disabled={mutation.isPending}
                            className={"bg-accent/80 hover:bg-accent rounded-sm"}
                        >
                            {pendingAction === "activate" ? (
                                <span className="flex items-center gap-1">
                                    <Spinner data-icon="inline-start" /> Activating
                                </span>
                            ) : (
                                <span>Activate</span>
                            )}
                        </Button>
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => void handleAction("delete")}
                            disabled={mutation.isPending}
                            className={"rounded-sm"}
                        >
                            {pendingAction === "delete" ? (
                                <span className="flex items-center gap-1">
                                    <Spinner data-icon="inline-start" /> Deleting
                                </span>
                            ) : (
                                <span>Delete</span>
                            )}
                        </Button>
                    </div>
                )}
                {view === "deleted" && (
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            onClick={() => void handleAction("restore")}
                            disabled={mutation.isPending}
                            className={
                                "rounded-sm bg-yellow-200 text-yellow-600 hover:bg-yellow-300"
                            }
                        >
                            {pendingAction === "restore" ? (
                                <span className="flex items-center gap-1">
                                    <Spinner data-icon="inline-start" /> Restoring
                                </span>
                            ) : (
                                <span>Restore</span>
                            )}
                        </Button>
                    </div>
                )}
                <Button
                    size="sm"
                    variant="outline"
                    onClick={onClearSelection}
                    disabled={mutation.isPending}
                    className={"rounded-sm"}
                >
                    Clear
                </Button>
            </div>
        </div>
    );
}
