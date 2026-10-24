import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type { TaskFilterValues } from "../../types/task-query.types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import stringToDate from "@/lib/string-to-date";
import dateToString from "@/lib/date-to-string";
import { useState } from "react";


type TaskDeadlineFilterProps = {
    filters: TaskFilterValues;
    updateFilters: (updates: Partial<TaskFilterValues>) => void;
};

export default function TaskDeadlineFilter({
    filters,
    updateFilters
}: TaskDeadlineFilterProps) {
    const [deadlineFromOpen, setDeadlineFromOpen] = useState(false);
    const [deadlineToOpen, setDeadlineToOpen] = useState(false);
    const deadlineFromDate = stringToDate(filters.deadlineFrom);
    const deadlineToDate = stringToDate(filters.deadlineTo);

    function toggleDateFrom(date: Date | undefined) {
        const dateString = dateToString(date);
        if (dateString === filters.deadlineFrom) {
            updateFilters({
                deadlineFrom: undefined
            });
            setDeadlineFromOpen(false);
            return;
        }
        updateFilters({
            deadlineFrom: dateString
        });
        setDeadlineFromOpen(false);
    }

    function toggleDateTo(date: Date | undefined) {
        const dateString = dateToString(date);
        if (dateString === filters.deadlineTo) {
            updateFilters({
                deadlineTo: undefined
            });
            setDeadlineToOpen(false);
            return;
        }
        updateFilters({
            deadlineTo: dateString
        });
        setDeadlineToOpen(false);
    }

    return (
        <AccordionItem
            value="deadline"
            className="px-4 data-open:bg-sidebar-accent"
        >
            <AccordionTrigger className={"text-sm text-muted-foreground tracking-wide"}>
                Deadline
            </AccordionTrigger>
            <AccordionContent>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold tracking-wider">
                                From
                            </span>
                            <Popover
                                open={deadlineFromOpen}
                                onOpenChange={setDeadlineFromOpen}
                            >
                                <PopoverTrigger
                                    render={
                                        <Button
                                            type="button"
                                            variant={"outline"}
                                            className="rounded-sm h-7 text-xs tracking-wide"
                                        />
                                    }
                                >
                                    {
                                        deadlineFromDate
                                            ? format(deadlineFromDate, "MMM d, yyyy")
                                            : "Pick a date"
                                    }
                                </PopoverTrigger>

                                <PopoverContent
                                    align="start"
                                    className="w-auto rounded-sm p-0"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={deadlineFromDate}
                                        onSelect={toggleDateFrom}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold tracking-wider">
                                To
                            </span>
                            <Popover
                                open={deadlineToOpen}
                                onOpenChange={setDeadlineToOpen}
                            >
                                <PopoverTrigger
                                    render={
                                        <Button
                                            type="button"
                                            variant={"outline"}
                                            className="rounded-sm h-7 text-xs tracking-wide"
                                        />
                                    }
                                >
                                    {
                                        deadlineToDate
                                            ? format(deadlineToDate, "MMM d, yyyy")
                                            : "Pick a date"
                                    }
                                </PopoverTrigger>

                                <PopoverContent
                                    align="start"
                                    className="w-auto rounded-sm p-0"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={deadlineToDate}
                                        onSelect={toggleDateTo}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}