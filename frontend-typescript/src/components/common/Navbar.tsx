import { LogOutIcon, Menu, Moon, Plus, Settings, Sun } from "lucide-react";

import { useBetterAuthLogout } from "@/features/auth/hooks/use-better-auth-logout";
import AddTaskDialog from "@/features/tasks/components/add-task-dialog";
import { useIsMobile } from "@/hooks/use-mobile";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LoadingSwap } from "../ui/loading-swap";
import { useSidebar } from "../ui/sidebar";
import { useNavigate } from "react-router";
import { useTheme } from "../theme-provider";
import { getInitials, getLastName } from "@/features/settings/helpers/name";

type UserMenuProps = {
    avatarURL?: string;
    name?: string;
    email?: string;
};

export default function Navbar({ avatarURL, name }: UserMenuProps) {
    const isMobile = useIsMobile();
    const navigate = useNavigate();

    const { toggleSidebar } = useSidebar();
    const { handleLogout, isLoggingOut } = useBetterAuthLogout();

    const { theme, setTheme } = useTheme();
    const isDarkMode = theme === "dark";

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

            <div className="flex items-center gap-10">
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
                {/* <ModeToggle /> */}

                <DropdownMenu>
                    {/* user dropdown trigger */}
                    <DropdownMenuTrigger
                        render={
                            <Button
                                variant="ghost"
                                className="hover:bg-accent/10 focus:bg-accent/10 h-10 gap-2 rounded-sm px-2"
                            />
                        }
                    >
                        <Avatar className="size-8">
                            <AvatarImage src={avatarURL} alt={name ?? "User"} />
                            <AvatarFallback className="text-foreground/60 bg-background/50 dark:bg-background/50 font-serif text-xs font-semibold">
                                {getInitials(name)}
                            </AvatarFallback>
                        </Avatar>
                        <span className="max-w-28 truncate text-sm font-medium">
                            {getLastName(name)}
                        </span>
                    </DropdownMenuTrigger>

                    {/* user dropdown content */}
                    <DropdownMenuContent
                        sideOffset={10}
                        align="end"
                        className={"w-64 rounded-md"}
                    >
                        <DropdownMenuGroup className={"mt-1 py-2"}>
                            <DropdownMenuItem
                                onClick={() => navigate("/settings/profile")}
                                className={"text-sm font-light"}
                            >
                                <div className="flex items-center gap-4 px-2">
                                    <Settings
                                        strokeWidth={"1.5"}
                                        className="size-4"
                                    />
                                    <span className="">Settings</span>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    setTheme(isDarkMode ? "light" : "dark")
                                }
                                className={"text-sm font-light"}
                            >
                                <div className="flex items-center gap-4 px-2">
                                    {isDarkMode ? (
                                        <Sun
                                            strokeWidth={"1.5"}
                                            className="size-4"
                                        />
                                    ) : (
                                        <Moon
                                            strokeWidth={"1.5"}
                                            className="size-4"
                                        />
                                    )}
                                    <span>
                                        {isDarkMode
                                            ? "Light mode"
                                            : "Dark mode"}
                                    </span>
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator />

                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                variant="destructive"
                                onClick={(event) => {
                                    event.preventDefault();
                                    void handleLogout();
                                }}
                                disabled={isLoggingOut}
                                className={"text-sm font-light"}
                            >
                                <LoadingSwap
                                    isLoading={isLoggingOut}
                                    className="flex items-center"
                                >
                                    <div className="flex items-center gap-4 px-2">
                                        <LogOutIcon
                                            strokeWidth={"1.5"}
                                            className="size-4"
                                        />
                                        <span>
                                            {isLoggingOut
                                                ? "Logging out"
                                                : "Log Out"}
                                        </span>
                                    </div>
                                </LoadingSwap>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
}
