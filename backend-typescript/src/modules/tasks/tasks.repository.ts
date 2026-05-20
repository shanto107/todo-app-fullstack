import { desc, eq } from "drizzle-orm";
import { type DB } from "../../db/index.js";
import { tasks } from "../../db/schema/tasks.js";
import { Task, NewTask, type UpdateTaskPayload } from "./tasks.types.js";
import { NotFoundError } from "../../middlewares/errorHandler.js";

export type TaskRepo = {
    addTask: (newTask: NewTask) => Promise<Task>;
    getAllTasks: () => Promise<Task[]>;
    updateTask: (payload: UpdateTaskPayload) => Promise<Task>;
    deleteTask: (id: string) => Promise<Task>
}

export function createTaskRepo(db: DB): TaskRepo {

    return {
        async addTask(newTask: NewTask): Promise<Task> {
            const [result] = await db.insert(tasks).values(newTask).returning();
            if (!result) {
                throw new Error("Failed to create new Task! Please try again!")
            }
            return result;
        },
        
        async getAllTasks(): Promise<Task[]> {
            const result = await db.select().from(tasks).orderBy(desc(tasks.createdAt));
            return result;
        },
        
        async updateTask(payload: UpdateTaskPayload): Promise<Task> {
            const { id, ...updates } = payload;
            const [result] = await db.update(tasks).set(updates).where(eq(tasks.id, id)).returning();
            if (!result) {
                throw new NotFoundError(`Task with id [${id}] not found!`);
            }
            return result;
        },
        
        async deleteTask(id: string): Promise<Task> {
            const [result] = await db.delete(tasks).where(eq(tasks.id, id)).returning();
            if (!result) {
                throw new NotFoundError(`Task with id [${id}] not found!`);
            }
            return result;
        }
    }
}
