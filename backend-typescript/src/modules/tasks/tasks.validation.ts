import { z } from "zod";

export const taskPriorityValues = ["low", "medium", "high", "urgent"] as const;
export const taskStatusValues = ["todo", "in_progress", "done", "cancelled"] as const;
export const sortBy = [ "createdAt", "updatedAt", "deletedAt", "deadline"] as const;
export const sortDirection = ["asc", "dsc"] as const;

export const idInParamsSchema = z.object({
    id: z.uuidv7()
});

export const createTaskSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required!")
        .max(256, "Title too long!"),
    description: z
        .string()
        .trim()
        .max(1000, "Description too long!")
        .optional(),
    priority: z
        .enum(taskPriorityValues, "invalid priority value!")
        .optional(),
    deadline: z
        .coerce
        .date()
        .optional()
});

export const updateTaskSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required!")
        .max(256, "Title too long!")
        .optional(),
    description: z
        .string()
        .trim()
        .min(1)
        .max(5000, "Description too long!")
        .optional(),
    deadline: z.coerce
        .date()
        .optional(),
    priority: z
        .enum(taskPriorityValues, "invalid priority value!")
        .optional(),
    status: z
        .enum(taskStatusValues, "invalid task status value!")
        .optional()
}).refine(
    (task) => Object.values(task).some((value) => value !== undefined),
    {
        message: "there's nothing to update!",
        path: ["root"]
    }
);

export const getTaskSchema = z.object({
    search: z
        .string()
        .trim()
        .min(1)
        .max(200)
        .optional(),
    status: z
        .string()
        .optional()
        .transform(value => value?.split(","))
        .pipe(z.array(z.enum(taskStatusValues, "invalid status value")).optional()),
    priority: z
        .enum(taskPriorityValues, "invalid priority value!")
        .optional(),
    deleted: z.coerce
        .boolean()
        .optional(),
    deadlineFrom: z
        .iso
        .date()
        .optional(),
    deadlineTo: z
        .iso
        .date()
        .optional(),
    sortBy: z
        .enum(sortBy)
        .optional(),
    sortDirection: z
        .enum(sortDirection)
        .optional(),
    page: z.coerce
        .number()
        .int()
        .min(1)
        .optional(),
    limit: z.coerce
        .number()
        .int()
        .min(1)
        .max(10)
        .optional()
});

export const bulkTaskActionSchema = z.object({
    ids: z
        .array(z.uuid())
        .min(1),
});
