export function getInitials(name?: string | null) {
    if (!name?.trim()) return "U";

    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
}

export function getLastName(name?: string | null) {
    if (!name?.trim()) return "User";

    return name.trim().split(/\s+/).at(-1);
}
