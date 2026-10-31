export const authQueryKeys = {
    all: ["auth"] as const,
    signUp: () => [...authQueryKeys.all, "sign-up"] as const,
    designations: () => [...authQueryKeys.signUp(), "designations"] as const,
};
