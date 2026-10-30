import { format } from "date-fns";

import stringToDate from "@/lib/string-to-date";

import { PRIORITY_OPTIONS } from "../../constants/tasks.priorities";
import { STATUS_OPTIONS } from "../../constants/tasks.status";
import type { TaskStatus } from "../../types/task.types";
import type { TaskFilterValues } from "../../types/task-query.types";
import FilterBadge from "./filter-badge";

type TaskFilterBadgeListType = {
    filters: TaskFilterValues;
    updateFilters: (updates: Partial<TaskFilterValues>) => void;
};

export default function TaskFilterBadgeList({ filters, updateFilters }: TaskFilterBadgeListType) {
    function clearStatus(status: TaskStatus) {
        const currentStatusArray = filters.status ?? [];
        const nextStatusArray = currentStatusArray.filter((value) => value !== status);
        updateFilters({
            status: nextStatusArray.length > 0 ? nextStatusArray : undefined,
        });
    }

    function clearPriority() {
        updateFilters({
            priority: undefined,
        });
    }

    function clearDeadlineFrom() {
        updateFilters({
            deadlineFrom: undefined,
        });
    }

    function clearDeadlineTo() {
        updateFilters({
            deadlineTo: undefined,
        });
    }

    return (
        <div className="mb-2 flex flex-wrap gap-1.5 px-4">
            {filters.status?.map((status) => {
                const option = STATUS_OPTIONS.find((item) => item.value === status);
                if (!option) return null;
                return (
                    <FilterBadge
                        key={status}
                        label={`Status: ${option.label}`}
                        handleClear={() => clearStatus(status)}
                    />
                );
            })}
            {filters.priority && (
                <FilterBadge
                    label={`Priority: ${
                        PRIORITY_OPTIONS.find((item) => filters.priority === item.value)?.label
                    }`}
                    handleClear={clearPriority}
                />
            )}
            {filters.deadlineFrom && (
                <FilterBadge
                    label={`From: ${format(stringToDate(filters.deadlineFrom), "MMM d, yyyy")}`}
                    handleClear={clearDeadlineFrom}
                />
            )}
            {filters.deadlineTo && (
                <FilterBadge
                    label={`To: ${format(stringToDate(filters.deadlineTo), "MMM d, yyyy")}`}
                    handleClear={clearDeadlineTo}
                />
            )}
        </div>
    );
}
