import { MigrationConfig } from "drizzle-orm/migrator";
import loadEnvVariable from "./utils/loadEnvVariable.js";

type APIConfig = {
    port: number;
    platform: string;
}

type DBConfig = {
    url: string;
    migrationConfig: MigrationConfig;
}

type Config = {
    api: APIConfig;
    db: DBConfig;
}

const config: Config = {
    api: {
        port: +loadEnvVariable("PORT"),
        platform: loadEnvVariable("NODE_ENV")
    },
    db: {
        url: loadEnvVariable("DB_URL"),
        migrationConfig: {
            migrationsFolder: "./src/db/migrations"
        }
    }
}

export default config;





