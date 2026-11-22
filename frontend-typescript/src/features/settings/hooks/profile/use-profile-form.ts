import { toast } from "sonner";

import { useAppForm } from "@/components/common/form/hooks";
import { ApiError } from "@/lib/api/api-error";

import { PROFILE_EDITABLE_FIELDS } from "../../constants/profile.form";
import {
    createProfileFormMutationPayload,
    getDefaultProfileFormValues,
} from "../../helpers/profile/profile-form";
import { profileFormSchema } from "../../schemas/profile.schema";
import type { Profile } from "../../types/profile.types";
import { useUpdateProfile } from "./use-update-profile";

export function useProfileForm(profile: Profile) {
    const updateProfileMutation = useUpdateProfile();
    const defaultValues = getDefaultProfileFormValues(profile);

    const form = useAppForm({
        defaultValues,

        validators: {
            onSubmit: profileFormSchema,
        },

        onSubmit: async ({ value, formApi }) => {
            const dirtyFields = PROFILE_EDITABLE_FIELDS.filter(
                (field) => formApi.getFieldMeta(field)?.isDirty,
            );

            if (dirtyFields.length === 0) return;

            const payload = createProfileFormMutationPayload(
                value,
                dirtyFields,
            );

            try {
                const updatedProfile =
                    await updateProfileMutation.mutateAsync(payload);
                formApi.reset(getDefaultProfileFormValues(updatedProfile));
                toast.success("Profile Updated Successfully!");
            } catch (error) {
                if (error instanceof ApiError) {
                    toast.error(error.message);
                } else {
                    toast.error("Failed to update profile. Please try again.");
                }
            }
        },
    });

    return {
        form,
        updateProfileMutation,
    };
}
