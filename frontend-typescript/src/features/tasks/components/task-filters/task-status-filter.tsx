import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

import { STATUS_OPTIONS } from "../../constants/tasks.status";
import type { TaskStatus } from "../../types/task.types";
import type { TaskFilterValues } from "../../types/task-query.types";

type TaskStatusFilterProps = {
    filters: TaskFilterValues;
    updateFilters: (updates: Partial<TaskFilterValues>) => void;
};

export default function TaskStatusFilter({ filters, updateFilters }: TaskStatusFilterProps) {
    function toggleStatus(status: TaskStatus) {
        const current = filters.status ?? [];
        const next = current.includes(status)
            ? current.filter((value) => value !== status)
            : [...current, status];
        updateFilters({
            status: next.length > 0 ? next : undefined,
        });
    }
    return (
        <AccordionItem value="status" className="px-4 border-t data-open:bg-sidebar-accent">
            <AccordionTrigger className={"text-sm text-muted-foreground tracking-wide"}>
                Status
            </AccordionTrigger>
            <AccordionContent className={"space-y-0.5"}>
                {STATUS_OPTIONS.map((option) => {
                    const checked = filters.status?.includes(option.value) ?? false;
                    return (
                        <label
                            key={option.value}
                            className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 hover:bg-muted"
                        >
                            <Checkbox
                                checked={checked}
                                onCheckedChange={() => toggleStatus(option.value)}
                                className={"rounded-xs size-4.5 border-foreground"}
                            />
                            <span className={`font-semibold tracking-wide`}>{option.label}</span>
                        </label>
                    );
                })}
            </AccordionContent>
        </AccordionItem>
    );
}
