import { useState } from "react";
import { Check } from "lucide-react";

import { useProfileForm } from "../../hooks/profile/use-profile-form";
import { useDesignations } from "../../hooks/profile/use-designations";
import type { Profile } from "../../types/profile.types";

import { Button } from "@/components/ui/button";
import { ProfileFieldDisplay } from "./profile-field-display";
import { formatDateOfBirth } from "@/lib/helpers/format-date/format-date-input";

type ProfileFormProps = {
    profile: Profile;
};

type EditableField =
    "name" | "designationId" | "dateOfBirth" | "mobileNumber" | "homeAddress";

export default function ProfileForm({ profile }: ProfileFormProps) {
    const designationsQuery = useDesignations();
    const [editingFields, setEditingFields] = useState<EditableField[]>([]);
    const { form } = useProfileForm(profile, {
        onSuccess: () => setEditingFields([]),
    });

    const designationOptions = (designationsQuery.data ?? []).map(
        (designation) => ({
            value: designation.id,
            label: designation.name,
        }),
    );

    const isEditing = (field: EditableField) => editingFields.includes(field);

    const startEditing = (field: EditableField) => {
        setEditingFields((previous) =>
            previous.includes(field) ? previous : [...previous, field],
        );
    };

    const confirmField = (field: EditableField) => {
        setEditingFields((previous) =>
            previous.filter((item) => item !== field),
        );
    };

    const discardChanges = () => {
        form.reset();
        setEditingFields([]);
    };

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                void form.handleSubmit();
            }}
            className="space-y-4"
        >
            {/* Personal information */}
            <section className="bg-accent-foreground dark:bg-card space-y-5 rounded-sm p-6">
                <h3 className="text-accent dark:text-chart-2 font-semibold">
                    Personal
                </h3>

                <div className="grid items-start gap-5 md:grid-cols-2">
                    {/* Name */}
                    <form.AppField name="name">
                        {(field) =>
                            isEditing("name") ? (
                                <div className="flex items-end gap-2">
                                    <div className="min-w-0 flex-1">
                                        <field.Input
                                            variant="default"
                                            label="Name"
                                            placeholder="Enter your full name"
                                            className="rounded-sm font-semibold tracking-wide"
                                            labelClassName="font-semibold tracking-wider text-foreground/70"
                                        />
                                    </div>

                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="mb-0.5 size-8 shrink-0"
                                        onClick={() => confirmField("name")}
                                        aria-label="Confirm name"
                                    >
                                        <Check className="size-4" />
                                    </Button>
                                </div>
                            ) : (
                                <ProfileFieldDisplay
                                    label="Name"
                                    value={field.state.value}
                                    onEdit={() => startEditing("name")}
                                />
                            )
                        }
                    </form.AppField>

                    {/* Designation */}
                    <form.AppField name="designationId">
                        {(field) =>
                            isEditing("designationId") ? (
                                <div className="flex items-end gap-2">
                                    <div className="min-w-0 flex-1">
                                        <field.Combobox
                                            label="Designation"
                                            placeholder="Select your designation"
                                            options={designationOptions}
                                            disabled={
                                                designationsQuery.isLoading
                                            }
                                            labelClassName="font-semibold tracking-wider text-foreground/70"
                                            inputClassName="font-semibold"
                                        />
                                    </div>

                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="mb-0.5 size-8 shrink-0"
                                        onClick={() =>
                                            confirmField("designationId")
                                        }
                                        aria-label="Confirm designation"
                                    >
                                        <Check className="size-4" />
                                    </Button>
                                </div>
                            ) : (
                                <ProfileFieldDisplay
                                    label="Designation"
                                    value={
                                        designationOptions.find(
                                            (option) =>
                                                option.value ===
                                                field.state.value,
                                        )?.label
                                    }
                                    onEdit={() => startEditing("designationId")}
                                />
                            )
                        }
                    </form.AppField>

                    {/* Date of birth */}
                    <form.AppField name="dateOfBirth">
                        {(field) =>
                            isEditing("dateOfBirth") ? (
                                <div className="flex items-end gap-2">
                                    <div className="min-w-0 flex-1">
                                        <field.DatePicker
                                            variant="default"
                                            label="Date of Birth"
                                            includeInputField
                                            dropdownCaptionLayout
                                            disableFutureDates
                                            labelClassName="font-semibold tracking-wider text-foreground/70"
                                            inputClassName="font-semibold"
                                        />
                                    </div>

                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="mb-0.5 size-8 shrink-0"
                                        onClick={() =>
                                            confirmField("dateOfBirth")
                                        }
                                        aria-label="Confirm date of birth"
                                    >
                                        <Check className="size-4" />
                                    </Button>
                                </div>
                            ) : (
                                <ProfileFieldDisplay
                                    label="Date of Birth"
                                    value={formatDateOfBirth(field.state.value)}
                                    onEdit={() => startEditing("dateOfBirth")}
                                />
                            )
                        }
                    </form.AppField>
                </div>
            </section>

            {/* Contact information */}
            <section className="bg-accent-foreground dark:bg-card space-y-5 rounded-sm p-6">
                <h3 className="text-accent dark:text-chart-2 font-semibold">
                    Contact
                </h3>

                <div className="grid items-start gap-5 md:grid-cols-2">
                    <form.AppField name="mobileNumber">
                        {(field) =>
                            isEditing("mobileNumber") ? (
                                <div className="flex items-end gap-2">
                                    <div className="min-w-0 flex-1">
                                        <field.Input
                                            variant="default"
                                            label="Mobile"
                                            placeholder="+8801XXXXXXXXX"
                                            className="rounded-sm font-semibold tracking-wide"
                                            labelClassName="font-semibold tracking-wider text-foreground/70"
                                        />
                                    </div>

                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="mb-0.5 size-8 shrink-0"
                                        onClick={() =>
                                            confirmField("mobileNumber")
                                        }
                                        aria-label="Confirm mobile number"
                                    >
                                        <Check className="size-4" />
                                    </Button>
                                </div>
                            ) : (
                                <ProfileFieldDisplay
                                    label="Mobile"
                                    value={field.state.value}
                                    onEdit={() => startEditing("mobileNumber")}
                                />
                            )
                        }
                    </form.AppField>

                    <ProfileFieldDisplay label="Email" value={profile.email} />

                    <form.AppField name="homeAddress">
                        {(field) =>
                            isEditing("homeAddress") ? (
                                <div className="flex items-end gap-2">
                                    <div className="min-w-0 flex-1">
                                        <field.TextArea
                                            variant="default"
                                            label="Home Address"
                                            placeholder="Enter your home address"
                                            rows={3}
                                            maxLength={500}
                                            className="rounded-sm font-semibold tracking-wide"
                                            labelClassName="font-semibold tracking-wider text-foreground/70"
                                        />
                                    </div>

                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="mb-0.5 size-8 shrink-0"
                                        onClick={() =>
                                            confirmField("homeAddress")
                                        }
                                        aria-label="Confirm home address"
                                    >
                                        <Check className="size-4" />
                                    </Button>
                                </div>
                            ) : (
                                <ProfileFieldDisplay
                                    label="Home Address"
                                    value={field.state.value}
                                    onEdit={() => startEditing("homeAddress")}
                                />
                            )
                        }
                    </form.AppField>
                </div>
            </section>

            {/* Form actions */}
            <form.Subscribe selector={(state) => state.isDirty}>
                {(isDirty) =>
                    isDirty && (
                        <div className="flex justify-end gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                className="border-input h-8 rounded-sm border px-4 text-sm"
                                onClick={discardChanges}
                            >
                                Discard changes
                            </Button>

                            <form.AppForm>
                                <form.SubmitButton label="Save changes" />
                            </form.AppForm>
                        </div>
                    )
                }
            </form.Subscribe>
        </form>
    );
}
