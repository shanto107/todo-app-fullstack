import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback } from "../ui/avatar";
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
    useSidebar
} from "../ui/sidebar";
import { Button } from "../ui/button";
import {
    CalendarClock,
    CalendarDays,
    CheckCheck,
    CirclePlus,
    Inbox,
    ListTodo,
    Menu,
    Notebook,
    Trash2
} from "lucide-react";
import { AvatarImage } from "../ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { NavLink } from "react-router";


const sidebarNavItems = [
    {
        title: "Inbox",
        url: "/tasks/inbox",
        icon: Inbox,
        style: ""
    },
    {
        title: "Today",
        url: "/tasks/today",
        icon: CalendarDays,
        style: ""
    },
    {
        title: "Upcoming",
        url: "/tasks/upcoming",
        icon: CalendarClock,
        style: ""
    },
    {
        title: "All Tasks",
        url: "/tasks/all",
        icon: ListTodo,
        style: ""
    },
    {
        title: "Completed",
        url: "/tasks/completed",
        icon: CheckCheck,
        style: "text-green-600"
    },
    {
        title: "Deleted",
        url: "/tasks/deleted",
        icon: Trash2,
        style: "text-red-400"
    }
]


type SidebarProps = {
    Applogo?: string;
}

export default function AppSidebar({ Applogo }: SidebarProps) {
    const { state, toggleSidebar } = useSidebar();
    const isMobile = useIsMobile();
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="mt-2">
                <div className="flex justify-between items-center">
                    {
                        isMobile
                            ? (
                                <Button
                                    variant={"ghost"}
                                    size={"icon"}
                                    onClick={toggleSidebar}
                                    className={"h-9 w-9 group"}
                                >
                                    <Menu className="text-muted-foreground size-5 group-hover:text-foreground" />
                                </Button>
                            )
                            : (
                                <SidebarTrigger className="h-9 w-9 [&>svg]:!h-6 [&>svg]:!w-6 text-muted-foreground" />
                            )
                    }

                    {
                        (isMobile || state === "expanded") &&
                        <Avatar>
                            <AvatarImage src={Applogo} alt="App Logo" />
                            <AvatarFallback className={"bg-foreground-100"}>
                                <Notebook className="h-5 w-5 text-accent dark:text-chart-1" />
                            </AvatarFallback>
                        </Avatar>
                    }
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
                                    <TooltipTrigger render={<SidebarMenuButton className="overflow-visible px-0 group-data-[collapsible=icon]:!px-0 mt-0 mb-2" />}>
                                        <CirclePlus className="!size-8 text-secondary fill-accent dark:fill-chart-1 shrink-0" />
                                        <span className="font-medium text-sm text-foreground tracking-wider">Add Task</span>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">Add Task</TooltipContent>
                                </Tooltip>
                            </SidebarMenuItem>

                            {/* Nav Links */}

                            {
                                sidebarNavItems.map((navItem) => (
                                    <SidebarMenuItem key={navItem.title}>
                                        <SidebarMenuButton
                                            tooltip={navItem.title}
                                            render={
                                                <NavLink
                                                    to={navItem.url}
                                                />
                                            }
                                            className="overflow-visible px-1 mt-2 group-data-[collapsible=icon]:!px-1 flex items-center gap-4"
                                        >
                                            <navItem.icon className={`!size-5 ${navItem.style}`} />
                                            <span className="text-sm">{navItem.title}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))
                            }

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}