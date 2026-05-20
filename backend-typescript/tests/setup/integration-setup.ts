import { afterAll } from "vitest";
import { closeTestDb, createTestDb } from "./testDB.js";

export default async function globalSetup() {
    await createTestDb();
}

await globalSetup();

afterAll(async () => {
    await closeTestDb();
});