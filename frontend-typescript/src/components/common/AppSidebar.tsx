import {
    CalendarClock,
    CalendarDays,
    CircleCheckBig,
    CirclePlus,
    Inbox,
    Menu,
    Notebook,
    Trash2,
} from "lucide-react";
import { NavLink, useLocation } from "react-router";

import AddTaskDialog from "@/features/tasks/components/add-task-dialog";
import { useTaskCounts } from "@/features/tasks/hooks/use-task-counts";
import type { AppSidebarItem } from "@/features/tasks/types/task.types";
import { useIsMobile } from "@/hooks/use-mobile";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
    useSidebar,
} from "../ui/sidebar";
import { Spinner } from "../ui/spinner";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const sidebarNavItems: AppSidebarItem[] = [
    {
        title: "Inbox",
        url: "/tasks/inbox",
        count: "inbox",
        icon: Inbox,
        active: "text-accent dark:text-chart-1",
        hover: "hover:text-accent hover:dark:text-chart-1",
    },
    {
        title: "Today",
        url: "/tasks/today",
        count: "today",
        icon: CalendarDays,
        active: "text-accent dark:text-chart-1",
        hover: "hover:text-accent dark:hover:text-chart-1",
    },
    {
        title: "Upcoming",
        url: "/tasks/upcoming",
        count: "upcoming",
        icon: CalendarClock,
        active: "text-accent dark:text-chart-1",
        hover: "hover:text-accent dark:hover:text-chart-1",
    },
    {
        title: "Completed",
        url: "/tasks/completed",
        icon: CircleCheckBig,
        active: "text-green-600 dark:text-green-300",
        hover: "hover:text-green-600 dark:hover:text-green-300",
    },
    {
        title: "Trash",
        url: "/tasks/deleted",
        icon: Trash2,
        active: "text-red-600 dark:text-red-400",
        hover: "hover:text-red-600 dark:hover:text-red-400",
    },
];

type SidebarProps = {
    Applogo?: string;
};

export default function AppSidebar({ Applogo }: SidebarProps) {
    const { state, toggleSidebar } = useSidebar();
    const isMobile = useIsMobile();
    const location = useLocation();
    const { data: counts, isPending, isError } = useTaskCounts();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="mt-2">
                <div className="flex items-center justify-between">
                    {isMobile ? (
                        <Button
                            variant={"ghost"}
                            size={"icon"}
                            onClick={toggleSidebar}
                            className={"group h-9 w-9"}
                        >
                            <Menu className="text-muted-foreground group-hover:text-foreground size-5" />
                        </Button>
                    ) : (
                        <SidebarTrigger className="text-muted-foreground h-9 w-9 [&>svg]:!h-6 [&>svg]:!w-6" />
                    )}

                    {(isMobile || state === "expanded") && (
                        <Avatar>
                            <AvatarImage src={Applogo} alt="App Logo" />
                            <AvatarFallback className={"bg-foreground-100"}>
                                <Notebook className="text-accent dark:text-chart-1 h-5 w-5" />
                            </AvatarFallback>
                        </Avatar>
                    )}
                </div>
            </SidebarHeader>
            {/* Sidebar Navigation Items */}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {/* Sidebar Add task button */}
                            <SidebarMenuItem>
                                <Tooltip>
                                    <AddTaskDialog
                                        trigger={
                                            <TooltipTrigger
                                                render={
                                                    <SidebarMenuButton className="hover:bg-accent/10 dark:hover:bg-accent/20 hover:[&_svg]:text-background hover:[&_svg]:fill-accent/80 dark:hover:[&_svg]:text-background dark:hover:[&_svg]:fill-chart-1 mt-0 mb-2 overflow-visible rounded-sm px-0 group-data-[collapsible=icon]:!px-0" />
                                                }
                                            >
                                                <CirclePlus
                                                    strokeWidth={1.5}
                                                    className="!size-8 transition-colors"
                                                />
                                                <span className="text-sm font-medium tracking-wider">
                                                    Add Task
                                                </span>
                                            </TooltipTrigger>
                                        }
                                    />
                                    <TooltipContent side="right">Add Task</TooltipContent>
                                </Tooltip>
                            </SidebarMenuItem>

                            {/* Nav Links */}

                            {sidebarNavItems.map((navItem) => (
                                <SidebarMenuItem key={navItem.title}>
                                    <SidebarMenuButton
                                        tooltip={navItem.title}
                                        isActive={location.pathname === navItem.url}
                                        render={<NavLink to={navItem.url} />}
                                        className={`mt-2 flex items-center justify-between overflow-visible rounded-sm px-1 ${navItem.hover}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <navItem.icon
                                                className={`!size-5 ${location.pathname === navItem.url && navItem.active}`}
                                                strokeWidth={1.8}
                                            />
                                            <span
                                                className={`text-sm font-light tracking-wider ${location.pathname === navItem.url && navItem.active}`}
                                            >
                                                {navItem.title}
                                            </span>
                                        </div>
                                        <div>
                                            {(isMobile || state === "expanded") &&
                                                navItem.count && (
                                                    <div>
                                                        {isPending && <Spinner />}

                                                        {!isPending && !isError && (
                                                            <Badge
                                                                variant="secondary"
                                                                className="h-5 min-w-5 rounded-full px-1.5 text-[10px] font-medium"
                                                            >
                                                                {counts[navItem.count] > 20
                                                                    ? "20+"
                                                                    : counts[navItem.count]}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                )}
                                        </div>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
