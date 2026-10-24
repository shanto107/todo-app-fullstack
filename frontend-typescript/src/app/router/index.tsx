import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import AppLayout from "../layouts/app-layout";
import TaskPage from "@/features/tasks/pages/task-page";
import TaskListPage from "@/features/tasks/pages/task-list-page";
import { taskPages } from "@/features/tasks/pages/task-pages-config";


export default function AppRouter() {


    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route
                        index
                        element={<Navigate to={"/tasks/inbox"} replace />}
                    />
                    <Route path="/tasks">
                        {
                            taskPages.map(([path, pageConfig]) => (
                                <Route 
                                    key={path}
                                    path={path}
                                    element={
                                        <TaskListPage {...pageConfig} />
                                    }
                                />
                            ))
                        }
                        <Route
                            path=":taskId"
                            element={<TaskPage />}
                        />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}