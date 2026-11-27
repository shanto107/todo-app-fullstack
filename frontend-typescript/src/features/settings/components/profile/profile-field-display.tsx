import { Button } from "@/components/ui/button";
import {
    LucidePencil,
} from "lucide-react";

type ProfileFieldDisplayProps = {
    label: string;
    value: string | null | undefined;
    onEdit?: () => void;
};

export function ProfileFieldDisplay({
    label,
    value,
    onEdit,
}: ProfileFieldDisplayProps) {
    return (
        <div className="flex min-w-0 flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
                <label className="text-foreground/70 text-xs font-semibold tracking-wider">
                    {label}
                </label>

                {onEdit && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-7 shrink-0"
                        onClick={onEdit}
                        aria-label={`Edit ${label}`}
                    >
                        <LucidePencil className="size-3.5" />
                    </Button>
                )}
            </div>

            <p className="text-xs font-semibold tracking-wide break-words">
                {value || "-"}
            </p>
        </div>
    );
}
