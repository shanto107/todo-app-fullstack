import { PlusIcon } from "lucide-react";
import { Outlet } from "react-router";

import AppSidebar from "@/components/common/AppSidebar";
import Navbar from "@/components/common/Navbar";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AddTaskDialog from "@/features/tasks/components/add-task-dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function AppLayout() {
    const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("sidebar_state="));
    const defaultOpen = cookie ? cookie.split("=")[1] === "true" : true;
    const isMobile = useIsMobile();

    return (
        <TooltipProvider>
            <SidebarProvider defaultOpen={defaultOpen}>
                <AppSidebar />
                <SidebarInset className="p-4">
                    <Navbar />
                    <main>
                        <Outlet />
                    </main>
                </SidebarInset>
                {isMobile && (
                    <AddTaskDialog
                        trigger={
                            <Button
                                size={"icon"}
                                className={
                                    "fixed right-6 bottom-6 z-50 h-12 w-12 rounded-full shadow-lg"
                                }
                            >
                                <PlusIcon className="size-6" />
                            </Button>
                        }
                    />
                )}
            </SidebarProvider>
        </TooltipProvider>
    );
}
