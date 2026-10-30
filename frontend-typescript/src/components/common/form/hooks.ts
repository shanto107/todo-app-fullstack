import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import { FormDatePicker } from "./fields/form-date-picker";
import FormInput from "./fields/form-input";
import { FormPopoverPicker } from "./fields/form-popover-picker";
import { FormSubmitButton } from "./fields/form-submit-button";
import { FormTextEditor } from "./fields/form-text-editor";

const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

const { useAppForm } = createFormHook({
    fieldComponents: {
        Input: FormInput,
        TextEditor: FormTextEditor,
        DatePicker: FormDatePicker,
        PopoverPicker: FormPopoverPicker,
    },
    formComponents: {
        SubmitButton: FormSubmitButton,
    },
    fieldContext,
    formContext,
});

export { useAppForm, useFieldContext, useFormContext };
