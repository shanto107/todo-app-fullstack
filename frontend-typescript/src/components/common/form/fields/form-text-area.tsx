import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import { FormBase, type FormControlProps } from "../form-base";
import { useFieldContext } from "../hooks";

type FormTextareaProps = FormControlProps & {
    placeholder?: string;
    variant: "default" | "bare" | "compact";
    className?: string;
    disabled?: boolean;
    rows?: number;
    maxLength?: number;
    labelClassName?: string;
};

export function FormTextarea({
    placeholder,
    variant,
    className,
    disabled = false,
    rows = 4,
    maxLength,
    labelClassName,
    ...props
}: FormTextareaProps) {
    const field = useFieldContext<string>();

    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

    return (
        <FormBase variant={variant} {...props} labelClassName={labelClassName}>
            <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                placeholder={placeholder}
                disabled={disabled}
                rows={rows}
                maxLength={maxLength}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                aria-invalid={isInvalid}
                className={cn("resize-none", className)}
            />
        </FormBase>
    );
}
