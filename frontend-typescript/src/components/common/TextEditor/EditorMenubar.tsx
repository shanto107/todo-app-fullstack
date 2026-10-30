import type { Editor } from "@tiptap/react";

import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";

import LinkPopover from "./LinkPopover";
import { MENUBAR_GROUPS } from "./menubar.config";
import MenubarDropdown from "./MenubarDropdown";
import { MenubarToggleGroup } from "./MenubarToggleGroup";
import { useMenubar } from "./use-menubar";

type EditorMenubarProps = {
    editor: Editor | null;
};

export default function EditorMenubar({ editor }: EditorMenubarProps) {
    const { isActive } = useMenubar(editor);
    if (!editor) return null;

    return (
        <TooltipProvider delay={200}>
            <div className="bg-card border-border flex flex-wrap items-center gap-2 border-b p-1">
                {MENUBAR_GROUPS.map((group, index) => {
                    if (group.type === "separator") {
                        return (
                            <Separator key={index} orientation="vertical" className="mx-1 h-6" />
                        );
                    }

                    if (group.type === "group") {
                        if (group.mode === "dropdown") {
                            return (
                                <MenubarDropdown
                                    key={index}
                                    group={group}
                                    editor={editor}
                                    isActive={isActive}
                                />
                            );
                        }
                        if (group.mode === "toggle") {
                            return (
                                <MenubarToggleGroup
                                    key={index}
                                    group={group}
                                    editor={editor}
                                    isActive={isActive}
                                />
                            );
                        }
                        return (
                            <LinkPopover
                                editor={editor}
                                isActive={isActive("link")}
                                tooltip="Add link"
                            />
                        );
                    }
                })}
            </div>
        </TooltipProvider>
    );
}
