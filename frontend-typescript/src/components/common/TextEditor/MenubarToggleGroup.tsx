import type { Editor } from "@tiptap/react";

import { ToggleGroup } from "@/components/ui/toggle-group";

import type { ActiveKey, MenubarGroup } from "./menubar.types";
import MenubarButton from "./MenubarButton";

type MenubarToggleGroupProps = {
    group: MenubarGroup;
    editor: Editor;
    isActive: (key: ActiveKey) => boolean;
};

export function MenubarToggleGroup({ group, editor, isActive }: MenubarToggleGroupProps) {
    return (
        <ToggleGroup multiple className={"flex gap-1"}>
            {group.items.map((item) => {
                return (
                    <MenubarButton
                        key={item.key}
                        tooltip={item.tooltip}
                        isActive={item.activeKey ? isActive(item.activeKey) : false}
                        disabled={item.isDisabled?.(editor)}
                        onClick={() => item.action?.(editor)}
                    >
                        <item.icon className="size-3" />
                    </MenubarButton>
                );
            })}
        </ToggleGroup>
    );
}
