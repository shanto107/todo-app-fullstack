import type { ReactNode } from "react";

import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldLabel,
} from "@/components/ui/field";

import { useFieldContext } from "./hooks";

export type FormControlProps = {
    label?: string;
    description?: string;
};

type FormBaseProps = FormControlProps & {
    horizontal?: boolean;
    childrenFirst?: boolean;
    variant?: "default" | "bare" | "compact";
    children: ReactNode;
};

export function FormBase({
    label,
    description,
    horizontal,
    childrenFirst,
    variant,
    children,
}: FormBaseProps) {
    const field = useFieldContext();
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

    const labelElement = label ? (
        <>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            {description && <FieldDescription>{description}</FieldDescription>}
        </>
    ) : null;

    const errorElement = isInvalid && <FieldError errors={field.state.meta.errors} />;

    if (variant === "bare") {
        return (
            <div data-invalid={isInvalid} className="flex flex-col gap-1">
                {children}
                {errorElement}
            </div>
        );
    }

    if (variant === "compact") {
        return (
            <div data-invalid={isInvalid} className="inline-flex flex-col gap-1">
                {children}
                {errorElement}
            </div>
        );
    }

    return (
        <Field data-invalid={isInvalid} orientation={horizontal ? "horizontal" : undefined}>
            {childrenFirst ? (
                <>
                    {children}
                    <FieldContent>
                        {labelElement}
                        {errorElement}
                    </FieldContent>
                </>
            ) : (
                <>
                    <FieldContent>{labelElement}</FieldContent>
                    {children}
                    {errorElement}
                </>
            )}
        </Field>
    );
}
