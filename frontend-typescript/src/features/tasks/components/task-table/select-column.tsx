import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

const columnHelper = createColumnHelper<any>();

export function createSelectColumn<T>(): ColumnDef<T> {
    return columnHelper.display({
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                indeterminate={
                    !table.getIsAllPageRowsSelected() && table.getIsSomePageRowsSelected()
                }
                onCheckedChange={(checked) => table.toggleAllPageRowsSelected(!!checked)}
                aria-label="Select All"
                className={"rounded-xs"}
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(checked) => row.toggleSelected(!!checked)}
                aria-label="Select Row"
                className={"rounded-xs"}
            />
        ),
        size: 40,
        enableSorting: false,
        enableHiding: false,
    });
}
