import { type ReactElement, useState } from "react";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import AddTaskForm from "./add-task-form";

type AddTaskDialogProp = {
    trigger: ReactElement;
    className?: string;
};

export default function AddTaskDialog({ trigger, className }: AddTaskDialogProp) {
    const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);

    return (
        <Dialog open={openAddTaskDialog} onOpenChange={setOpenAddTaskDialog}>
            <DialogTrigger render={trigger} />
            <DialogContent
                className={cn(
                    "max-w-md w-[calc(100%-2rem)] sm:max-w-2xl pt-4 pb-0 px-0 rounded-sm top-[40%] md:top-[25%]",
                    className,
                )}
            >
                <DialogTitle className="sr-only">Add Task</DialogTitle>
                <AddTaskForm onSuccess={() => setOpenAddTaskDialog(false)} />
            </DialogContent>
        </Dialog>
    );
}
