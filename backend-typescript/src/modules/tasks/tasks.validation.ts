import { z } from "zod";

export const idInParamsSchema = z.object({
    id: z.uuidv7()
});

export const createTaskSchema = z.object({
    title: z.string().trim().min(1, "Title is required!").max(256, "Title too long!"),
    description: z.string().trim().max(1000, "Description too long!").optional()
});

export const updateTaskSchema = z.object({
    title: z.string().trim().min(1, "Title is required!").max(256, "Title too long!").optional(),
    description: z.string().trim().min(1).max(1000, "Description too long!").optional(),
    isCompleted: z.boolean().optional()
}).refine(
    (task) => Object.values(task).some((value) => value !== undefined),
    {
        message: "there's nothing to update!",
        path: ["root"]
    }
);