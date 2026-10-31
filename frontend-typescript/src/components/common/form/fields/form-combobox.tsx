import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox";
import { FormBase, type FormControlProps } from "../FormBase";
import { useFieldContext } from "../hooks";

type ComboboxOption = {
    value: string;
    label: string;
};

type FormComboboxProps = FormControlProps & {
    options: ComboboxOption[];
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    labelClassName?: string;
};

export function FromCombobox({
    options,
    placeholder,
    disabled = false,
    className,
    labelClassName,
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
                    className={"rounded-sm"}
                />

                <ComboboxContent className={"rounded-sm"}>
                    <ComboboxEmpty>Select your designation</ComboboxEmpty>
                    <ComboboxList>
                        {(option) => (
                            <ComboboxItem
                                key={option.value}
                                value={option.value}
                                className={"text-sm tracking-wider"}
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
