import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

import EditorMenubar from "../../TextEditor/EditorMenubar";
import { FormBase, type FormControlProps } from "../FormBase";
import { useFieldContext } from "../hooks";

type FormTextEditorProps = FormControlProps & {
    variant?: "default" | "bare";
    placeholder?: string;
    disabled?: boolean;
    className?: string;
};

export function FormTextEditor({
    variant = "default",
    placeholder = "description",
    disabled = false,
    ...props
}: FormTextEditorProps) {
    const field = useFieldContext<string>();
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
    const [isFocused, setIsFocused] = useState(false);
    const isMobile = useIsMobile();

    const editor = useEditor({
        extensions: [
            StarterKit,
            Highlight.configure({ multicolor: true }),
            Link.configure({
                openOnClick: false,
                autolink: true,
                linkOnPaste: true,
                HTMLAttributes: {
                    class: "text-primary underline underline-offset-4 cursor-pointer",
                },
            }),
            TaskList,
            TaskItem.configure({ nested: true }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Placeholder.configure({ placeholder }),
        ],
        content: field.state.value || "",
        editorProps: {
            attributes: {
                class: "prose dark:prose-invert prose-sm focus:outline-none max-w-none",
            },
        },
        onUpdate: ({ editor }) => {
            field.handleChange(editor.getHTML());
        },
    });

    useEffect(() => {
        if (!editor) return;
        editor.setEditable(!disabled);
    }, [editor, disabled]);

    // clear the form on submission
    useEffect(() => {
        if (!editor) return;
        if (!field.state.value) {
            editor.commands.clearContent();
        }
    }, [editor, field.state.value]);

    if (variant === "bare") {
        return (
            <FormBase variant="bare" {...props}>
                <div
                    data-invalid={isInvalid}
                    className={cn(
                        "flex flex-col border rounded-sm overflow-hidden",
                        disabled && "opacity-60 bg-muted",
                    )}
                    onFocusCapture={() => setIsFocused(true)}
                    onBlurCapture={(event) => {
                        const nextTarget = event.relatedTarget as HTMLElement | null;
                        if (nextTarget && event.currentTarget.contains(nextTarget)) {
                            return;
                        }
                        if (nextTarget?.closest("[data-editor-ui]")) {
                            return;
                        }
                        setIsFocused(false);
                        field.handleBlur();
                    }}
                >
                    {!disabled && isFocused && <EditorMenubar editor={editor} />}

                    {!disabled && !isMobile && (
                        <BubbleMenu
                            editor={editor}
                            shouldShow={({ editor }) => {
                                return editor.isFocused && !editor.state.selection.empty;
                            }}
                        >
                            <EditorMenubar editor={editor} />
                        </BubbleMenu>
                    )}

                    <div className="bg-transparent max-h-[300px] overflow-y-auto">
                        <EditorContent editor={editor} className="px-2 py-1" />
                    </div>
                </div>
            </FormBase>
        );
    }

    return (
        <FormBase variant="bare" {...props}>
            <div
                data-invalid={isInvalid}
                className="flex flex-col border rounded-sm overflow-hidden"
                onFocusCapture={() => setIsFocused(true)}
                onBlurCapture={(event) => {
                    const nextTarget = event.relatedTarget as HTMLElement | null;
                    if (nextTarget && event.currentTarget.contains(nextTarget)) {
                        return;
                    }
                    if (nextTarget?.closest("[data-editor-ui]")) {
                        return;
                    }
                    setIsFocused(false);
                    field.handleBlur();
                }}
            >
                {!disabled && <EditorMenubar editor={editor} />}
                {!disabled && (
                    <BubbleMenu
                        editor={editor}
                        shouldShow={({ editor }) => {
                            return editor.isFocused && !editor.state.selection.empty;
                        }}
                    >
                        <EditorMenubar editor={editor} />
                    </BubbleMenu>
                )}
                <div className="bg-transparent max-h-[300px] overflow-y-auto">
                    <EditorContent editor={editor} className="px-2 py-1" />
                </div>
            </div>
        </FormBase>
    );
}
