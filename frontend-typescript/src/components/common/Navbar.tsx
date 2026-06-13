import {
    LogOutIcon,
    Menu,
    Settings2,
    User2Icon,
    UserRound
} from "lucide-react";

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "../ui/avatar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../ui/dropdown-menu";
import ModeToggle from "../mode-toggle";
import { Button } from "../ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSidebar } from "../ui/sidebar";


type UserMenuProps = {
    avatarURL?: string;
    name?: string;
    email?: string;
}

export default function Navbar({ avatarURL, name }: UserMenuProps) {
    const isMobile = useIsMobile();
    const { toggleSidebar } = useSidebar();
    return (
        <nav className="flex items-center justify-between">
            <div>
                {
                    isMobile &&
                    (
                        <Button
                            variant={"ghost"}
                            size={"icon"}
                            onClick={toggleSidebar}
                            className={"h-9 w-9 group"}
                        >
                            <Menu className="text-muted-foreground size-5 group-hover:text-foreground" />
                        </Button>
                    )
                }
            </div>
            <div className="flex items-center gap-4">
                <ModeToggle />
                <DropdownMenu>
                    {/* user dropdown trigger */}
                    <DropdownMenuTrigger render={<Avatar className={"cursor-pointer h-9 w-9"} />}>
                        <AvatarImage src={avatarURL} alt={name ?? "Guest User"} />
                        <AvatarFallback>
                            <UserRound className="h-5 w-5 text-muted-foreground" />
                        </AvatarFallback>
                    </DropdownMenuTrigger>

                    {/* user dropdown content */}
                    <DropdownMenuContent sideOffset={10} align="center" className={"w-36 rounded-md"}>
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>
                                <p className="font-medium text-xs tracking-widest">{name ?? "Guest User"}</p>
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
    )
}