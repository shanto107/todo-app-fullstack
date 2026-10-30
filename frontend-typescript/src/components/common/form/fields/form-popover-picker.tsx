import { Flag, type LucideIcon, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { FormBase, type FormControlProps } from "../FormBase";
import { useFieldContext } from "../hooks";

type PickerOption<T extends string> = {
    value: T;
    label: string;
    icon?: LucideIcon;
    color?: string;
};

type FormPopoverPickerProps<T extends string> = FormControlProps & {
    options: readonly PickerOption<T>[];
    disabled?: boolean;
    placeholder: string;
};

export function FormPopoverPicker<T extends string>({
    options,
    placeholder,
    disabled = false,
    ...props
}: FormPopoverPickerProps<T>) {
    const [openPopover, setOpenPopover] = useState(false);
    const field = useFieldContext<T | undefined>();
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

    const selectedOption = options.find((option) => option.value === field.state.value);
    const Icon = selectedOption?.icon;

    const trigger = (
        <Button
            type="button"
            id={field.name}
            variant={"ghost"}
            size={"sm"}
            disabled={disabled}
            onBlur={field.handleBlur}
            aria-invalid={isInvalid}
            className={"h-8 rounded-sm text-xs text-muted-foreground tracking-wide"}
        >
            {Icon ? (
                <Icon className={`size-3.5 mr-1 ${selectedOption?.color}`} />
            ) : (
                <Flag className={`size-3.5 mr-1`} />
            )}
            {<span className={selectedOption?.color}>{selectedOption?.label ?? placeholder}</span>}
        </Button>
    );

    const unselectTrigger = !disabled && selectedOption && (
        <Button
            type="button"
            variant={"ghost"}
            size={"sm"}
            className="size-6 rounded-sm text-muted-foreground hover:text-foreground"
            onClick={(e) => {
                e.stopPropagation();
                field.handleChange(undefined);
            }}
            aria-label={`Clear ${placeholder}`}
        >
            <X className="size-3.5" />
        </Button>
    );

    const content = options.map((option) => (
        <Button
            key={option.value}
            type="button"
            variant={"ghost"}
            disabled={disabled}
            onClick={() => {
                field.handleChange(option.value);
                setOpenPopover(false);
            }}
            className={`rounded-sm justify-start text-xs tracking-wide ${option.color}`}
        >
            {option.icon && <option.icon className={`size-3.5 mr-1 ${option?.color}`} />}
            {<span className={option.color}>{option.label}</span>}
        </Button>
    ));

    return (
        <FormBase {...props} variant={"compact"}>
            <div className="flex items-center rounded-sm border bg-background dark:bg-input/30">
                <Popover
                    open={!disabled ? openPopover : false}
                    onOpenChange={(open) => {
                        if (!disabled) {
                            setOpenPopover(open);
                        }
                    }}
                >
                    <PopoverTrigger render={trigger} />

                    <PopoverContent className="w-full p-0 rounded-sm" align="start">
                        <div className="flex flex-col">{content}</div>
                    </PopoverContent>
                </Popover>
                {unselectTrigger}
            </div>
        </FormBase>
    );
}
