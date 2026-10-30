import { Recycle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useIsMobile } from "@/hooks/use-mobile";

import useRestoreTask from "../hooks/use-restore-task";

type RestoreTaskButtonProps = {
    taskId: string;
};

export default function RestoreTaskButton({ taskId }: RestoreTaskButtonProps) {
    const restoreMutation = useRestoreTask();
    const isMobile = useIsMobile();

    function handleRestore() {
        void restoreMutation.mutateAsync(taskId);
    }
    return (
        <Button
            disabled={restoreMutation.isPending}
            onClick={handleRestore}
            className={
                "rounded-sm text-yellow-600 bg-yellow-200 dark:text-yellow-200 dark:bg-yellow-600 hover:bg-yellow-300 mt-1"
            }
        >
            {restoreMutation.isPending ? (
                <span className="flex items-center gap-1">
                    <Spinner data-icon="inline-start" /> {!isMobile && "Restoring"}
                </span>
            ) : (
                <span className="flex items-center gap-1">
                    {isMobile ? (
                        <Recycle className="size-4" />
                    ) : (
                        <span className="flex items-center gap-1 text-sm">
                            <Recycle /> Restore
                        </span>
                    )}
                </span>
            )}
        </Button>
    );
}
