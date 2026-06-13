import AppSidebar from "@/components/common/AppSidebar";
import Navbar from "@/components/common/Navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

export default function AppLayout() {
    const cookie = document.cookie.split("; ").find(row => row.startsWith("sidebar_state="));
    const defaultOpen = cookie ? cookie.split("=")[1] === "true" : true;
    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <SidebarInset className="p-4">
                <Navbar />
                <main >
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}