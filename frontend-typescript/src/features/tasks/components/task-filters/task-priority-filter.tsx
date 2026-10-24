import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import type { TaskPriority } from "../../types/task.types";
import type { TaskFilterValues } from "../../types/task-query.types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PRIORITY_OPTIONS } from "../../constants/tasks.priorities";

type TaskStatusFilterProps = {
    filters: TaskFilterValues;
    updateFilters: (updates: Partial<TaskFilterValues>) => void;
};

export default function TaskPriorityFilter({
    filters,
    updateFilters
}: TaskStatusFilterProps) {
    const selectedPriority = PRIORITY_OPTIONS.find(option => option.value === filters.priority);

    function togglePriority(priority: string | null) {
        updateFilters({
            priority: (priority === null || filters.priority === priority) ? undefined : priority as TaskPriority
        });
    }

    return (
        <AccordionItem
            value="priority"
            className="px-4 data-open:bg-sidebar-accent"
        >
            <AccordionTrigger className={"text-sm text-muted-foreground tracking-wide"}>
                Priority
            </AccordionTrigger>
            <AccordionContent
                className={"space-y-0.5"}
            >
                <Select
                    value={filters.priority ?? ""}
                    onValueChange={togglePriority}
                >
                    <SelectTrigger className="w-full rounded-sm border bg-background tracking-wide">
                        <SelectValue 
                            placeholder="Select priority"
                            className="text-xs text-foreground font-semibold tracking-wide"
                        >
                            {selectedPriority?.label ?? "Select priority"}
                        </SelectValue>
                    </SelectTrigger>

                    <SelectContent className={"rounded-sm"}>
                        {
                            PRIORITY_OPTIONS.map(option => (
                                <SelectItem
                                    key={option.value}
                                    value={option.value}
                                    className={"text-xs text-foreground font-semibold tracking-wide"}
                                >
                                    {option.label}
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
            </AccordionContent>
        </AccordionItem>
    )
}
