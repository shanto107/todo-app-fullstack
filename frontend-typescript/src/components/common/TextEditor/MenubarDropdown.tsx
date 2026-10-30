import type { Editor } from "@tiptap/react";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import type { ActiveKey, MenubarGroup } from "./menubar.types";

type MenubarDropdownProps = {
    group: MenubarGroup;
    editor: Editor;
    isActive: (key: ActiveKey) => boolean;
};

export default function MenubarDropdown({ group, editor, isActive }: MenubarDropdownProps) {
    const activeItem = group.items.find((item) => item.activeKey && isActive(item.activeKey));

    const TriggerIcon = activeItem && group.label !== "Text" ? activeItem.icon : group.icon;
    const activeStyles = "bg-muted text-accent dark:text-chart-1";

    return (
        <DropdownMenu>
            <Tooltip>
                <TooltipTrigger
                    render={
                        <DropdownMenuTrigger
                            render={
                                <Button
                                    variant={"outline"}
                                    size={"icon"}
                                    className={`hover:text-accent dark:hover:text-chart-1 h-6 w-7 rounded-sm ${activeItem ? activeStyles : ""}`}
                                    onMouseDown={(event) => event.preventDefault()}
                                    data-editor-ui
                                />
                            }
                        >
                            <TriggerIcon className={`mr-0.5 size-3`} />
                            <ChevronDown className="size-2" />
                        </DropdownMenuTrigger>
                    }
                />
                <TooltipContent>{group.label}</TooltipContent>
            </Tooltip>

            <DropdownMenuContent align="start" className={"rounded-sm"}>
                {group.items.map((item) => (
                    <DropdownMenuItem
                        key={item.key}
                        disabled={item.isDisabled?.(editor)}
                        onClick={() => item.action?.(editor)}
                        className={item.activeKey && isActive(item.activeKey) ? activeStyles : ""}
                        onMouseDown={(event) => event.preventDefault()}
                        data-editor-ui
                    >
                        <item.icon className="mr-2 size-4" />
                        {item.tooltip}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
