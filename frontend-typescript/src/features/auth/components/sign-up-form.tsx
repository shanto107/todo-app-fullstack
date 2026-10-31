import { useAppForm } from "@/components/common/form/hooks";
import { useDesignations } from "../hooks/use-designations";
import { signUpSchema, type SignUpFormValues } from "../schemas/sign-up-schema";
import { toast } from "sonner";
import { authClient } from "@/services/auth-client";
import { useNavigate } from "react-router";

export default function SignUpForm() {
    const navigate = useNavigate();
    const { data: designations, isPending, isError } = useDesignations();

    const form = useAppForm({
        defaultValues: {
            name: "",
            email: "",
            employeeId: "",
            mobileNumber: "",
            designationId: "",
            password: "",
        } as SignUpFormValues,

        validators: {
            onSubmit: signUpSchema,
        },

        onSubmit: async ({ value }) => {
            // await new Promise((resolve) => setTimeout(resolve, 2000));
            const { error } = await authClient.signUp.email(value);
            if (error) {
                toast.error("Account creation failed.", {
                    description: error.message,
                });
                return;
            }
            toast.success("Account created successfully!");
            navigate("/tasks/inbox", { replace: true });
        },
    });

    const designationOptions = (designations ?? []).map((designation) => ({
        value: designation.id,
        label: designation.name,
    }));

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                void form.handleSubmit();
            }}
        >
            <div className="space-y-4">
                <form.AppField name="name">
                    {(field) => (
                        <field.Input
                            variant="default"
                            label="Full name"
                            placeholder="Enter your full name"
                            className="rounded-sm text-sm tracking-wider md:text-sm"
                            labelClassName="text-sm md:text-sm tracking-wider"
                        />
                    )}
                </form.AppField>

                <form.AppField name="email">
                    {(field) => (
                        <field.Input
                            variant="default"
                            label="Email"
                            placeholder="you@example.com"
                            className="rounded-sm text-sm tracking-wider md:text-sm"
                            labelClassName="text-sm md:text-sm tracking-wider"
                        />
                    )}
                </form.AppField>

                <form.AppField name="employeeId">
                    {(field) => (
                        <field.Input
                            variant="default"
                            label="Employee ID"
                            placeholder="Enter your 5-digit employee ID"
                            className="rounded-sm text-sm tracking-wider md:text-sm"
                            labelClassName="text-sm md:text-sm tracking-wider"
                        />
                    )}
                </form.AppField>

                <form.AppField name="mobileNumber">
                    {(field) => (
                        <field.Input
                            variant="default"
                            label="Mobile number"
                            placeholder="01XXXXXXXXX"
                            className="rounded-sm text-sm tracking-wider md:text-sm"
                            labelClassName="text-sm md:text-sm tracking-wider"
                        />
                    )}
                </form.AppField>

                <form.AppField name="designationId">
                    {(field) => (
                        <field.Combobox
                            label="Designation"
                            placeholder="Enter your designation"
                            options={designationOptions}
                            disabled={isPending || isError}
                            labelClassName="text-sm md:text-sm tracking-wider"
                        />
                    )}
                </form.AppField>

                {isError && (
                    <p className="text-destructive text-sm">
                        Failed to load designations. Please refresh the page.
                    </p>
                )}

                <form.AppField name="password">
                    {(field) => (
                        <field.PasswordInput
                            label="Password"
                            placeholder="Create a password"
                            className="rounded-sm text-sm tracking-wider md:text-sm"
                            labelClassName="text-sm md:text-sm tracking-wider"
                        />
                    )}
                </form.AppField>
            </div>

            <form.AppForm>
                <form.AuthSubmitButton
                    label="Create Account"
                    loadingLabel="Creating your account"
                    className="bg-accent/80 dark:bg-chart-4 mt-6 h-9 w-full rounded-md text-sm font-semibold"
                />
            </form.AppForm>
        </form>
    );
}
