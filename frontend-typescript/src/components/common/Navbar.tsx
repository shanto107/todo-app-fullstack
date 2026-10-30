import { LogOutIcon, Menu, Plus, Settings2, User2Icon, UserRound } from "lucide-react";

import AddTaskDialog from "@/features/tasks/components/add-task-dialog";
import { useIsMobile } from "@/hooks/use-mobile";

import ModeToggle from "../mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useSidebar } from "../ui/sidebar";

type UserMenuProps = {
    avatarURL?: string;
    name?: string;
    email?: string;
};

export default function Navbar({ avatarURL, name }: UserMenuProps) {
    const isMobile = useIsMobile();
    const { toggleSidebar } = useSidebar();
    return (
        <nav className="flex items-center justify-between">
            <div>
                {isMobile && (
                    <Button
                        variant={"ghost"}
                        size={"icon"}
                        onClick={toggleSidebar}
                        className={"group h-9 w-9"}
                    >
                        <Menu className="text-muted-foreground group-hover:text-foreground size-5" />
                    </Button>
                )}
            </div>

            <div className="flex items-center gap-4">
                {!isMobile && (
                    <AddTaskDialog
                        trigger={
                            <Button
                                size={"sm"}
                                className={
                                    "bg-primary/80 hover:bg-primary/100 dark:hover:bg-primary/50 h-9 rounded-sm text-sm tracking-wide"
                                }
                            >
                                <Plus className="mr-1 size-3.5" />
                                <span>Add Task</span>
                            </Button>
                        }
                    />
                )}
                <ModeToggle />
                <DropdownMenu>
                    {/* user dropdown trigger */}
                    <DropdownMenuTrigger render={<Avatar className={"h-9 w-9 cursor-pointer"} />}>
                        <AvatarImage src={avatarURL} alt={name ?? "Guest User"} />
                        <AvatarFallback>
                            <UserRound className="text-muted-foreground h-5 w-5" />
                        </AvatarFallback>
                    </DropdownMenuTrigger>

                    {/* user dropdown content */}
                    <DropdownMenuContent
                        sideOffset={10}
                        align="center"
                        className={"w-36 rounded-md"}
                    >
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>
                                <p className="text-xs font-medium tracking-widest">
                                    {name ?? "Guest User"}
                                </p>
                            </DropdownMenuLabel>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <User2Icon className="text-accent dark:text-chart-2 mr-2" />
                                <span className="text-sm tracking-widest">Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings2 className="text-accent dark:text-chart-2 mr-2" />
                                <span className="text-sm tracking-widest">Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem variant="destructive">
                                <LogOutIcon className="text-accent mr-2" />
                                <span className="text-sm tracking-widest">Log Out</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
}
