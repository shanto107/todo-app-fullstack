import {
    Task,
    NewTask,
    UpdateTaskPayload,
    TaskCounts,
    TaskQuery,
    PaginatedTasks,
} from "./tasks.types.js";
import { sanitizeText } from "../../utils/sanitize.js";
import { type TaskRepo } from "./tasks.repository.js";

export type TaskService = {
    addTask: (input: NewTask) => Promise<Task>;
    getTasks: (query: TaskQuery) => Promise<PaginatedTasks>;
    getTaskById: (id: string) => Promise<Task>;
    getTaskCounts: () => Promise<TaskCounts>;
    updateTask: (payload: UpdateTaskPayload) => Promise<Task>;
    deleteTask: (id: string) => Promise<Task>;
    restoreTask: (id: string) => Promise<Task>;
    // bulk actions
    bulkCompleteTasks(ids: string[]): Promise<number>;
    bulkActivateTasks(ids: string[]): Promise<number>;
    bulkDeleteTasks(ids: string[]): Promise<number>;
    bulkRestoreTasks(ids: string[]): Promise<number>;
    // bulkPermanentDeleteTasks(ids: string[]): Promise<number>;
};

export function createTaskService(repository: TaskRepo): TaskService {
    return {
        async addTask(input: NewTask): Promise<Task> {
            const { title, description, ...rest } = input;

            const newTask = await repository.addTask({
                title: sanitizeText("title", title),
                ...(description !== undefined && {
                    description: sanitizeText("description", description),
                }),
                ...rest,
            });
            return newTask;
        },

        async getTasks(query): Promise<PaginatedTasks> {
            const paginatedTasks = await repository.getTasks(query);
            return paginatedTasks;
        },

        async getTaskById(id: string): Promise<Task> {
            const task = await repository.getTaskById(id);
            return task;
        },

        async getTaskCounts(): Promise<TaskCounts> {
            return await repository.getTaskCounts();
        },

        async updateTask(payload: UpdateTaskPayload): Promise<Task> {
            const { title, description, ...rest } = payload;

            const updatedTask = await repository.updateTask({
                ...rest,
                ...(title !== undefined && {
                    title: sanitizeText("title", title),
                }),
                ...(description !== undefined && {
                    description: sanitizeText("description", description),
                }),
            } as UpdateTaskPayload);
            return updatedTask;
        },

        async deleteTask(id: string): Promise<Task> {
            return await repository.deleteTask(id);
        },

        async restoreTask(id: string): Promise<Task> {
            return await repository.restoreTask(id);
        },

        // bulk actions
        async bulkCompleteTasks(ids: string[]): Promise<number> {
            return await repository.bulkCompleteTasks(ids);
        },

        async bulkActivateTasks(ids: string[]): Promise<number> {
            return await repository.bulkActivateTasks(ids);
        },

        async bulkDeleteTasks(ids: string[]): Promise<number> {
            return await repository.bulkDeleteTasks(ids);
        },

        async bulkRestoreTasks(ids: string[]): Promise<number> {
            return await repository.bulkRestoreTasks(ids);
        },
    };
}
