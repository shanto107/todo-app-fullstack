import { describe, expect, test, vi } from "vitest";
import { createTaskService } from "../../../../src/modules/tasks/tasks.service.js";
import { UpdateTaskPayload, type NewTask } from "../../../../src/modules/tasks/tasks.types.js";
import { makeMockTask, makeMockTaskRepo } from "../../../helpers/taskMocks.js";
import * as sanitizeModule from "../../../../src/utils/sanitize.js";
import { uuidv7 } from "uuidv7";

// taskService.addTask()
describe("taskService.addTask()", () => {
    test("1. calls with sanitized title", async () => {
        // Arrange
        const resolvedTask = makeMockTask({
            title: "test title !"
        });
        const repository = makeMockTaskRepo({
            addTask: vi.fn().mockResolvedValue(resolvedTask)
        });
        const input: NewTask = {
            title: "test    title        !"
        }
        const repositoryInput: NewTask = {
            title: "test title !"
        }
        // Apply
        const service = createTaskService(repository);
        const result = await service.addTask(input);
        // Assert
        expect(repository.addTask).toHaveBeenCalledWith(repositoryInput);
        expect(repository.addTask).toHaveBeenCalledTimes(1);
        expect(result).toEqual(resolvedTask);
    });

    test("2. calls with sanitized title & descripton", async () => {
        // Arrange
        const resolvedTask = makeMockTask({
            title: "test title !",
            description: "test description !"
        });
        const repository = makeMockTaskRepo({
            addTask: vi.fn().mockResolvedValue(resolvedTask)
        });
        const input: NewTask = {
            title: "test    title        !",
            description: " test       description           ! "
        }
        const repositoryInput: NewTask = {
            title: "test title !",
            description: "test description !"
        }
        // Apply
        const service = createTaskService(repository);
        const result = await service.addTask(input);
        // Assert
        expect(repository.addTask).toHaveBeenCalledWith(repositoryInput);
        expect(repository.addTask).toHaveBeenCalledTimes(1);
        expect(result).toEqual(resolvedTask);
    });

    test("3. calls with sanitized title & descripton with tags", async () => {
        // Arrange
        const resolvedTask = makeMockTask({
            title: "test title !",
            description: "test <b>description</b> !"
        });
        const repository = makeMockTaskRepo({
            addTask: vi.fn().mockResolvedValue(resolvedTask)
        });
        const input: NewTask = {
            title: "test    <b>title</b>   <script>alert(1)</script>     !",
            description: " test       <b>description</b>           ! "
        }
        const repositoryInput: NewTask = {
            title: "test title !",
            description: "test <b>description</b> !"
        }
        // Apply
        const service = createTaskService(repository);
        const result = await service.addTask(input);
        // Assert
        expect(repository.addTask).toHaveBeenCalledWith(repositoryInput);
        expect(repository.addTask).toHaveBeenCalledTimes(1);
        expect(result).toEqual(resolvedTask);
    });

    test("4. throws errors for invalid title!", async () => {
        // Arrange
        const sanitizeTextSpy = vi.spyOn(sanitizeModule, "sanitizeText");
        const repository = makeMockTaskRepo();
        const input: NewTask = {
            title: "<script>no title</script>",
        }
        // Apply
        const service = createTaskService(repository);
        const result = service.addTask(input);
        // Assert
        expect(result).rejects.toThrow("Invalid Title!");
        expect(sanitizeTextSpy).toHaveBeenCalledWith("title", input.title);
        expect(sanitizeTextSpy).toHaveBeenCalledTimes(1);
        expect(repository.addTask).not.toHaveBeenCalled();
    });

    test("5. throws errors for long title!", async () => {
        // Arrange
        const sanitizeTextSpy = vi.spyOn(sanitizeModule, "sanitizeText");
        const repository = makeMockTaskRepo();
        const input: NewTask = {
            title: "This is an intentionally very long title used for testing validation rules that enforce maximum length constraints. ".repeat(5),
        }
        // Apply
        const service = createTaskService(repository);
        const result = service.addTask(input);
        // Assert
        expect(result).rejects.toThrow("Title too long!");
        expect(sanitizeTextSpy).toHaveBeenCalledWith("title", input.title);
        expect(sanitizeTextSpy).toHaveBeenCalledTimes(1);
        expect(repository.addTask).not.toHaveBeenCalled();
    });

    test("6. throws errors for long description!", async () => {
        // Arrange
        const sanitizeTextSpy = vi.spyOn(sanitizeModule, "sanitizeText");
        const repository = makeMockTaskRepo();
        const input: NewTask = {
            title: "test title!",
            description: "This is an intentionally very long title used for testing validation rules that enforce maximum length constraints. ".repeat(10),
        }
        // Apply
        const service = createTaskService(repository);
        const result = service.addTask(input);
        // Assert
        expect(result).rejects.toThrow("Description too long!");
        expect(sanitizeTextSpy).toHaveBeenCalledWith("title", input.title);
        expect(sanitizeTextSpy).toHaveBeenCalledWith("description", input.description);
        expect(sanitizeTextSpy).toHaveBeenCalledTimes(2);
        expect(repository.addTask).not.toHaveBeenCalled();
    });
});

