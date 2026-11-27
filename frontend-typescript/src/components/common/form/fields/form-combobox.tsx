import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox";

import { FormBase, type FormControlProps } from "../form-base";
import { useFieldContext } from "../hooks";
import { cn } from "@/lib/utils";

type ComboboxOption = {
    value: string;
    label: string;
};

type FormComboboxProps = FormControlProps & {
    options: ComboboxOption[];
    placeholder?: string;
    disabled?: boolean;
    labelClassName?: string;
    inputClassName?: string;
    listClassName?: string;
};

export function FromCombobox({
    options,
    placeholder,
    disabled = false,
    labelClassName,
    inputClassName,
    listClassName,
    ...props
}: FormComboboxProps) {
    const field = useFieldContext<string>();
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
    const selectedOption = options.find(
        (option) => option.value === field.state.value,
    );

    return (
        <FormBase {...props} labelClassName={labelClassName} variant="default">
            <Combobox
                items={options}
                value={selectedOption?.label ?? ""}
                onValueChange={(value) => {
                    field.handleChange(String(value ?? ""));
                }}
                disabled={disabled}
            >
                <ComboboxInput
                    placeholder={placeholder}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                    className={cn(inputClassName, "rounded-sm")}
                />

                <ComboboxContent className={"rounded-sm"}>
                    <ComboboxEmpty>Select your designation</ComboboxEmpty>
                    <ComboboxList>
                        {(option) => (
                            <ComboboxItem
                                key={option.value}
                                value={option.value}
                                className={cn(listClassName, "tracking-wide")}
                            >
                                {option.label}
                            </ComboboxItem>
                        )}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
        </FormBase>
    );
}
