type EnvKey = keyof ImportMetaEnv;

export function loadEnvVariable<K extends EnvKey>(key: K): string {
    const value: unknown = import.meta.env[key];

    if (typeof value !== "string" || value.trim().length === 0) {
        throw new Error(`Missing environment variable: ${key}`);
    }

    return value;
}
