import { Flag } from "lucide-react";

export const PRIORITY_OPTIONS = [
    {
        value: "low",
        label: "Low",
        color: "text-blue-600",
        backgroundColor: "bg-blue-200/50 dark:bg-blue-200",
        icon: Flag,
    },
    {
        value: "medium",
        label: "Medium",
        color: "text-yellow-600",
        backgroundColor: "bg-yellow-200/50 dark:bg-yellow-200",
        icon: Flag,
    },
    {
        value: "high",
        label: "High",
        color: "text-orange-600",
        backgroundColor: "bg-orange-200/50 dark:bg-orange-200",
        icon: Flag,
    },
    {
        value: "urgent",
        label: "Urgent",
        color: "text-red-600",
        backgroundColor: "bg-red-200/50 dark:bg-red-200",
        icon: Flag,
    },
] as const;
