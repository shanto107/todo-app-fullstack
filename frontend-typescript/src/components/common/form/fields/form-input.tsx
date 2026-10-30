import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { FormBase, type FormControlProps } from "../FormBase";
import { useFieldContext } from "../hooks";

type FormInputProps = FormControlProps & {
    placeholder?: string;
    variant: "default" | "bare";
    autoFocus?: boolean;
    className?: string;
    labelClassName?: string;
    disabled?: boolean;
};

export function FormInput({
    placeholder,
    variant,
    autoFocus,
    className,
    labelClassName,
    disabled = false,
    ...props
}: FormInputProps) {
    const field = useFieldContext<string>();
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

    return (
        <FormBase variant={variant} {...props} labelClassName={labelClassName}>
            <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                aria-invalid={isInvalid}
                placeholder={placeholder}
                autoFocus={autoFocus}
                disabled={disabled}
                className={cn(
                    variant === "bare" &&
                        "border-none bg-transparent px-0 text-base font-medium shadow-none focus-visible:ring-0",
                    className,
                )}
            />
        </FormBase>
    );
}
