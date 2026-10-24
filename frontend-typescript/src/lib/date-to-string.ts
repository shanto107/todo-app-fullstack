import { format } from "date-fns";

export default function dateToString(date: Date | undefined) {
    if(!date) return undefined;
    return format(date, "yyyy-MM-dd");
}