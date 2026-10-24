import type { Task } from "../types/task.types"
import TaskCard from "./task-card"

type TaskCardListProps = {
    tasks: Task[]
}

export default function TaskCardList({
    tasks
}: TaskCardListProps) {
    return (
        <div className="max-w-6xl grid grid-cols-1 gap-6">
            {
                tasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                    />
                ))
            }
        </div>
    )
}