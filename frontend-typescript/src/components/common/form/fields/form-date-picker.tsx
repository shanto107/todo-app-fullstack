import { addDays, format, isSameDay, isToday, isTomorrow, nextSunday } from "date-fns";
import {
    CalendarArrowDownIcon,
    CalendarDaysIcon,
    CalendarIcon,
    CalendarRange,
    X,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { FormBase, type FormControlProps } from "../FormBase";
import { useFieldContext } from "../hooks";

const colors = {
    today: "text-green-600 dark:text-green-300",
    tomorrow: "text-blue-600 dark:text-blue-300",
    nextWeek: "text-purple-600 dark:text-purple-300",
};

const icons = {
    today: CalendarDaysIcon,
    tomorrow: CalendarArrowDownIcon,
    nextWeek: CalendarRange,
};

const quickDates = [
    {
        label: "Today",
        date: new Date(),
        icon: icons.today,
        color: colors.today,
    },
    {
        label: "Tomorrow",
        date: addDays(new Date(), 1),
        icon: icons.tomorrow,
        color: colors.tomorrow,
    },
    {
        label: "Next Week",
        date: nextSunday(new Date()),
        icon: icons.nextWeek,
        color: colors.nextWeek,
    },
];

type DeadlineBadgeProps = {
    date: Date | undefined;
    defaultLabel?: string;
    iconClassName?: string;
    labelClassName?: string;
};

export function DeadlineBadge({
    date,
    defaultLabel,
    iconClassName,
    labelClassName,
}: DeadlineBadgeProps) {
    if (!date) {
        return (
            <div className="flex items-center">
                <CalendarIcon className={`mr-1 size-3.5`} />
                <span>{defaultLabel || "Deadline"}</span>
            </div>
        );
    }
    if (isToday(date)) {
        return (
            <div className="flex items-center">
                <icons.today className={cn(`mr-1 size-3.5 ${colors.today}`, iconClassName)} />
                <span className={cn(colors.today, labelClassName)}>Today</span>
            </div>
        );
    }
    if (isTomorrow(date)) {
        return (
            <div className="flex items-center">
                <icons.tomorrow className={cn(`mr-1 size-3.5 ${colors.tomorrow}`, iconClassName)} />
                <span className={cn(colors.tomorrow, labelClassName)}>Tomorrow</span>
            </div>
        );
    }
    if (isSameDay(date, nextSunday(new Date()))) {
        return (
            <div className="flex items-center">
                <icons.nextWeek className={cn(`mr-1 size-3.5 ${colors.nextWeek}`, iconClassName)} />
                <span className={cn(colors.nextWeek, labelClassName)}>Next week</span>
            </div>
        );
    }

    return (
        <div className="flex items-center">
            <CalendarIcon
                className={cn("mr-1 size-3.5 text-yellow-600 dark:text-yellow-400", iconClassName)}
            />
            <span className={cn("text-yellow-600 dark:text-yellow-400", labelClassName)}>
                {format(date, "MMM d")}
            </span>
        </div>
    );
}

type FormDatePickerProps = FormControlProps & {
    disabled?: boolean;
};

export function FormDatePicker({ disabled = false, ...props }: FormDatePickerProps) {
    const [openPopover, setOpenPopover] = useState(false);
    const field = useFieldContext<Date | undefined>();
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

    function handleDateSelect(date: Date | undefined) {
        if (!date) {
            field.handleChange(undefined);
            return;
        }
        if (field.state.value) {
            date.setHours(field.state.value.getHours(), field.state.value.getMinutes());
        }
        field.handleChange(date);
        setOpenPopover(false);
    }

    const calendarTrigger = (
        <Button
            id={field.name}
            type="button"
            variant={"ghost"}
            size={"sm"}
            disabled={disabled}
            onBlur={field.handleBlur}
            aria-invalid={isInvalid}
            className={"text-muted-foreground h-8 rounded-sm text-xs tracking-wide"}
        >
            <DeadlineBadge date={field.state.value} />
        </Button>
    );

    const unselectTrigger = !disabled && field.state.value && (
        <Button
            type="button"
            variant={"ghost"}
            size={"sm"}
            className="text-muted-foreground hover:text-foreground size-6 rounded-sm"
            onClick={(e) => {
                e.stopPropagation();
                field.handleChange(undefined);
            }}
        >
            <X className="size-3.5" />
        </Button>
    );

    const quickActions = (
        <div className="mb-2 space-y-1">
            {quickDates.map((day) => (
                <Button
                    key={day.label}
                    variant={"ghost"}
                    className={"w-full justify-between rounded-sm"}
                    onClick={() => {
                        field.handleChange(day.date);
                        setOpenPopover(false);
                    }}
                >
                    <div className="flex items-center gap-3">
                        <day.icon className={day.color} />
                        <span className="tracking-wider">{day.label}</span>
                    </div>
                    <span className="text-muted-foreground text-xs">{format(day.date, "EEE")}</span>
                </Button>
            ))}
        </div>
    );

    return (
        <FormBase {...props} variant="compact">
            <div className="bg-background dark:bg-input/30 flex items-center rounded-sm border">
                <Popover
                    open={!disabled ? openPopover : false}
                    onOpenChange={(open) => {
                        if (!disabled) {
                            setOpenPopover(open);
                        }
                    }}
                >
                    <PopoverTrigger render={calendarTrigger} />
                    <PopoverContent className={"w-55 rounded-sm p-0"} align="start">
                        <div className="border-b pt-2">{quickActions}</div>
                        <Calendar
                            mode="single"
                            selected={field.state.value}
                            onSelect={disabled ? undefined : handleDateSelect}
                            disabled={disabled ? () => true : undefined}
                            modifiers={{
                                weekend: (date) => date.getDay() === 5 || date.getDay() === 6,
                            }}
                            modifiersClassNames={{
                                weekend: "text-red-400",
                            }}
                        />
                    </PopoverContent>
                </Popover>
                {unselectTrigger}
            </div>
        </FormBase>
    );
}
