import type { Task, TaskTableView } from "../../types/task.types";
import { rowActionsColumn } from "./row-actions-column";
import { completedAtColumn, deadlineColumn, deletedAtColumn, idColumn, priorityColumn, statusColumn, titleColumn } from "./columns";
import { createSelectColumn } from "./select-column";

export function createColumns(view: TaskTableView) {
    switch(view) {
        case "inbox": 
            return [
                createSelectColumn<Task>(),
                idColumn("inbox"),
                titleColumn(),
                priorityColumn(),
                statusColumn(),
                deadlineColumn(),
                rowActionsColumn("inbox")
            ];
        case "completed":
            return [
                createSelectColumn<Task>(),
                idColumn("completed"),
                titleColumn(),
                priorityColumn(),
                completedAtColumn(),
                rowActionsColumn("completed")
            ]
        case "deleted":
            return [
                createSelectColumn<Task>(),
                idColumn("deleted"),
                titleColumn(),
                deletedAtColumn(),
                rowActionsColumn("deleted")
            ]
    }
}