import { Editor } from "@tiptap/react";
import { Link } from "lucide-react";
import { type KeyboardEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import MenubarButton from "./MenubarButton";

type LinkPopoverProps = {
    editor: Editor;
    isActive: boolean;
    tooltip: string;
};

export default function LinkPopover({ editor, isActive, tooltip }: LinkPopoverProps) {
    const [linkPopoverOpen, setLinkPopoverOpen] = useState(false);
    const [linkURL, setLinkURL] = useState("");

    function handleOpen(nextPopoverOpenState: boolean) {
        if (nextPopoverOpenState) {
            const attributes = editor.getAttributes("link") as {
                href?: string | null;
            };
            setLinkURL(attributes.href ?? "");
        }
        setLinkPopoverOpen(nextPopoverOpenState);
    }

    function handleApplyingLink() {
        if (!linkURL.trim()) return;
        editor.chain().focus().extendMarkRange("link").setLink({ href: linkURL }).run();
        setLinkPopoverOpen(false);
        setLinkURL("");
    }

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            handleApplyingLink();
            return;
        }
        if (event.key === "Escape") {
            setLinkPopoverOpen(false);
        }
    }

    function handleRemoveLink() {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
        setLinkPopoverOpen(false);
        setLinkURL("");
    }

    return (
        <Popover open={linkPopoverOpen} onOpenChange={handleOpen}>
            {/* popover trigger using MenubarButton */}
            <PopoverTrigger
                render={
                    <MenubarButton
                        tooltip={tooltip}
                        isActive={isActive}
                        onClick={() => setLinkPopoverOpen((prev) => !prev)}
                        onMouseDown={(event) => event.preventDefault()}
                    />
                }
            >
                <Link className="size-3" />
            </PopoverTrigger>

            {/* popover content */}
            <PopoverContent
                className={"rounded-sm p-3"}
                sideOffset={15}
                align="start"
                data-editor-ui
            >
                <div className="flex flex-col gap-4">
                    <p className="text-muted-foreground text-xs font-semibold tracking-wider">
                        Insert Link
                    </p>
                    <Input
                        placeholder="https://example.com"
                        value={linkURL}
                        onChange={(event) => setLinkURL(event.target.value)}
                        onKeyDown={handleKeyDown}
                        className="h-10 rounded-sm p-4 text-sm md:text-sm"
                    />
                    <div className="align-center flex justify-between">
                        <Button
                            size={"sm"}
                            variant={"destructive"}
                            onClick={handleRemoveLink}
                            className={"rounded-sm text-xs"}
                            disabled={!isActive}
                            onMouseDown={(event) => event.preventDefault()}
                        >
                            Remove Link
                        </Button>
                        <Button
                            size={"sm"}
                            variant={"default"}
                            onClick={handleApplyingLink}
                            className={"rounded-sm text-xs"}
                            onMouseDown={(event) => event.preventDefault()}
                        >
                            Apply Link
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
