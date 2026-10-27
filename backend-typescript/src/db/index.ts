import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import config from "../config.js";
import * as schema from "./schema/index.js";

export const connection = postgres(config.db.url);
export const db = drizzle(connection, { schema });

export type DB = typeof db;
