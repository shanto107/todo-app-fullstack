import { Input } from "@/components/ui/input";
import { FormBase, type FormControlProps } from "../FormBase";
import { useFieldContext } from "../hooks";
import { cn } from "@/lib/utils";

type FormInputProps = FormControlProps & {
    placeholder?: string;
    variant: "default" | "bare";
    autoFocus?: boolean;
    className?: string;
    disabled?: boolean
}

export default function FormInput ({
    placeholder,
    variant,
    autoFocus,
    className,
    disabled=false,
    ...props
}: FormInputProps) {
    const field = useFieldContext<string>();
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

    return (
        <FormBase
            variant={variant}
            {...props}
        >
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
                        "border-none bg-transparent shadow-none px-0 text-base font-medium focus-visible:ring-0",
                    className
                )}
            />
        </FormBase>
    )
}