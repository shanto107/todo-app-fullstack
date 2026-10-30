import { useAppForm } from "@/components/common/form/hooks";
import { signInSchema, type SignInFormValues } from "../schemas/sign-in-schema";
import { toast } from "sonner";

export default function SignInForm() {
    const form = useAppForm({
        defaultValues: {
            email: "",
            password: "",
        } as SignInFormValues,
        validators: {
            onSubmit: signInSchema,
        },
        onSubmit: async ({ value }) => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            toast.success("Successfully signed in!", {
                description: `Welcome back, ${value.email} and your password is ${value.password}`,
            });
        },
    });

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                void form.handleSubmit();
            }}
        >
            <div className="space-y-4">
                <form.AppField name="email">
                    {(field) => (
                        <field.Input
                            label="Email"
                            variant="default"
                            placeholder="you@example.com"
                            className="rounded-sm text-sm md:text-sm tracking-wider"
                            labelClassName="text-sm md:text-sm tracking-wider"
                        />
                    )}
                </form.AppField>
                <form.AppField name="password">
                    {(field) => (
                        <field.PasswordInput
                            label="Password"
                            placeholder="Enter your password"
                            className="rounded-sm text-sm md:text-sm tracking-wider"
                            labelClassName="text-sm md:text-sm tracking-wider"
                        />
                    )}
                </form.AppField>
            </div>
            <form.AppForm>
                <form.AuthSubmitButton
                    label="Sign in"
                    loadingLabel="Signing in"
                    className="bg-accent/80 dark:bg-chart-4 mt-6 h-9 w-full rounded-md text-sm font-semibold"
                />
            </form.AppForm>
        </form>
    );
}
