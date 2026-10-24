import { useParams } from "react-router";
import { useTask } from "../hooks/use-task";
import { ErrorCard } from "@/components/common/error/error-card";
import PageSpinner from "@/components/common/loading/page-spinner";
import TaskEditForm from "../components/edit-task-form";

export default function TaskPage() {
    const { taskId } = useParams();
    if (!taskId) {
        return (
            <ErrorCard error={new Error("Task ID is needed!")} />
        )
    };

    const {
        data: task,
        isPending,
        error
    } = useTask(taskId);

    if (isPending) {
        return <PageSpinner />;
    }

    if (error) {
        return <ErrorCard error={error} />
    }

    return <TaskEditForm task={task} />
}