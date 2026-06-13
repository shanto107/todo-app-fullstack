import { BrowserRouter, Routes, Route } from "react-router";
import AppLayout from "../layouts/app-layout";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route index element={<div></div>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}