// taskService.updateTask()
describe("taskService.updateTask()", () => {

    test("1. update and sanitize title - 1", async () => {
        // Arrange
        const id = uuidv7();
        const resolvedTask = makeMockTask({
            id: id,
            title: "updated title !"
        });
        const repository = makeMockTaskRepo({
            updateTask: vi.fn((payload: UpdateTaskPayload) => Promise.resolve(resolvedTask)),
        });
        const payload: UpdateTaskPayload = {
            id: id,
            title: "updated    <b>title</b>        !"
        }
        const repositoryInput: UpdateTaskPayload = {
            id: id,
            title: "updated title !"
        }
        // Apply
        const service = createTaskService(repository);
        const result = await service.updateTask(payload);
        // Assert
        expect(repository.updateTask).toHaveBeenCalledWith(repositoryInput);
        expect(repository.updateTask).toHaveBeenCalledTimes(1);
        expect(result).toEqual(resolvedTask);
    });

    test("2. update and sanitize title - 2", async () => {
        // Arrange
        const id = uuidv7();
        const resolvedTask = makeMockTask({
            id: id,
            title: "updated title !"
        });
        const repository = makeMockTaskRepo({
            updateTask: vi.fn((payload: UpdateTaskPayload) => Promise.resolve(resolvedTask)),
        });
        const payload: UpdateTaskPayload = {
            id: id,
            title: "<script>alert(1)</script> updated    <b>title</b>        !"
        }
        const repositoryInput: UpdateTaskPayload = {
            id: id,
            title: "updated title !"
        }
        // Apply
        const service = createTaskService(repository);
        const result = await service.updateTask(payload);
        // Assert
        expect(repository.updateTask).toHaveBeenCalledWith(repositoryInput);
        expect(repository.updateTask).toHaveBeenCalledTimes(1);
        expect(result).toEqual(resolvedTask);
    });

    test("3. update and sanitize description", async () => {
        // Arrange
        const id = uuidv7();
        const resolvedTask = makeMockTask({
            id: id,
            title: "updated <b>description</b> !"
        });
        const repository = makeMockTaskRepo({
            updateTask: vi.fn((payload: UpdateTaskPayload) => Promise.resolve(resolvedTask)),
        });
        const payload: UpdateTaskPayload = {
            id: id,
            description: "updated <b>description</b> <script>alert(1)</script> !"
        }
        const repositoryInput: UpdateTaskPayload = {
            id: id,
            description: "updated <b>description</b> !"
        }
        // Apply
        const service = createTaskService(repository);
        const result = await service.updateTask(payload);
        // Assert
        expect(repository.updateTask).toHaveBeenCalledWith(repositoryInput);
        expect(repository.updateTask).toHaveBeenCalledTimes(1);
        expect(result).toEqual(resolvedTask);
    });

    test("4. update isCompleted", async () => {
        // Arrange
        const id = uuidv7();
        const resolvedTask = makeMockTask({
            id: id,
            isCompleted: true
        });
        const repository = makeMockTaskRepo({
            updateTask: vi.fn((payload: UpdateTaskPayload) => Promise.resolve(resolvedTask)),
        });
        const payload: UpdateTaskPayload = {
            id: id,
            isCompleted: true
        }
        const repositoryInput: UpdateTaskPayload = {
            id: id,
            isCompleted: true
        }
        // Apply
        const service = createTaskService(repository);
        const result = await service.updateTask(payload);
        // Assert
        expect(repository.updateTask).toHaveBeenCalledWith(repositoryInput);
        expect(repository.updateTask).toHaveBeenCalledTimes(1);
        expect(result).toEqual(resolvedTask);
    });

    test("5. throws errors for invalid title update!", async () => {
        // Arrange
        const sanitizeTextSpy = vi.spyOn(sanitizeModule, "sanitizeText");
        const id = uuidv7();
        const repository = makeMockTaskRepo();
        const payload: UpdateTaskPayload = {
            id: id,
            title: "<script>no title</script>",
        }
        // Apply
        const service = createTaskService(repository);
        const result = service.updateTask(payload);
        // Assert
        expect(result).rejects.toThrow("Invalid Title!");
        expect(sanitizeTextSpy).toHaveBeenCalledWith("title", payload.title);
        expect(sanitizeTextSpy).toHaveBeenCalledTimes(1);
        expect(repository.addTask).not.toHaveBeenCalled();
    });

    test("6. throws errors for long description update!", async () => {
        // Arrange
        const sanitizeTextSpy = vi.spyOn(sanitizeModule, "sanitizeText");
        const id = uuidv7();
        const repository = makeMockTaskRepo();
        const payload: UpdateTaskPayload = {
            id: id,
            title: "<script>alert(1)</script> updated title!",
            description: "This is an intentionally very long title used for testing validation rules that enforce maximum length constraints. ".repeat(10),
        }
        // Apply
        const service = createTaskService(repository);
        const result = service.updateTask(payload);
        // Assert
        expect(result).rejects.toThrow("Description too long!");
        expect(sanitizeTextSpy).toHaveBeenCalledWith("title", payload.title);
        expect(sanitizeTextSpy).toHaveBeenCalledWith("description", payload.description);
        expect(sanitizeTextSpy).toHaveBeenCalledTimes(2);
        expect(repository.addTask).not.toHaveBeenCalled();
    });
});