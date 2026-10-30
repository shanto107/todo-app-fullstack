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
                    "top-[40%] w-[calc(100%-2rem)] max-w-md rounded-sm px-0 pt-4 pb-0 sm:max-w-2xl md:top-[25%]",
                    className,
                )}
            >
                <DialogTitle className="sr-only">Add Task</DialogTitle>
                <AddTaskForm onSuccess={() => setOpenAddTaskDialog(false)} />
            </DialogContent>
        </Dialog>
    );
}
