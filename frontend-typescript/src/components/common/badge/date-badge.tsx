import { cn } from "@/lib/utils";
import {
    addDays,
    format,
    isSameDay,
    isToday,
    isTomorrow,
    startOfDay,
} from "date-fns";
import { CalendarDays, CalendarIcon, Sun } from "lucide-react";
import { DateIcon } from "../icons/date-icons";

const colors = {
    today: "text-green-600 dark:text-green-300",
    tomorrow: "text-yellow-600 dark:text-yellow-300",
    nextWeek: "text-purple-600 dark:text-purple-300",
};

type DateBadgeProps = {
    date: Date | undefined;
    defaultLabel?: string;
    iconClassName?: string;
    labelClassName?: string;
};

export function DateBadge({
    date,
    defaultLabel,
    iconClassName,
    labelClassName,
}: DateBadgeProps) {
    if (!date) {
        return (
            <div className="flex items-end">
                <CalendarIcon className={cn("mr-2 size-4.5", iconClassName)} />
                <span>{defaultLabel || "Date"}</span>
            </div>
        );
    }

    if (isToday(date)) {
        return (
            <div className="flex items-end">
                <CalendarDays
                    className={cn("mr-2 size-4.5", colors.today, iconClassName)}
                />
                <span className={cn(colors.today, labelClassName)}>Today</span>
            </div>
        );
    }

    if (isTomorrow(date)) {
        return (
            <div className="flex items-center">
                <Sun
                    className={cn(
                        "mr-2 size-5",
                        colors.tomorrow,
                        iconClassName,
                    )}
                />
                <span className={cn(colors.tomorrow, labelClassName)}>
                    Tomorrow
                </span>
            </div>
        );
    }

    const nextWeek = addDays(startOfDay(new Date()), 7);

    if (isSameDay(date, nextWeek)) {
        return (
            <div className="flex items-end">
                <DateIcon
                    date={date}
                    className={cn(
                        "mr-2 size-5",
                        colors.nextWeek,
                        iconClassName,
                    )}
                />
                <span className={cn(colors.nextWeek, labelClassName)}>
                    Next week
                </span>
            </div>
        );
    }

    return (
        <div className="flex items-end">
            <CalendarIcon
                className={cn(
                    "mr-2 size-4.5 text-yellow-600 dark:text-yellow-400",
                    iconClassName,
                )}
            />
            <span
                className={cn(
                    "text-yellow-600 dark:text-yellow-400",
                    labelClassName,
                )}
            >
                {format(date, "MMM d")}
            </span>
        </div>
    );
}
