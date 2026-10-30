import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router";

import { DeadlineBadge } from "@/components/common/form/fields/form-date-picker";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { PRIORITY_OPTIONS } from "../../constants/tasks.priorities";
import { STATUS_OPTIONS } from "../../constants/tasks.status";
import type { Task, TaskTableView } from "../../types/task.types";

const columnHelper = createColumnHelper<Task>();

export function idColumn(view: TaskTableView) {
    return columnHelper.accessor("id", {
        header: () => <div className="text-sm font-semibold tracking-wide">Id</div>,
        cell: (info) => (
            <Link
                to={`/tasks/${info.getValue()}`}
                className={cn(
                    "tracking-widest hover:underline hover:underline-offset-4",
                    view === "inbox" && "text-primary/80 dark:text-chart-1",
                    view === "completed" && "text-green-600 dark:text-green-300",
                    view === "deleted" && "text-red-600 dark:text-red-400",
                )}
            >
                {info.getValue().slice(0, 8).toLocaleUpperCase()}
            </Link>
        ),
    });
}

export function titleColumn() {
    return columnHelper.accessor("title", {
        header: () => <div className="text-sm font-semibold tracking-wide">Title</div>,
        cell: (info) => (
            <Link
                to={`/tasks/${info.row.original.id}`}
                className="font-light text-xs md:text-sm tracking-tight hover:underline hover:underline-offset-4"
            >
                {info.getValue()}
            </Link>
        ),
    });
}

export function priorityColumn() {
    return columnHelper.accessor("priority", {
        header: () => <div className="text-sm font-semibold tracking-wide">Priority</div>,
        cell: (info) => {
            const taskPriority = PRIORITY_OPTIONS.find(
                (priority) => priority.value === info.getValue(),
            );
            if (!taskPriority) return null;

            return (
                <Badge className={`rounded-sm p-0 ${taskPriority.color}`} variant={"ghost"}>
                    <taskPriority.icon className="size-3.5 mr-1" />
                    <span>{taskPriority.label}</span>
                </Badge>
            );
        },
    });
}

export function statusColumn() {
    return columnHelper.accessor("status", {
        header: () => <div className="text-sm font-semibold tracking-wide">Status</div>,
        cell: (info) => {
            const taskStatus = STATUS_OPTIONS.find((status) => status.value === info.getValue());
            if (!taskStatus) return null;
            return (
                <Badge className={`rounded-sm p-0 ${taskStatus.color}`} variant={"ghost"}>
                    <taskStatus.icon className="size-3.5 mr-1" />
                    <span>{taskStatus.label}</span>
                </Badge>
            );
        },
    });
}

export function deadlineColumn() {
    return columnHelper.accessor("deadline", {
        header: () => <div className="text-sm font-semibold tracking-wide">Deadline</div>,
        cell: (info) => (
            <DeadlineBadge
                date={info.getValue()}
                defaultLabel="No Deadline"
                iconClassName="size-3.5 mr-2"
                labelClassName="text-xs tracking-wide"
            />
        ),
    });
}

export function completedAtColumn() {
    return columnHelper.accessor("updatedAt", {
        header: () => <div className="text-sm font-semibold tracking-wide">Completed</div>,
        cell: (info) => (
            <DeadlineBadge
                date={info.getValue()}
                defaultLabel="-"
                iconClassName="size-3.5 mr-2"
                labelClassName="text-xs tracking-wide"
            />
        ),
    });
}

export function deletedAtColumn() {
    return columnHelper.accessor("deletedAt", {
        header: () => <div className="text-sm font-semibold tracking-wide">Deleted</div>,
        cell: (info) => (
            <DeadlineBadge
                date={info.getValue()}
                defaultLabel="-"
                iconClassName="size-3.5 mr-2"
                labelClassName="text-xs tracking-wide"
            />
        ),
    });
}
