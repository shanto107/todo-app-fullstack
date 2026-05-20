import { afterEach, beforeAll, describe, expect, test } from "vitest";
import request from "supertest";
import type { Express } from "express";
import { getTestDb, clearTables } from "../setup/testDB.js";
import { createApp } from "../../src/app.js";
import { uuidv7 } from "uuidv7";
import { v4 as uuid } from "uuid";
import { createTasks } from "../helpers/taskFactory.js";


let app: Express;

beforeAll(async () => {
    const db = getTestDb();
    app = createApp(db);
});

afterEach(async () => {
    const db = getTestDb();
    await clearTables(db);
});

// checking POST /api/tasks

describe("POST /api/tasks", () => {

    test("create task with a title & body", async () => {
        // Arrange
        const requestBody = {
            title: "new task",
            description: "description"
        };
        const postEndpoint = "/api/tasks";
        // Apply
        const response = await request(app).post(postEndpoint).send(requestBody);
        // Assert
        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toMatchObject({
            id: expect.stringMatching(/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i),
            title: requestBody.title,
            description: requestBody.description,
            isCompleted: false
        });
    });

    test("create task with only title", async () => {
        // Arrange
        const requestBody = {
            title: "new task",
        };
        const expectedResponseBody = {
            title: "new task",
            description: "",
        }
        const postEndpoint = "/api/tasks";
        // Apply
        const response = await request(app).post(postEndpoint).send(requestBody);
        // Assert
        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toMatchObject({
            id: expect.stringMatching(/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i),
            title: expectedResponseBody.title,
            description: expectedResponseBody.description,
            isCompleted: false
        });
    });

    test("create task with only description", async () => {
        // Arrange
        const requestBody = {
            description: "description",
        };

        const postEndpoint = "/api/tasks";
        // Apply
        const response = await request(app).post(postEndpoint).send(requestBody);
        // Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("validation error");
        expect(response.body.errors).toBeDefined();
        expect(Array.isArray(response.body.errors)).toBe(true);
        expect(response.body.errors[0].field).toBe("title");
    });

    test("create task with too long title", async () => {
        // Arrange
        const requestBody = {
            title: "This is an intentionally very long title used for testing validation rules that enforce maximum length constraints. ".repeat(5),
            description: "description",
        };

        const postEndpoint = "/api/tasks";
        // Apply
        const response = await request(app).post(postEndpoint).send(requestBody);
        // Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("validation error");
        expect(response.body.errors).toBeDefined();
        expect(Array.isArray(response.body.errors)).toBe(true);
        expect(response.body.errors[0].field).toBe("title");
    });

    test("create task with too long description", async () => {
        // Arrange
        const requestBody = {
            title: "test title",
            description: "This is an intentionally very long description used for testing validation rules that enforce maximum length constraints. ".repeat(10)
        };

        const postEndpoint = "/api/tasks";
        // Apply
        const response = await request(app).post(postEndpoint).send(requestBody);
        // Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("validation error");
        expect(response.body.errors).toBeDefined();
        expect(Array.isArray(response.body.errors)).toBe(true);
        expect(response.body.errors[0].field).toBe("description");
    });

    test("create task with invalid tags in title", async () => {
        // Arrange
        const requestBody = {
            title: "<script>test title</script>",
            description: "description",
        };

        const postEndpoint = "/api/tasks";
        // Apply
        const response = await request(app).post(postEndpoint).send(requestBody);
        // Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Invalid Title!");
        expect(response.body.errors).toBeNull();
    });

    test("sanitize task title - 1 (removing dangerous tags)", async () => {
        // Arrange
        const requestBody = {
            title: "<script>invalid title</script> valid title",
            description: "description",
        };
        const expectedResponseBody = {
            title: "valid title",
            description: "description"
        }
        const postEndpoint = "/api/tasks";
        // Apply
        const response = await request(app).post(postEndpoint).send(requestBody);
        // Assert
        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toMatchObject({
            id: expect.stringMatching(/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i),
            title: expectedResponseBody.title,
            description: expectedResponseBody.description,
            isCompleted: false
        });
    });

    test("sanitize task title - 2 (removing invalid tags)", async () => {
        // Arrange
        const requestBody = {
            title: "<b>valid title</b>",
            description: "description",
        };
        const expectedResponseBody = {
            title: "valid title",
            description: "description"
        }
        const postEndpoint = "/api/tasks";
        // Apply
        const response = await request(app).post(postEndpoint).send(requestBody);
        // Assert
        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toMatchObject({
            id: expect.stringMatching(/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i),
            title: expectedResponseBody.title,
            description: expectedResponseBody.description,
            isCompleted: false
        });
    });

    test("sanitize task title - 3 (removing spaces)", async () => {
        // Arrange
        const requestBody = {
            title: "   this is    a integration \n\n test",
            description: "description",
        };
        const expectedResponseBody = {
            title: "this is a integration test",
            description: "description"
        }
        const postEndpoint = "/api/tasks";
        // Apply
        const response = await request(app).post(postEndpoint).send(requestBody);
        // Assert
        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toMatchObject({
            id: expect.stringMatching(/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i),
            title: expectedResponseBody.title,
            description: expectedResponseBody.description,
            isCompleted: false
        });
    });

    test("sanitize task description (removing dangerous & invalid tags, spaces)", async () => {
        // Arrange
        const requestBody = {
            title: "this is a integration test",
            description: "  sanitize   task   description <b>with</b>   dangerous <script>alert(1)</script>\ntags  ",
        };
        const expectedResponseBody = {
            title: "this is a integration test",
            description: "sanitize task description <b>with</b> dangerous \ntags"
        }
        const postEndpoint = "/api/tasks";
        // Apply
        const response = await request(app).post(postEndpoint).send(requestBody);
        // Assert
        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toMatchObject({
            id: expect.stringMatching(/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i),
            title: expectedResponseBody.title,
            description: expectedResponseBody.description,
            isCompleted: false
        });
    });
});

