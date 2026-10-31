import { useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { authClient } from "@/services/auth-client";

export function useBetterAuthLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const logoutLock = useRef(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    async function handleLogout() {
        if (logoutLock.current) return;

        logoutLock.current = true;
        setIsLoggingOut(true);

        try {
            const { error } = await authClient.signOut();
            if (error) {
                toast.error("Logout failed", {
                    description: error.message,
                });
                return;
            }
            queryClient.clear();
            toast.success("Successfully logged out!");
            void navigate("/sign-in", { replace: true });
        } catch (error) {
            console.error("Logout error:", error);

            toast.error("Logout failed", {
                description: "Something went wrong. Please try again.",
            });
        } finally {
            logoutLock.current = false;
            setIsLoggingOut(false);
        }
    }

    return { handleLogout, isLoggingOut };
}
