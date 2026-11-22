export const profileQueryKeys = {
    all: ["settings", "profile"] as const,
    me: () => [...profileQueryKeys.all, "me"] as const,
    designations: () => [...profileQueryKeys.all, "designations"] as const,
};
