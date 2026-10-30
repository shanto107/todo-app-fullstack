import type { ComponentProps, ReactNode } from "react";

import { Toggle } from "../../ui/toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";

type ToolbarButtonProps = ComponentProps<typeof Toggle> & {
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    tooltip: string;
    children?: ReactNode;
};

export default function MenubarButton({
    onClick,
    isActive,
    disabled,
    tooltip,
    children,
    ...props
}: ToolbarButtonProps) {
    return (
        <Tooltip>
            <TooltipTrigger>
                <Toggle
                    size={"sm"}
                    variant={"outline"}
                    pressed={isActive}
                    onPressedChange={() => onClick()}
                    onMouseDown={(event) => event.preventDefault()}
                    disabled={disabled}
                    className="h-6 w-6 rounded-sm p-0"
                    data-editor-ui
                    {...props}
                >
                    {children}
                </Toggle>
            </TooltipTrigger>
            <TooltipContent>
                <p>{tooltip}</p>
            </TooltipContent>
        </Tooltip>
    );
}
