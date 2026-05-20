import { tasks } from "../../db/schema/tasks.js";

export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;

export type AtleastOne<T> = {
    [key in keyof T]-?: Required<Pick<T, key>> & Partial<Omit<T, key>>
}[keyof T];

export type UpdateTaskPayload = Pick<Task, "id"> & AtleastOne<Omit<Task, "id" | "createdAt" | "updatedAt">>;