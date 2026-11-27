import {
    addDays,
    format,
    isValid,
    parse,
    startOfDay,
    startOfMonth,
    subYears,
} from "date-fns";
import { CalendarDays, Sun, X, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
import { Input } from "@/components/ui/input";
import { formatDateInput } from "@/lib/helpers/format-date/format-date-input";

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
    includeQuickDates?: boolean;
    disableFutureDates?: boolean;
    includeInputField?: boolean;
    defaultLabel?: string;
    dropdownCaptionLayout?: boolean;
    labelClassName?: string;
    inputClassName?: string;
};

export function FormDatePicker({
    variant,
    disabled = false,
    includeQuickDates = false,
    includeInputField = false,
    dropdownCaptionLayout = false,
    defaultLabel,
    disableFutureDates,
    labelClassName,
    inputClassName,
    ...props
}: FormDatePickerProps) {
    const [openPopover, setOpenPopover] = useState(false);
    const [inputError, setInputError] = useState<string>();
    const field = useFieldContext<Date | undefined>();
    const dateInputRef = useRef<HTMLInputElement>(null);

    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
    const today = startOfDay(new Date());
    const minAllowedDate = startOfDay(subYears(today, 65));

    const isDateDisabled = (date: Date): boolean => {
        if (disabled) return true;
        if (date < minAllowedDate) return true;
        return disableFutureDates === true && date > today;
    };

    const [dateInput, setDateInput] = useState(
        field.state.value ? format(field.state.value, "dd-MM-yyyy") : "",
    );

    useEffect(() => {
        setDateInput(
            field.state.value ? format(field.state.value, "dd-MM-yyyy") : "",
        );
    }, [field.state.value]);

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

    function updateInputError(message?: string) {
        setInputError(message);
        field.setErrorMap({
            onChange: message,
        });
    }

    function handleDateSelect(date: Date | undefined) {
        if (!date) {
            field.handleChange(undefined);
            updateInputError();
            setOpenPopover(false);
            return;
        }

        field.handleChange(startOfDay(date));
        setOpenPopover(false);
    }

    function handleQuickDateSelect(date: Date) {
        if (isDateDisabled(date)) return;

        field.handleChange(startOfDay(date));
        updateInputError();
        setOpenPopover(false);
    }

    function handleDateInputSubmit() {
        if (!dateInput) {
            field.handleChange(undefined);
            updateInputError();
            return false;
        }

        const parsedDate = parse(dateInput, "dd-MM-yyyy", new Date());

        const isDateValid =
            isValid(parsedDate) &&
            format(parsedDate, "dd-MM-yyyy") === dateInput;

        if (!isDateValid) {
            updateInputError("Pick a valid date");
            return false;
        }

        const selectedDate = startOfDay(parsedDate);

        // Respect your date restriction
        if (isDateDisabled(selectedDate)) {
            updateInputError("Date of birth cannot be in the future.");
            return false;
        }

        if (selectedDate < minAllowedDate) {
            updateInputError("This date is not allowed");
            return false;
        }

        field.handleChange(selectedDate);
        updateInputError();
        return true;
    }

    function handleDateInputBlur() {
        field.handleBlur();
        handleDateInputSubmit();
    }

    function handleDateInputKeyDown(
        event: React.KeyboardEvent<HTMLInputElement>,
    ) {
        if (event.key === "Enter") {
            event.preventDefault();
            const success = handleDateInputSubmit();

            if (success) {
                setOpenPopover(false);
                dateInputRef.current?.blur();
            }
        }
    }

    const calendarTrigger = (
        <Button
            id={field.name}
            type="button"
            variant="ghost"
            size="sm"
            disabled={disabled}
            onBlur={field.handleBlur}
            aria-invalid={includeInputField ? undefined : isInvalid}
            className="text-muted-foreground h-8 rounded-sm text-xs tracking-wide shadow-none"
        >
            {includeInputField ? (
                <CalendarDays className="size-4" />
            ) : (
                <DateBadge
                    date={field.state.value}
                    defaultLabel={defaultLabel}
                    includeQuickDates={includeQuickDates}
                    formatString="MMM d, yyyy"
                />
            )}
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
                setDateInput("");
                updateInputError();
                setOpenPopover(false);
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
        <FormBase {...props} variant={variant} labelClassName={labelClassName}>
            <div className="relative">
                <div
                    className={cn(
                        "flex items-center gap-1 rounded-sm border",
                        isInvalid
                            ? "border-destructive ring-destructive/20"
                            : "border-input",
                    )}
                >
                    {includeInputField && (
                        <Input
                            ref={dateInputRef}
                            id={field.name}
                            name={field.name}
                            value={dateInput}
                            placeholder="DD-MM-YYYY"
                            disabled={disabled}
                            maxLength={10}
                            inputMode="numeric"
                            onChange={(event) => {
                                setDateInput(
                                    formatDateInput(event.target.value),
                                );
                                if (inputError) {
                                    updateInputError();
                                }
                            }}
                            onBlur={handleDateInputBlur}
                            onKeyDown={handleDateInputKeyDown}
                            className={cn(
                                inputClassName,
                                "h-8 min-w-0 flex-1 rounded-sm border-0 px-2 shadow-none focus-visible:ring-0",
                            )}
                        />
                    )}

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
                            {includeQuickDates && (
                                <div className="border-b pt-2">
                                    {quickActions}
                                </div>
                            )}

                            <Calendar
                                mode="single"
                                captionLayout={
                                    dropdownCaptionLayout
                                        ? "dropdown"
                                        : undefined
                                }
                                startMonth={startOfMonth(subYears(today, 65))}
                                selected={field.state.value}
                                onSelect={
                                    disabled ? undefined : handleDateSelect
                                }
                                disabled={isDateDisabled}
                                modifiers={{
                                    weekend: (date) =>
                                        date.getDay() === 5 ||
                                        date.getDay() === 6,
                                }}
                                modifiersClassNames={{
                                    weekend: "text-red-400",
                                }}
                            />
                        </PopoverContent>
                    </Popover>

                    {unselectTrigger}
                </div>
                {inputError && (
                    <p
                        role="alert"
                        className="text-destructive absolute top-full left-0 z-10 mt-1 text-xs font-medium whitespace-nowrap"
                    >
                        {inputError}
                    </p>
                )}
            </div>
        </FormBase>
    );
}
