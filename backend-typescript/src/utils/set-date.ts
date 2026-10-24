export default function setDate(
    type: "from" | "to",
    date: string
) {
    const receivedDate = new Date(date);
    if (isNaN(receivedDate.getTime())) {
        throw new Error("Invalid date!");
    }
    type === "from" ? receivedDate.setUTCHours(0, 0, 0, 0) : receivedDate.setUTCHours(23, 59, 59, 999);
    return receivedDate;
}