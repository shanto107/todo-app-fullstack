import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "../../helpers/name";
import { IdCard, Mail } from "lucide-react";

type SettingsHeaderProps = {
    name?: string | null;
    email?: string;
    image?: string | null;
    employeeId?: string;
};

export default function SettingsHeader({
    name,
    email,
    image,
    employeeId,
}: SettingsHeaderProps) {
    return (
        <header className="border-accent/50 relative overflow-hidden rounded-lg border-2">
            {/* Decorative background */}
            <div className="from-primary/20 via-primary/10 to-primary/5 absolute inset-0 bg-gradient-to-r" />

            <div className="relative flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                <Avatar className="border-accent/50 size-16 border-2">
                    <AvatarImage
                        src={image ?? undefined}
                        alt={name ?? "Profile"}
                    />
                    <AvatarFallback className="text-foreground/60 bg-background/50 dark:bg-background/50 font-serif text-2xl font-semibold">
                        {getInitials(name)}
                    </AvatarFallback>
                </Avatar>

                <div className="min-w-0 space-y-1">
                    <h1 className="text-xl font-semibold tracking-tight">
                        {name || "User"}
                    </h1>

                    <div className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                        {employeeId && (
                            <div className="flex min-w-0 items-center gap-2">
                                <IdCard className="size-4 shrink-0" />
                                <span className="break-all">{employeeId}</span>
                            </div>
                        )}

                        {employeeId && email && (
                            <span className="hidden sm:inline">•</span>
                        )}

                        {email && (
                            <div className="flex min-w-0 items-center gap-2">
                                <Mail className="size-4 shrink-0" />
                                <span className="break-all">{email}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
