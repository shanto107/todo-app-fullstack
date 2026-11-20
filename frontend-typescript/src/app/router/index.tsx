import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import ProtectedRoute from "@/components/common/routes/protected-route";
import SignInPage from "@/features/auth/pages/sign-in-page";
import SignUpPage from "@/features/auth/pages/sign-up-page";
import VerifyEmailPage from "@/features/auth/pages/verify-email-page";
import TaskListPage from "@/features/tasks/pages/task-list-page";
import TaskPage from "@/features/tasks/pages/task-page";
import { taskPages } from "@/features/tasks/pages/task-pages-config";

import AppLayout from "../layouts/app-layout";
import ForgotPasswordPage from "@/features/auth/pages/forgot-password-page";
import ResetPasswordPage from "@/features/auth/pages/reset-password-page";
import GuestRoute from "@/components/common/routes/guest-route";
import GuestLayout from "../layouts/guest-layout";
import SettingsLayout from "../layouts/settings-layout";
import ProfilePage from "@/features/settings/pages/profile-page";
import SecurityPage from "@/features/settings/pages/security-page";
import OrganizationPage from "@/features/settings/pages/organization-page";
import PreferencesPage from "@/features/settings/pages/preferences-page";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route element={<GuestRoute />}>
                        <Route element={<GuestLayout />}>
                            <Route path="sign-in" element={<SignInPage />} />
                            <Route path="sign-up" element={<SignUpPage />} />
                            <Route
                                path="forgot-password"
                                element={<ForgotPasswordPage />}
                            />
                        </Route>
                    </Route>

                    <Route path="verify-email" element={<VerifyEmailPage />} />
                    <Route
                        path="reset-password"
                        element={<ResetPasswordPage />}
                    />

                    <Route element={<ProtectedRoute />}>
                        <Route path="settings" element={<SettingsLayout />}>
                            <Route
                                index
                                element={<Navigate to="profile" replace />}
                            />
                            <Route path="profile" element={<ProfilePage />} />
                            <Route path="security" element={<SecurityPage />} />
                            <Route
                                path="organization"
                                element={<OrganizationPage />}
                            />
                            <Route
                                path="preferences"
                                element={<PreferencesPage />}
                            />
                        </Route>

                        <Route element={<AppLayout />}>
                            <Route
                                index
                                element={
                                    <Navigate to={"/tasks/inbox"} replace />
                                }
                            />
                            <Route path="tasks">
                                {taskPages.map(([path, pageConfig]) => (
                                    <Route
                                        key={path}
                                        path={path}
                                        element={
                                            <TaskListPage {...pageConfig} />
                                        }
                                    />
                                ))}
                                <Route path=":taskId" element={<TaskPage />} />
                            </Route>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
