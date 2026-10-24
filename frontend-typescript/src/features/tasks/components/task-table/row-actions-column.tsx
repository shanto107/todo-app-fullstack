import { createColumnHelper } from "@tanstack/react-table";
import type { Task, TaskTableView } from "../../types/task.types";
import RowActions from "./row-actions-dropdown";

const columnHelper = createColumnHelper<Task>();

export function rowActionsColumn(view: TaskTableView) {
    return columnHelper.display({
        id: "actions",
        header: "",
        cell: ({row}) => (
            <RowActions 
                task={row.original}
                view={view}
            />
        ),
        size: 40,
        enableSorting: false,
        enableHiding: false
    })
}