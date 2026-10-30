import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import type useEditTaskForm from "../hooks/use-edit-task-form";

type TaskActionBarProps = {
    form: ReturnType<typeof useEditTaskForm>["form"];
    updateTaskMutation: ReturnType<typeof useEditTaskForm>["updateTaskMutation"];
};

export default function TaskActionBar({ form, updateTaskMutation }: TaskActionBarProps) {
    return (
        <form.Subscribe
            selector={(state) => ({
                isDirty: state.isDirty,
                isSubmitting: state.isSubmitting,
            })}
        >
            {({ isDirty, isSubmitting }) => (
                <div className="mt-4 flex justify-between md:mt-8 md:justify-end md:gap-8">
                    <Button
                        type="button"
                        variant="outline"
                        disabled={!isDirty || updateTaskMutation.isPending}
                        onClick={() => form.reset()}
                        className={"rounded-sm text-sm tracking-wider"}
                    >
                        Reset
                    </Button>

                    <Button
                        type="submit"
                        disabled={isSubmitting || !isDirty || updateTaskMutation.isPending}
                        className={"rounded-sm text-sm tracking-wider"}
                    >
                        {updateTaskMutation.isPending ? (
                            <span className="flex items-center gap-1">
                                <Spinner data-icon="inline-start" /> Saving
                            </span>
                        ) : (
                            <span>Save Changes</span>
                        )}
                    </Button>
                </div>
            )}
        </form.Subscribe>
    );
}
