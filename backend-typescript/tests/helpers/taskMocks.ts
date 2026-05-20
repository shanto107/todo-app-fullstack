import { vi } from "vitest";
import { type TaskRepo } from "../../src/modules/tasks/tasks.repository.js";
import { type Task } from "../../src/modules/tasks/tasks.types.js";
import { uuidv7 } from "uuidv7";

export function makeMockTask(overrides: Partial<Task> = {}): Task {
    return {
        id: uuidv7(),
        createdAt: new Date(),
        updatedAt: new Date(),
        title: "default title",
        description: "",
        isCompleted: false,
        ...overrides
    }
}

export function makeMockTaskRepo(overrides: Partial<TaskRepo> = {}): TaskRepo {
    const defaultTask = makeMockTask();
    return {
        addTask: vi.fn().mockResolvedValue(defaultTask),
        getAllTasks: vi.fn().mockResolvedValue([defaultTask]),
        updateTask: vi.fn().mockResolvedValue(defaultTask),
        deleteTask: vi.fn().mockResolvedValue(defaultTask),
        ...overrides
    }
}