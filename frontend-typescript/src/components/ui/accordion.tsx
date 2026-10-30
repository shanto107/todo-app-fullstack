import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
// import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
    return (
        <AccordionPrimitive.Root
            data-slot="accordion"
            className={cn("flex w-full flex-col", className)}
            {...props}
        />
    );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
    return (
        <AccordionPrimitive.Item
            data-slot="accordion-item"
            className={cn("not-last:border-b", className)}
            {...props}
        />
    );
}

function AccordionTrigger({ className, children, ...props }: AccordionPrimitive.Trigger.Props) {
    return (
        <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
                data-slot="accordion-trigger"
                className={cn(
                    "group/accordion-trigger relative flex flex-1 items-start justify-between rounded-none border border-transparent py-2.5 text-left text-xs font-medium transition-all outline-none hover:no-underline focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-50",
                    className,
                )}
                {...props}
            >
                {children}
                <span
                    aria-hidden="true"
                    className="pointer-events-none ml-auto shrink-0 text-lg leading-none text-muted-foreground"
                >
                    <span className="group-aria-expanded/accordion-trigger:hidden">
                        <Plus className="size-4.5 text-foreground" />
                    </span>

                    <span className="hidden group-aria-expanded/accordion-trigger:inline">
                        <Minus className="size-4.5 text-muted-foreground" />
                    </span>
                </span>
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    );
}

function AccordionContent({ className, children, ...props }: AccordionPrimitive.Panel.Props) {
    return (
        <AccordionPrimitive.Panel
            data-slot="accordion-content"
            className="overflow-hidden text-xs data-open:animate-accordion-down data-closed:animate-accordion-up"
            {...props}
        >
            <div
                className={cn(
                    "h-(--accordion-panel-height) pt-0 pb-2.5 data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
                    className,
                )}
            >
                {children}
            </div>
        </AccordionPrimitive.Panel>
    );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
