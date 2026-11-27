import { format } from "date-fns";

export function formatDateInput(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 8);

    if (digits.length <= 2) return digits;

    if (digits.length <= 4) {
        return `${digits.slice(0, 2)}-${digits.slice(2)}`;
    }

    return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4)}`;
}

export function formatDateOfBirth(date?: Date) {
    if (!date) return "";

    return format(date, "d MMM, yyyy");
}
