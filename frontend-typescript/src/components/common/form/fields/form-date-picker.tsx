import { addDays, format, startOfDay } from "date-fns";
import { CalendarDays, Sun, X, type LucideIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { FormBase, type FormControlProps } from "../form-base";
import { useFieldContext } from "../hooks";
import { DateIcon } from "../../icons/date-icons";
import { DateBadge } from "../../badge/date-badge";

const colors = {
    today: "text-green-600 dark:text-green-300",
    tomorrow: "text-yellow-600 dark:text-yellow-300",
    nextWeek: "text-purple-600 dark:text-purple-300",
};

const icons = {
    today: CalendarDays,
    tomorrow: Sun,
};

type QuickDate = {
    id: "today" | "tomorrow" | "nextWeek";
    label: string;
    date: Date;
    color: string;
    icon?: LucideIcon;
};

type FormDatePickerProps = FormControlProps & {
    disabled?: boolean;
    variant: "default" | "compact" | "bare";
    defaultLabel?: string;
};

export function FormDatePicker({
    variant,
    disabled = false,
    defaultLabel,
    ...props
}: FormDatePickerProps) {
    const [openPopover, setOpenPopover] = useState(false);
    const field = useFieldContext<Date | undefined>();
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
    const today = startOfDay(new Date());

    const quickDates: QuickDate[] = [
        {
            id: "today",
            label: "Today",
            date: today,
            icon: icons.today,
            color: colors.today,
        },
        {
            id: "tomorrow",
            label: "Tomorrow",
            date: addDays(today, 1),
            icon: icons.tomorrow,
            color: colors.tomorrow,
        },
        {
            id: "nextWeek",
            label: "Next Week",
            date: addDays(today, 7),
            color: colors.nextWeek,
        },
    ];

    function handleDateSelect(date: Date | undefined) {
        if (!date) {
            field.handleChange(undefined);
            setOpenPopover(false);
            return;
        }

        field.handleChange(startOfDay(date));
        setOpenPopover(false);
    }

    function handleQuickDateSelect(date: Date) {
        field.handleChange(startOfDay(date));
        setOpenPopover(false);
    }

    const calendarTrigger = (
        <Button
            id={field.name}
            type="button"
            variant="ghost"
            size="sm"
            disabled={disabled}
            onBlur={field.handleBlur}
            aria-invalid={isInvalid}
            className="text-muted-foreground h-8 rounded-sm text-xs tracking-wide"
        >
            <DateBadge date={field.state.value} defaultLabel={defaultLabel} />
        </Button>
    );

    const unselectTrigger = !disabled && field.state.value && (
        <Button
            type="button"
            variant="ghost"
            size="sm"
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
            {quickDates.map((day) => {
                const Icon = day.icon;

                return (
                    <Button
                        key={day.label}
                        type="button"
                        variant="ghost"
                        className="w-full justify-between rounded-sm"
                        onClick={() => handleQuickDateSelect(day.date)}
                    >
                        <div className="flex items-center gap-3">
                            {Icon ? (
                                <Icon className={cn("size-4.5", day.color)} />
                            ) : (
                                <DateIcon
                                    date={day.date}
                                    className={cn("size-5", day.color)}
                                />
                            )}

                            <span className="tracking-wider">{day.label}</span>
                        </div>

                        <span className="text-muted-foreground text-xs tracking-wide">
                            {day.id === "nextWeek"
                                ? format(day.date, "d MMM, EEE")
                                : format(day.date, "EEE")}
                        </span>
                    </Button>
                );
            })}
        </div>
    );

    return (
        <FormBase {...props} variant={variant}>
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

                    <PopoverContent
                        className="w-55 rounded-sm p-0"
                        align="start"
                    >
                        <div className="border-b pt-2">{quickActions}</div>

                        <Calendar
                            mode="single"
                            selected={field.state.value}
                            onSelect={disabled ? undefined : handleDateSelect}
                            disabled={disabled ? () => true : undefined}
                            modifiers={{
                                weekend: (date) =>
                                    date.getDay() === 5 || date.getDay() === 6,
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
