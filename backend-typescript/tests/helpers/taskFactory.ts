import { type Express } from "express";
import request from "supertest";

export async function createTasks(app: Express, numberOfTasks: number) {
    const postEndpoint = "/api/tasks";
    const responses = await Promise.all(
        Array.from({ length: numberOfTasks }, (_, index) => {
            let requestBody = {
                title: `title ${index + 1}`,
                description: `description ${index + 1}`
            }
            return request(app).post(postEndpoint).send(requestBody);
        })
    );
    return responses;
}