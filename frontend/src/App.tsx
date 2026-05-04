import React, { FormEvent } from "react";
import InputField from "./components/InputField.tsx";
import Heading from "./components/Heading.tsx";
import TaskCard from "./components/TaskCard.tsx";
import { getTasks, updateTask, addTask, deleteTask, Task } from "./utils/apiCalls.ts";
import { ZodError } from "zod";

export default function App() {
    const [tasks, setTasks] = React.useState<Task[]>([]);
    const [input, setInput] = React.useState<string>("");

    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<AppError | null>(null);

    type AppError = {
        type: "schema" | "network" | "http" | "other";
        message: string;
    }

    function handleError(err: unknown): AppError {
        console.log(err);
        if (err instanceof ZodError) {
            return {
                type: "schema",
                message: "Invalid response from the server."
            }
        }
        if (err instanceof TypeError) {
            return {
                type: "network",
                message: "Something went wrong! Please check the network connections"
            }
        }
        if (err instanceof Error) {
            return {
                type: "http",
                message: err.message
            }
        }
        return {
            type: "other",
            message: "Something went wrong!"
        }
    }

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const result = await getTasks();
                setTasks(result);
            }
            catch (err) {
                setError(handleError(err));
            }
            finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    async function handleChecked(id: number) {
        setLoading(true);
        setError(null);

        try {
            const currentTask = tasks.find((task) => task.id === id);
            if (!currentTask) return;
            const payload = !currentTask.is_completed;
            const result = await updateTask(id, payload);
            if (!result) return;

            setTasks((prevTasks) => {
                return prevTasks.map((task) => task.id === id ? result : task);
            })
        }
        catch (err) {
            setError(handleError(err));
        }
        finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: number) {
        setLoading(true);
        setError(null);

        try {
            await deleteTask(id);
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        }
        catch (err) {
            setError(handleError(err));
        }
        finally {
            setLoading(false);
        }
    }

    //  this function needs to upgraded to handle loading adn error state
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!input.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const result = await addTask(input);
            setTasks((prevTasks) => [...prevTasks, result]);
            setInput("");
        }
        catch (err) {
            setError(handleError(err));
        }
        finally {
            setLoading(false);
        }
    }

    const taskCardElements = tasks.map((task) => (
        <TaskCard
            key={task.id}
            id={task.id}
            description={task.description}
            isCompleted={task.is_completed}
            handleChecked={handleChecked}
            handleDelete={handleDelete}
        />
    ))

    return (
        <>
            <Heading />
            <form onSubmit={handleSubmit}>
                <InputField
                    input={input}
                    setInput={setInput}
                />
            </form>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error.message}</p>}

            {
                !loading && !error && (
                    <div className="task-container">
                        {taskCardElements}
                    </div>
                )
            }
        </>
    )
}

// Todos------------->
// better loading handling
// race condition handling 
// better loading animation 
// better error handling