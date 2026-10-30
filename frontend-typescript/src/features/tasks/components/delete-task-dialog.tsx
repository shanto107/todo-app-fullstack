import { Trash2Icon } from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useIsMobile } from "@/hooks/use-mobile";

import useDeleteTask from "../hooks/use-delete-task";

type DeleteTaskDialogProps = {
    taskId: string;
};

export default function DeleteTaskDialog({ taskId }: DeleteTaskDialogProps) {
    const deleteTaskMutation = useDeleteTask();
    const isMobile = useIsMobile();
    return (
        <AlertDialog>
            <AlertDialogTrigger
                render={
                    <Button variant="destructive" className={"mt-1 rounded-sm"}>
                        {isMobile ? (
                            <Trash2Icon />
                        ) : (
                            <span className="flex items-center gap-1 text-sm">
                                <Trash2Icon /> Delete
                            </span>
                        )}
                    </Button>
                }
            />
            <AlertDialogContent size="sm" className={"fixed rounded-md md:top-[30%] md:left-[50%]"}>
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive rounded-sm">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Delete Task?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action will permanently delete this task.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline" className={"rounded-sm"}>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        variant="destructive"
                        onClick={() => deleteTaskMutation.mutate(taskId)}
                        disabled={deleteTaskMutation.isPending}
                        className={"rounded-sm"}
                    >
                        {deleteTaskMutation.isPending ? (
                            <span className="flex items-center gap-1">
                                <Spinner data-icon="inline-start" /> Deleting
                            </span>
                        ) : (
                            <span>Delete</span>
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
