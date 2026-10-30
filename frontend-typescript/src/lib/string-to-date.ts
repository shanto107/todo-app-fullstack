export default function stringToDate(dateString: string): Date {
    const [year, month, day] = dateString.split("-").map(Number);

    if (year === undefined || month === undefined || day === undefined) {
        throw new Error(`Invalid date string: ${dateString}`);
    }

    return new Date(year, month - 1, day);
}
