import {
    AlignCenter,
    AlignJustify,
    AlignLeft,
    AlignRight,
    Bold,
    Code2,
    Heading,
    Heading1,
    Heading2,
    Heading3,
    History,
    Italic,
    Link2,
    List,
    ListOrdered,
    ListTodo,
    Quote,
    Redo2,
    Strikethrough,
    Type,
    Underline,
    Undo2,
} from "lucide-react";

import type { MenubarConfig } from "./menubar.types";

export const MENUBAR_GROUPS: MenubarConfig[] = [
    {
        type: "group",
        label: "Text",
        icon: Type,
        mode: "dropdown",
        items: [
            {
                key: "bold",
                tooltip: "Bold",
                icon: Bold,
                activeKey: "bold",
                action: (editor) => editor.chain().focus().toggleBold().run(),
            },
            {
                key: "italic",
                tooltip: "Italic",
                icon: Italic,
                activeKey: "italic",
                action: (editor) => editor.chain().focus().toggleItalic().run(),
            },
            {
                key: "underline",
                tooltip: "Underline",
                icon: Underline,
                activeKey: "underline",
                action: (editor) => editor.chain().focus().toggleUnderline().run(),
            },
            {
                key: "strike",
                tooltip: "Strike",
                icon: Strikethrough,
                activeKey: "strike",
                action: (editor) => editor.chain().focus().toggleStrike().run(),
            },
            {
                key: "code",
                tooltip: "Code",
                icon: Code2,
                activeKey: "code",
                action: (editor) => editor.chain().focus().toggleCode().run(),
            },
            {
                key: "quote",
                tooltip: "Quote",
                icon: Quote,
                activeKey: "blockquote",
                action: (editor) => editor.chain().focus().toggleBlockquote().run(),
            },
        ],
    },

    {
        type: "group",
        label: "Headings",
        icon: Heading,
        mode: "dropdown",
        items: [
            {
                key: "h1",
                tooltip: "Heading 1",
                icon: Heading1,
                activeKey: "heading1",
                action: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            },
            {
                key: "h2",
                tooltip: "Heading 2",
                icon: Heading2,
                activeKey: "heading2",
                action: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            },
            {
                key: "h3",
                tooltip: "Heading 3",
                icon: Heading3,
                activeKey: "heading3",
                action: (editor) => editor.chain().focus().toggleHeading({ level: 4 }).run(),
            },
        ],
    },

    {
        type: "group",
        label: "Lists",
        icon: List,
        mode: "dropdown",
        items: [
            {
                key: "bullet",
                tooltip: "Bullet List",
                icon: List,
                activeKey: "bulletList",
                action: (editor) => editor.chain().focus().toggleBulletList().run(),
            },
            {
                key: "ordered",
                tooltip: "Ordered List",
                icon: ListOrdered,
                activeKey: "orderedList",
                action: (editor) => editor.chain().focus().toggleOrderedList().run(),
            },
            {
                key: "todo",
                tooltip: "Todo",
                icon: ListTodo,
                activeKey: "taskList",
                action: (editor) => editor.chain().focus().toggleTaskList().run(),
            },
        ],
    },

    {
        type: "group",
        label: "Align",
        icon: AlignLeft,
        mode: "dropdown",
        items: [
            {
                key: "left",
                tooltip: "Left",
                icon: AlignLeft,
                activeKey: "alignLeft",
                action: (editor) => editor.chain().focus().setTextAlign("left").run(),
            },
            {
                key: "center",
                tooltip: "Center",
                icon: AlignCenter,
                activeKey: "alignCenter",
                action: (editor) => editor.chain().focus().setTextAlign("center").run(),
            },
            {
                key: "right",
                tooltip: "Right",
                icon: AlignRight,
                activeKey: "alignRight",
                action: (editor) => editor.chain().focus().setTextAlign("right").run(),
            },
            {
                key: "justify",
                tooltip: "Justify",
                icon: AlignJustify,
                activeKey: "alignJustify",
                action: (editor) => editor.chain().focus().setTextAlign("justify").run(),
            },
        ],
    },

    {
        type: "group",
        label: "Media",
        icon: Link2,
        mode: "popover",
        items: [
            {
                key: "link",
                tooltip: "Add link",
                icon: Link2,
                activeKey: "link",
            },
        ],
    },

    {
        type: "group",
        label: "History",
        icon: History,
        mode: "toggle",
        items: [
            {
                key: "undo",
                tooltip: "Undo",
                icon: Undo2,
                action: (editor) => editor.chain().focus().undo().run(),
                isDisabled: (editor) => !editor.can().undo(),
            },
            {
                key: "redo",
                tooltip: "Redo",
                icon: Redo2,
                action: (editor) => editor.chain().focus().redo().run(),
                isDisabled: (editor) => !editor.can().redo(),
            },
        ],
    },
];
