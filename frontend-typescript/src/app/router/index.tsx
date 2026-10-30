import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import TaskListPage from "@/features/tasks/pages/task-list-page";
import TaskPage from "@/features/tasks/pages/task-page";
import { taskPages } from "@/features/tasks/pages/task-pages-config";

import AppLayout from "../layouts/app-layout";
import SignInPage from "@/features/users/pages/sign-in-page";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route path="sign-in" element={<SignInPage />} />
                </Route>
            </Routes>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route index element={<Navigate to={"/tasks/inbox"} replace />} />
                    <Route path="/tasks">
                        {taskPages.map(([path, pageConfig]) => (
                            <Route
                                key={path}
                                path={path}
                                element={<TaskListPage {...pageConfig} />}
                            />
                        ))}
                        <Route path=":taskId" element={<TaskPage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
