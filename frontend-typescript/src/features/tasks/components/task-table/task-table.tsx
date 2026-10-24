import DataTable from "@/components/common/data-table/data-table"
import type { Task, TaskTableView } from "../../types/task.types"
import BulkToolbar from "./bulk-toolbar";
import { createColumns } from "./table-view-factory";

type TaskTableProps = {
    tasks: Task[];
    view: TaskTableView
}

export default function TaskTable( {
    tasks,
    view
}: TaskTableProps) {
    return (
        <DataTable
            data={tasks}
            columns={createColumns(view)}
            view={view}
            renderToolbar={({table, selectedRows}) => (
                <BulkToolbar 
                    view={view}
                    selectedTasks={selectedRows}
                    onClearSelection={() => table.resetRowSelection()}
                />
            )}
        />
    )
}