import { CheckCircle2, Circle, CircleDot, XCircle } from "lucide-react";

export const STATUS_OPTIONS = [
    {
        value: "todo",
        label: "Todo",
        color: "text-muted-foreground",
        icon: Circle,
    },
    {
        value: "in_progress",
        label: "In Progress",
        color: "text-blue-500",
        icon: CircleDot,
    },
    {
        value: "done",
        label: "Done",
        color: "text-green-500",
        icon: CheckCircle2,
    },
    {
        value: "cancelled",
        label: "Cancelled",
        color: "text-red-500",
        icon: XCircle,
    },
] as const;