// checking GET /api/tasks
describe("GET /api/tasks", () => {

    test("Get all tasks", async () => {
        // Arrange
        const numberOfTasks = 5;
        await createTasks(app, numberOfTasks);
        const getEndpoint = "/api/tasks";
        // Apply
        const response = await request(app).get(getEndpoint);
        // Assert
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data).toHaveLength(numberOfTasks);
    });
});

// checking PUT /api/tasks/:id
describe("PUT /api/tasks", () => {

    test("update task - 1 (title, description, isCompleted)", async () => {
        // Arrange
        const numberOfTasks = 5;
        let postResponses = await createTasks(app, numberOfTasks);

        const taskIds = postResponses.map(response => response.body.data.id);
        const index = Math.floor(Math.random() * 5);
        const putEndpoint = `/api/tasks/${taskIds[index]}`;
        const requestBody = {
            title: "updated title",
            description: "updated description",
            isCompleted: true
        }
        // Apply
        const response = await request(app).put(putEndpoint).send(requestBody);
        // Assert
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toMatchObject({
            id: taskIds[index],
            title: requestBody.title,
            description: requestBody.description,
            isCompleted: true
        });
    });

    test("update task - 2 (only title)", async () => {
        // Arrange
        const numberOfTasks = 5;
        let postResponses = await createTasks(app, numberOfTasks);

        const taskIds = postResponses.map(response => response.body.data.id);
        const index = Math.floor(Math.random() * 5);
        const putEndpoint = `/api/tasks/${taskIds[index]}`;
        const requestBody = {
            title: "updated title"
        }
        // Apply
        const response = await request(app).put(putEndpoint).send(requestBody);
        // Assert
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toMatchObject({
            id: taskIds[index],
            title: requestBody.title,
            isCompleted: false
        });
    });

    test("update task - 3 (only description)", async () => {
        // Arrange
        const numberOfTasks = 5;
        let postResponses = await createTasks(app, numberOfTasks);

        const taskIds = postResponses.map(response => response.body.data.id);
        const index = Math.floor(Math.random() * 5);
        const putEndpoint = `/api/tasks/${taskIds[index]}`;
        const requestBody = {
            description: "updated description"
        }
        // Apply
        const response = await request(app).put(putEndpoint).send(requestBody);
        // Assert
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toMatchObject({
            id: taskIds[index],
            description: requestBody.description,
            isCompleted: false
        });
    });

    test("update task - 4 (only isCompleted)", async () => {
        // Arrange
        const numberOfTasks = 5;
        let postResponses = await createTasks(app, numberOfTasks);

        const taskIds = postResponses.map(response => response.body.data.id);
        const index = Math.floor(Math.random() * 5);
        const putEndpoint = `/api/tasks/${taskIds[index]}`;
        const requestBody = {
            isCompleted: true
        }
        // Apply
        const response = await request(app).put(putEndpoint).send(requestBody);
        // Assert
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toMatchObject({
            id: taskIds[index],
            isCompleted: true
        });
    });

    test("update task - 5 (invalid title)", async () => {
        // Arrange
        const numberOfTasks = 5;
        let postResponses = await createTasks(app, numberOfTasks);

        const taskIds = postResponses.map(response => response.body.data.id);
        const index = Math.floor(Math.random() * 5);
        const putEndpoint = `/api/tasks/${taskIds[index]}`;
        const requestBody = {
            title: ""
        }
        // Apply
        const response = await request(app).put(putEndpoint).send(requestBody);
        // Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("validation error");
        expect(response.body.errors).toBeDefined();
        expect(Array.isArray(response.body.errors)).toBe(true);
        expect(response.body.errors[0].field).toBe("title");
    });

    test("update task - 6 (invalid uuid)", async () => {
        // Arrange
        const numberOfTasks = 5;
        await createTasks(app, numberOfTasks);

        const invalidId = uuid();
        const putEndpoint = `/api/tasks/${invalidId}`;
        const requestBody = {
            title: "updated title"
        }
        // Apply
        const response = await request(app).put(putEndpoint).send(requestBody);
        // Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.errors).toBeDefined();
        expect(Array.isArray(response.body.errors)).toBe(true);
        expect(response.body.errors[0].field).toBe("id");
    });

    test("update task - 7 (uuid not in database)", async () => {
        // Arrange
        const numberOfTasks = 5;
        await createTasks(app, numberOfTasks);

        const invalidId = uuidv7();
        const putEndpoint = `/api/tasks/${invalidId}`;
        const requestBody = {
            title: "updated title"
        }
        // Apply
        const response = await request(app).put(putEndpoint).send(requestBody);
        // Assert
        expect(response.statusCode).toBe(404);
        expect(response.body.success).toBe(false);
        expect(response.body.errors).toBeNull();
    });
});

// checking Delete /api/tasks/:id
describe("DELETE /api/tasks/:id", () => {

    test("delete with valid id", async () => {
        // Arrange
        const numberOfTasks = 5;
        let postResponses = await createTasks(app, numberOfTasks);

        const taskIds = postResponses.map(response => response.body.data.id);
        const index = Math.floor(Math.random() * 5);
        const deleteEndpoint = `/api/tasks/${taskIds[index]}`;

        // Apply
        const response = await request(app).delete(deleteEndpoint);
        // Assert
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.id).toBe(taskIds[index]);
    });

    test("delete with invalid id", async () => {
        // Arrange
        const numberOfTasks = 5;
        await createTasks(app, numberOfTasks);

        const id = uuidv7();
        const deleteEndpoint = `/api/tasks/${id}`;

        // Apply
        const response = await request(app).delete(deleteEndpoint);
        // Assert
        expect(response.statusCode).toBe(404);
        expect(response.body.success).toBe(false);
        expect(response.body.errors).toBeNull();
    });
});
