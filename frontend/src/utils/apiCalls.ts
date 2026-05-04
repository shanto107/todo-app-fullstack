import { z } from "zod";

export const TaskSchema = z.object({
    id: z.number(),
    description: z.string(),
    created_at: z.iso.datetime(),
    is_completed: z.boolean()
});

export const TaskArraySchema = z.array(TaskSchema);
export type Task = z.infer<typeof TaskSchema>;

export async function getTasks(): Promise<Task[]> {
    const base_URL = import.meta.env.VITE_API_URL || "";
    const result = await fetch(`${base_URL}/api/tasks`);
    if (!result.ok) {
        throw new Error(`[${result.status}] ${result.statusText}: Failed to fetch tasks.`);
    }
    const data = await result.json();
    return TaskArraySchema.parse(data);
}

export async function updateTask(id: number, payload: boolean): Promise<Task> {
    const base_URL = import.meta.env.VITE_API_URL || "";
    const result = await fetch(`${base_URL}/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            is_completed: payload
        })
    });
    if (!result.ok) {
        throw new Error(`[${result.status}] ${result.statusText}: Failed to update task ${id}`);
    }
    const data = await result.json();
    return TaskSchema.parse(data);
}

export async function addTask(payload: string): Promise<Task> {
    const base_URL = import.meta.env.VITE_API_URL || "";
    const result = await fetch(`${base_URL}/api/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            description: payload,
            is_completed: false
        })
    });
    if (!result.ok) {
        throw new Error(`[${result.status}] ${result.statusText}: Failed to add task`);
    }
    const data = await result.json();
    return TaskSchema.parse(data);
}

export async function deleteTask(id: number): Promise<void> {
    const base_URL = import.meta.env.VITE_API_URL || "";
    const result = await fetch(`${base_URL}/api/tasks/${id}`, { method: "DELETE" });
    if (!result.ok) {
        throw new Error(`[${result.status}] ${result.statusText}: Failed to delete task ${id}`);
    }
}