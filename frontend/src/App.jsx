import React from "react";
import InputField from "./components/InputField";
import Heading from "./components/Heading";
import TaskCard from "./components/TaskCard";
import { getTasks, updateTask, addTask, deleteTask } from "./utils/apiCalls";

export default function App() {
    const [tasks, setTasks] = React.useState([]);
    const [input, setInput] = React.useState("");

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await getTasks();
            setTasks(result);
        }
        fetchData();
    }, []);

    async function handleChecked(id) {
        const currentTask = tasks.find((task) => task.id === id);
        const payload = !currentTask.is_completed;
        const result = await updateTask(id, payload);
        if (!result) return;

        setTasks((prevTasks) => {
            return prevTasks.map((task) => task.id === id ? result : task);
        })
    }

    async function handleDelete(id) {
        const response = await deleteTask(id);
        if (!response) {
            console.log("Delete failed");
            return;
        }
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const result = await addTask(input);
        if(!result) return;

        setTasks((prevTasks) => [...prevTasks, result]);
        setInput("");
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
            <div className="task-container">
                {taskCardElements}
            </div>
        </>
    )
}