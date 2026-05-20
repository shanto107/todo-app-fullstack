import { PostgreSqlContainer, StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { sql } from "drizzle-orm";
import postgres from "postgres";
import * as schema from "../../src/db/schema/index.js";
import { type DB } from "../../src/db/index.js";
import config from "../../src/config.js";


let _db: DB | null = null;
let client: postgres.Sql | null = null; 
let container: StartedPostgreSqlContainer | null = null;

export async function createTestDb(): Promise<DB> {
    if (_db) return _db;

    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    const connection = container.getConnectionUri();

    const migrationClient = postgres(connection, { max: 1 });
    await migrate(drizzle(migrationClient), config.db.migrationConfig);
    await migrationClient.end();

    client = postgres(connection);
    _db = drizzle(client, { schema });
    return _db;
}

export function getTestDb(): DB {
    if(!_db) {
        throw new Error("Run createTestDb() function first!");
    }
    return _db;
}

export async function clearTables(db: DB) {
    await db.execute(sql`TRUNCATE TABLE tasks RESTART IDENTITY CASCADE`);
}

export async function closeTestDb() {
    if(!client) {
        throw new Error("Run createTestDb() function first!");
    }
    await client.end();
    client = null;

    if(!container) {
        throw new Error("Run createTestDb() function first!");
    }
    await container.stop();
    container = null;
    
    _db = null;
}

