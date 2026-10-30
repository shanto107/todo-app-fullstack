import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";

import { useFormContext } from "../hooks";

type FormAuthSubmitButtonProps = {
    label: string;
    loadingLabel: string;
    className?: string;
    disabled?: boolean;
};

export function FormAuthSubmitButton({
    label,
    loadingLabel,
    className,
    disabled = false,
}: FormAuthSubmitButtonProps) {
    const form = useFormContext();

    return (
        <form.Subscribe
            selector={(state) => ({
                canSubmit: state.canSubmit,
                isSubmitting: state.isSubmitting,
            })}
        >
            {({ canSubmit, isSubmitting }) => (
                <Button
                    type="submit"
                    className={className}
                    disabled={!canSubmit || isSubmitting || disabled}
                >
                    <LoadingSwap isLoading={isSubmitting}>
                        {isSubmitting ? loadingLabel : label}
                    </LoadingSwap>
                </Button>
            )}
        </form.Subscribe>
    );
}
