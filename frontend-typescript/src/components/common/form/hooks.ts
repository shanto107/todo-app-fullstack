import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import { FormAuthSubmitButton } from "./fields/form-auth-submit-button";
import { FormDatePicker } from "./fields/form-date-picker";
import { FormInput } from "./fields/form-input";
import { FormPasswordInput } from "./fields/form-password-input";
import { FormPopoverPicker } from "./fields/form-popover-picker";
import { FormSubmitButton } from "./fields/form-submit-button";
import { FormTextEditor } from "./fields/form-text-editor";

const { fieldContext, formContext, useFieldContext, useFormContext } =
    createFormHookContexts();

const { useAppForm } = createFormHook({
    fieldComponents: {
        Input: FormInput,
        TextEditor: FormTextEditor,
        DatePicker: FormDatePicker,
        PopoverPicker: FormPopoverPicker,
        PasswordInput: FormPasswordInput,
    },
    formComponents: {
        SubmitButton: FormSubmitButton,
        AuthSubmitButton: FormAuthSubmitButton,
    },
    fieldContext,
    formContext,
});

export { useAppForm, useFieldContext, useFormContext };
