import { MigrationConfig } from "drizzle-orm/migrator";

import loadEnvVariable from "./utils/load-env-variables.js";

type APIConfig = {
    port: number;
    platform: string;
};

type DBConfig = {
    url: string;
    migrationConfig: MigrationConfig;
};

type AuthConfig = {
    url: string;
    frontendUrl: string;
    secret: string;
};

type Config = {
    api: APIConfig;
    db: DBConfig;
    auth: AuthConfig;
};

const config: Config = {
    api: {
        port: +loadEnvVariable("PORT"),
        platform: loadEnvVariable("NODE_ENV"),
    },
    db: {
        url: loadEnvVariable("DB_URL"),
        migrationConfig: {
            migrationsFolder: "./src/db/migrations",
        },
    },
    auth: {
        url: loadEnvVariable("BETTER_AUTH_URL"),
        frontendUrl: loadEnvVariable("FRONTEND_URL"),
        secret: loadEnvVariable("BETTER_AUTH_SECRET"),
    },
};

export default config;
