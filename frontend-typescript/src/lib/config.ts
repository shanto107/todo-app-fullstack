import { loadEnvVariable } from "./environment-variables/loadEnvVariable";

export const config = {
    apiURL: loadEnvVariable("VITE_API_URL"),
    betterAuthUrl: loadEnvVariable("VITE_BETTER_AUTH_URL"),
    frontendUrl: loadEnvVariable("VITE_FRONTEND_URL"),
} as const;
