import dateToString from "@/lib/helpers/format-date/date-to-string";
import stringToDate from "@/lib/helpers/format-date/string-to-date";

import type {
    DirtyFields,
    Profile,
    ProfileFormValues,
    UpdateProfilePayload,
} from "../../types/profile.types";

export function getDefaultProfileFormValues(
    profile: Profile,
): ProfileFormValues {
    let dateOfBirth: Date | undefined;

    if (profile.dateOfBirth) {
        dateOfBirth = stringToDate(profile.dateOfBirth);
    }

    return {
        name: profile.name,
        mobileNumber: profile.mobileNumber ?? "",
        designationId: profile.designationId ?? "",
        homeAddress: profile.homeAddress ?? "",
        dateOfBirth,
    };
}

export function createProfileFormMutationPayload(
    value: ProfileFormValues,
    dirtyFields: DirtyFields,
): UpdateProfilePayload {
    return Object.fromEntries(
        dirtyFields.map((field) => {
            switch (field) {
                case "designationId":
                    return [field, value.designationId || null];

                case "dateOfBirth":
                    return [
                        field,
                        value.dateOfBirth
                            ? dateToString(value.dateOfBirth)
                            : null,
                    ];

                case "homeAddress":
                    return [field, value.homeAddress || null];

                default:
                    return [field, value[field]];
            }
        }),
    );
}
