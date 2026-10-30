import { FIELD_LABELS } from "@/features/tasks/constants/tasks.form";

export function getUpdateToastMessage(fields: (keyof typeof FIELD_LABELS)[]) {
    const labels = fields.map((field) => FIELD_LABELS[field]);

    if (labels.length === 0) {
        return "No changes were made.";
    }

    if (labels.length === 1) {
        return `${labels[0]} updated successfully.`;
    }

    if (labels.length === 2) {
        return `${labels[0]} and ${labels[1]} updated successfully.`;
    }

    return `${labels.slice(0, -1).join(", ")} and ${labels.at(-1)} updated successfully.`;
}
