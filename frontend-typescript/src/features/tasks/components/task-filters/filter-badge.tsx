import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type FilterBadgeProps = {
    label: string;
    handleClear: () => void;
}
export default function FilterBadge({
    label,
    handleClear
}: FilterBadgeProps) {
    return (
        <span className="inline-flex items-center rounded-sm border pl-3 text-xs">
            {
                label
            }
            <Button
                type="button"
                variant={"ghost"}
                onClick={handleClear}
                className={"rounded-sm"}
                aria-label={`Clear ${label}`}
            >
                <X className="size-3" />
            </Button>
        </span>
    )
}