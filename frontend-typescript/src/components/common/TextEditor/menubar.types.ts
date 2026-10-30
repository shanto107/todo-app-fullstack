import type { Editor } from "@tiptap/react";
import type { LucideIcon } from "lucide-react";

export type TextGroupActiveKey = "bold" | "underline" | "italic" | "strike" | "code" | "blockquote";
export type HeadingsGroupActiveKey = "heading1" | "heading2" | "heading3";
export type ListGroupActiveKey = "bulletList" | "orderedList" | "taskList";
export type AlignmentGroupActiveKey = "alignLeft" | "alignCenter" | "alignRight" | "alignJustify";
export type MediaGroupActiveKey = "link";

export type ActiveKey =
    | TextGroupActiveKey
    | HeadingsGroupActiveKey
    | ListGroupActiveKey
    | AlignmentGroupActiveKey
    | MediaGroupActiveKey;

export type MenubarItem = {
    key: string;
    tooltip: string;
    icon: LucideIcon;
    activeKey?: ActiveKey;
    isDisabled?: (editor: Editor) => boolean;
    action?: (editor: Editor) => void;
};

export type MenubarGroup = {
    type: "group";
    label: string;
    icon: LucideIcon;
    mode: "toggle" | "dropdown" | "popover";
    items: Array<MenubarItem>;
};

export type MenubarSeparator = {
    type: "separator";
};

export type MenubarConfig = MenubarGroup | MenubarSeparator;
