export const SUCCESS_CODES = {
    PROFILE_FETCHED: "PROFILE_FETCHED",
    PROFILE_UPDATED: "PROFILE_UPDATED",
    DESIGNATIONS_FETCHED: "DESIGNATIONS_FETCHED",
} as const;

export const successMessage = {
    getProfile: () => "Profile fetched successfully.",
    updateProfile: () => "Profile updated successfully.",
    getDesignations: () => "Designations fetched successfully.",
};
