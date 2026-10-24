import z from "zod";

export const taskCountsSchema = z.object({
    inbox: z.number().nonnegative(),
    today: z.number().nonnegative(),
    upcoming: z.number().nonnegative(),
    completed: z.number().nonnegative(),
    deleted: z.number().nonnegative(),
});
