import { Task, NewTask, UpdateTaskPayload } from "./tasks.types.js";
import { sanitizeText } from "../../utils/sanitize.js";
import { type TaskRepo } from "./tasks.repository.js";

export type TaskService = {
    addTask: (input: NewTask) => Promise<Task>;
    getAllTasks: () => Promise<Task[]>;
    updateTask: (payload: UpdateTaskPayload) => Promise<Task>;
    deleteTask: (id: string) => Promise<Task>
};

export function createTaskService(respository: TaskRepo): TaskService {

    return {
        async addTask(input: NewTask): Promise<Task> {
            const { title, description } = input;
        
            const newTask = await respository.addTask({
                title: sanitizeText("title", title),
                ...(description !== undefined && { description: sanitizeText("description", description) })
            });
            return newTask;
        },
        
        async getAllTasks(): Promise<Task[]> {
            const tasks = await respository.getAllTasks();
            return tasks;
        },
        
        async updateTask(payload: UpdateTaskPayload): Promise<Task> {
            const {title, description, ...rest} = payload;
        
            const updatedTask = await respository.updateTask({
                ...rest,
                ...(title !== undefined && { title: sanitizeText("title", title) }),
                ...(description !== undefined && { description: sanitizeText("description", description) })
            } as UpdateTaskPayload);
            return updatedTask;
        },
        
        async deleteTask(id: string): Promise<Task> {
            return await respository.deleteTask(id);
        }
    }
}


