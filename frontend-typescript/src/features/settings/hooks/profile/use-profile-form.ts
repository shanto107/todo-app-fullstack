import { toast } from "sonner";

import { useAppForm } from "@/components/common/form/hooks";
import { ApiError } from "@/lib/api/api-error";
import { authClient } from "@/services/auth-client";

import { PROFILE_EDITABLE_FIELDS } from "../../constants/profile.form";
import {
    createProfileFormMutationPayload,
    getDefaultProfileFormValues,
} from "../../helpers/profile/profile-form";
import { profileFormSchema } from "../../schemas/profile.schema";
import type { Profile } from "../../types/profile.types";
import { useUpdateProfile } from "./use-update-profile";

type UseProfileFormOptions = {
    onSuccess?: () => void;
};

export function useProfileForm(
    profile: Profile,
    options?: UseProfileFormOptions,
) {
    const updateProfileMutation = useUpdateProfile();
    const defaultValues = getDefaultProfileFormValues(profile);
    const { refetch } = authClient.useSession();

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
                await authClient.getSession({
                    query: {
                        disableCookieCache: true,
                    },
                });
                await refetch();
                formApi.reset(getDefaultProfileFormValues(updatedProfile));
                options?.onSuccess?.();
                toast.success("Profile Updated Successfully!");
            } catch (error) {
                if (!(error instanceof ApiError)) {
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
