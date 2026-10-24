import { z } from "zod";

export const TASK_PRIORITIES = ["low", "medium", "high", "urgent"] as const;
export const TASK_STATUS = ["todo", "in_progress", "done", "cancelled"] as const;

export const addTaskSchema = z.object({
    title: z
        .string()
        .min(10, "task title should have atleast 10 characters!")
        .max(200, "task title cannot have more than 200 characters"),
    description: z
        .string()
        .max(2000, "description is too long!")
        .optional(),
    deadline: z.date().optional(),
    priority: z.enum(TASK_PRIORITIES).optional(),
});

export type AddTaskForm = z.infer<typeof addTaskSchema>;