import { z } from "zod";
import { TASK_PRIORITIES, TASK_STATUS } from "./add-task-schema";

export const updateTaskRequestSchema = z.object({
    id: z.string().uuid("Invalid user ID!"),
    title: z
        .string()
        .min(10, "task title should have atleast 10 characters!")
        .max(200, "task title cannot have more than 200 characters")
        .optional(),
    description: z
        .string()
        .max(2000, "description is too long!")
        .optional(),
    deadline: z.date().optional(),
    priority: z.enum(TASK_PRIORITIES).optional().optional(),
    status: z.enum(TASK_STATUS).optional()
});

export const updateTaskFormSchema = z.object({
    id: z.string().uuid("Invalid user ID!"),
    title: z
        .string()
        .min(10, "task title should have atleast 10 characters!")
        .max(200, "task title cannot have more than 200 characters"),
    description: z
        .string()
        .max(2000, "description is too long!"),
    deadline: z.union([z.date(), z.undefined()]),
    priority: z.union([z.enum(TASK_PRIORITIES), z.undefined()]),
    status: z.enum(TASK_STATUS)
});

export type UpdateTaskRequest = z.infer<typeof updateTaskRequestSchema>;
export type UpdateTaskForm = z.infer<typeof updateTaskFormSchema>