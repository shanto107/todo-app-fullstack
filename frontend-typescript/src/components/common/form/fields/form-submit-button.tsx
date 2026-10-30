import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { useFormContext } from "../hooks";

export function FormSubmitButton({ label }: { label: string }) {
    const form = useFormContext();
    return (
        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
                <Button
                    type="submit"
                    size={"sm"}
                    disabled={!canSubmit}
                    className={
                        "h-8 rounded-sm text-sm tracking-wide bg-primary/80 dark:bg-primary/80 hover:bg-primary/100 dark:hover:bg-primary/50"
                    }
                >
                    {isSubmitting ? (
                        <span className="flex items-center gap-1">
                            <Spinner data-icon="inline-start" /> Adding
                        </span>
                    ) : (
                        <span>{label}</span>
                    )}
                </Button>
            )}
        </form.Subscribe>
    );
}
