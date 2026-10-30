import { PasswordInput } from "@/components/ui/password-input";
import { FormBase, type FormControlProps } from "../FormBase";
import { useFieldContext } from "../hooks";

type FormPasswordInputProps = FormControlProps & {
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    labelClassName?: string;
};

export function FormPasswordInput({
    placeholder,
    disabled = false,
    className,
    labelClassName,
    ...props
}: FormPasswordInputProps) {
    const field = useFieldContext<string>();
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

    return (
        <FormBase {...props} labelClassName={labelClassName}>
            <PasswordInput
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                aria-invalid={isInvalid}
                placeholder={placeholder}
                disabled={disabled}
                className={className}
            />
        </FormBase>
    );
}
