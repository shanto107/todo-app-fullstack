import type { Editor } from "@tiptap/react";
import { useMenubar } from "./use-menubar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MENUBAR_GROUPS } from "./menubar.config";
import { Separator } from "@/components/ui/separator";
import MenubarDropdown from "./MenubarDropdown";
import { MenubarToggleGroup } from "./MenubarToggleGroup";
import LinkPopover from "./LinkPopover";

type EditorMenubarProps = {
    editor: Editor | null;
};

export default function EditorMenubar({ editor }: EditorMenubarProps) {

    const { isActive } = useMenubar(editor);
    if (!editor) return null;

    return (
        <TooltipProvider delay={200}>
            <div className="flex items-center flex-wrap gap-2 p-1 bg-card border-b border-border">
                {
                    MENUBAR_GROUPS.map((group, index) => {
                        if (group.type === "separator") {
                            return (
                                <Separator
                                    key={index}
                                    orientation="vertical"
                                    className="mx-1 h-6"
                                />
                            )
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
                                )
                            }
                            if (group.mode === "toggle") {
                                return (
                                    <MenubarToggleGroup
                                        key={index}
                                        group={group}
                                        editor={editor}
                                        isActive={isActive}
                                    />
                                )
                            }
                            return (
                                <LinkPopover
                                    editor={editor}
                                    isActive={isActive("link")}
                                    tooltip="Add link"
                                />
                            )
                        }
                    })
                }

            </div>
        </TooltipProvider>
    )
}