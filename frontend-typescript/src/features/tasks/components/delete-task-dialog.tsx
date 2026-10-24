import useDeleteTask from "../hooks/use-delete-task";
import { Trash2Icon } from "lucide-react"
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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner";
import { useIsMobile } from "@/hooks/use-mobile";


type DeleteTaskDialogProps = {
    taskId: string;
}

export default function DeleteTaskDialog({
    taskId
}: DeleteTaskDialogProps) {
    const deleteTaskMutation = useDeleteTask();
    const isMobile = useIsMobile();
    return (
        <AlertDialog>
            <AlertDialogTrigger
                render={
                    <Button
                        variant="destructive"
                        className={"rounded-sm mt-1"}
                    >
                        {
                            isMobile 
                            ? <Trash2Icon />
                            : <span className="flex items-center gap-1 text-sm"><Trash2Icon /> Delete</span>
                        }
                    </Button>}
            />
            <AlertDialogContent size="sm" className={"rounded-md fixed md:left-[50%] md:top-[30%]"}>
                <AlertDialogHeader>
                    <AlertDialogMedia className="rounded-sm bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Delete Task?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action will permanently delete this task.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        variant="outline"
                        className={"rounded-sm"}
                    >
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        variant="destructive"
                        onClick={() => deleteTaskMutation.mutate(taskId)}
                        disabled={deleteTaskMutation.isPending}
                        className={"rounded-sm"}
                    >
                        {
                            deleteTaskMutation.isPending
                                ? <span className="flex items-center gap-1"><Spinner data-icon="inline-start" /> Deleting</span>
                                : <span>Delete</span>
                        }
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}