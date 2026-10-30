import { Filter, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

import type { TaskFilterValues } from "../../types/task-query.types";
import TaskDeadlineFilter from "./task-deadline-filter";
import TaskFilterBadgeList from "./task-filter-badge-list";
import TaskPriorityFilter from "./task-priority-filter";
import TaskStatusFilter from "./task-status-filter";

type TaskFiltersProps = {
    filters: TaskFilterValues;
    onChange: (filters: TaskFilterValues) => void;
};

export default function TaskFilters({ filters, onChange }: TaskFiltersProps) {
    const isMobile = useIsMobile();
    const [open, setOpen] = useState(false);
    const accordionKey = isMobile ? "mobile" : "desktop";

    const accordionDefaultValue = useMemo(
        () => (isMobile ? [] : ["status", "priority", "deadline"]),
        [isMobile],
    );

    const filterCount =
        (filters.status?.length ?? 0) +
        (filters.priority ? 1 : 0) +
        (filters.deadlineFrom ? 1 : 0) +
        (filters.deadlineTo ? 1 : 0);

    function updateFilters(updates: Partial<TaskFilterValues>) {
        onChange({
            ...filters,
            ...updates,
        });
    }

    function clearAll() {
        onChange({
            status: undefined,
            priority: undefined,
            deadlineFrom: undefined,
            deadlineTo: undefined,
        });
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
                render={
                    <Button variant="outline" size="sm" className="h-8 flex-1 rounded-sm px-2" />
                }
            >
                <Filter />
                <span className="">Filters</span>
                {filterCount > 0 && (
                    <span className="bg-primary text-primary-foreground ml-1 flex size-5 items-center justify-center rounded-full text-[10px]">
                        {filterCount}
                    </span>
                )}
            </SheetTrigger>

            <SheetContent className="w-full sm:max-w-sm">
                <SheetHeader>
                    <SheetTitle className="text-lg tracking-wide">
                        <span className="flex gap-2">
                            Task Filters
                            {filterCount > 0 && (
                                <Button
                                    variant={"destructive"}
                                    className={"h-7 rounded-sm"}
                                    onClick={clearAll}
                                >
                                    <Trash2 />
                                    Clear All
                                </Button>
                            )}
                        </span>
                    </SheetTitle>
                </SheetHeader>

                <TaskFilterBadgeList filters={filters} updateFilters={updateFilters} />

                <Accordion multiple key={accordionKey} defaultValue={accordionDefaultValue}>
                    <TaskStatusFilter filters={filters} updateFilters={updateFilters} />
                    <TaskPriorityFilter filters={filters} updateFilters={updateFilters} />
                    <TaskDeadlineFilter filters={filters} updateFilters={updateFilters} />
                </Accordion>
            </SheetContent>
        </Sheet>
    );
}
