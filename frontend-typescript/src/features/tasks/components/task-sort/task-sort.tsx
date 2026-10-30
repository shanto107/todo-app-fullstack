import { ArrowUpDown } from "lucide-react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { TASK_SORT_OPTIONS } from "../../constants/task-sort-options";
import type { SortDirection, TaskPageKey, TaskSortBy } from "../../types/task.types";

type TaskSortProps = {
    pageKey: TaskPageKey;
    sortBy?: TaskSortBy;
    sortDirection?: SortDirection;
    onChange: (sortBy: TaskSortBy, sortDirection: SortDirection) => void;
};

export default function TaskSort({ pageKey, sortBy, sortDirection, onChange }: TaskSortProps) {
    const options = TASK_SORT_OPTIONS[pageKey];
    const selectedOption = options.find(
        (option) => option.sortBy === sortBy && option.sortDirection === sortDirection,
    );
    const SortIcon = selectedOption ? selectedOption.symbol : ArrowUpDown;
    const currentValue = sortBy && sortDirection ? `${sortBy}:${sortDirection}` : undefined;

    return (
        <Select
            value={currentValue ?? ""}
            onValueChange={(value) => {
                if (!value) return;
                const [selectedSortBy, selectedSortDirection] = value.split(":") as [
                    TaskSortBy,
                    SortDirection,
                ];
                onChange(selectedSortBy, selectedSortDirection);
            }}
        >
            <SelectTrigger
                size="sm"
                className="!h-8 min-w-36 flex-1 !rounded-sm"
                aria-label="Sort tasks"
            >
                <SelectValue placeholder="Sort">
                    {selectedOption ? (
                        <span className="flex gap-2">
                            {selectedOption.label} <SortIcon className="size-3.5" />
                        </span>
                    ) : (
                        "Sort"
                    )}
                </SelectValue>
            </SelectTrigger>
            <SelectContent align="end" className={"rounded-sm"}>
                {options.map((option) => {
                    const Icon = option.symbol;
                    return (
                        <SelectItem
                            key={`${option.sortBy}:${option.sortDirection}`}
                            value={`${option.sortBy}:${option.sortDirection}`}
                        >
                            <span className="flex gap-2">
                                {option.label} <Icon className="size-3.5" />
                            </span>
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </Select>
    );
}
