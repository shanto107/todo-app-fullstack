import { useEditorState, type Editor } from "@tiptap/react";
import type { ActiveKey } from "./menubar.types";

export function useMenubar(editor: Editor | null) {

    const state = useEditorState({
        editor,
        selector: (ctx) => ({
            bold: ctx.editor?.isActive("bold") ?? false,
            italic: ctx.editor?.isActive("italic") ?? false,
            underline: ctx.editor?.isActive("underline") ?? false,
            strike: ctx.editor?.isActive("strike") ?? false,
            code: ctx.editor?.isActive("code") ?? false,
            highlight: ctx.editor?.isActive("highlight") ?? false,

            heading1: ctx.editor?.isActive("heading", { level: 2 }) ?? false,
            heading2: ctx.editor?.isActive("heading", { level: 3 }) ?? false,
            heading3: ctx.editor?.isActive("heading", { level: 4 }) ?? false,

            bulletList: ctx.editor?.isActive("bulletList") ?? false,
            orderedList: ctx.editor?.isActive("orderedList") ?? false,
            taskList: ctx.editor?.isActive("taskList") ?? false,
            blockquote: ctx.editor?.isActive("blockquote") ?? false,

            link: ctx.editor?.isActive("link") ?? false,

            alignLeft: ctx.editor?.isActive({ textAlign: "left" }) ?? false,
            alignCenter: ctx.editor?.isActive({ textAlign: "center" }) ?? false,
            alignRight: ctx.editor?.isActive({ textAlign: "right" }) ?? false,
            alignJustify: ctx.editor?.isActive({ textAlign: "justify" }) ?? false,

            undo: ctx.editor?.can().undo() ?? false,
            redo: ctx.editor?.can().redo() ?? false,
        }),
    });

    function isActive(key: ActiveKey) {
        if (!editor) return false;
        return state?.[key] ?? false;
    }

    return { isActive };
}