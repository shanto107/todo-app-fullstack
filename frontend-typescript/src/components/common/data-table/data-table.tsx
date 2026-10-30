/* eslint-disable react-hooks/incompatible-library */

import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    type RowSelectionState,
    useReactTable,
} from "@tanstack/react-table";
import { type ReactNode, useState } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { TaskTableView } from "@/features/tasks/types/task.types";
import { cn } from "@/lib/utils";

type RenderToolbarProps<T> = {
    table: ReturnType<typeof useReactTable<T>>;
    selectedRows: T[];
};

type DataTableProps<TData> = {
    data: TData[];
    columns: ColumnDef<TData, any>[];
    view?: TaskTableView;
    renderToolbar?: (props: RenderToolbarProps<TData>) => ReactNode;
};

export default function DataTable<TData>({
    data,
    columns,
    view,
    renderToolbar,
}: DataTableProps<TData>) {
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

    const table = useReactTable({
        data,
        columns,
        state: {
            rowSelection,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
    });

    const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);

    const emptyMessages: Record<TaskTableView, string> = {
        inbox: "No task remaining!",
        completed: "You have no completed any task!",
        deleted: "Trash is empty!",
    };

    const emptyMessage = view ? emptyMessages[view] : "No tasks found!";

    return (
        <div className="space-y-4">
            {renderToolbar?.({
                table,
                selectedRows,
            })}
            <div className="overflow-hidden md:min-w-3xl">
                <Table>
                    <TableHeader className="sticky top-0 bg-muted/50 backdrop-blur supports-[backdrop-filter]:bg-background/70">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="h-11 py-4 text-xs uppercase tracking-widest text-muted-foreground font-semibold"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef.header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className={cn(
                                        view === "deleted" && "text-muted-foreground",
                                        "h-14",
                                    )}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="py-2">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-12 text-sm italic">
                                    {emptyMessage}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
