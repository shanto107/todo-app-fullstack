import {
    Building2Icon,
    ShieldCheck,
    SlidersHorizontal,
    User,
} from "lucide-react";
import { NavLink } from "react-router";

import { cn } from "@/lib/utils";

const settingsNavigation = [
    {
        label: "Personal Profile",
        description: "Manage your personal info",
        path: "/settings/profile",
        icon: User,
    },
    {
        label: "Security",
        description: "Password and account security",
        path: "/settings/security",
        icon: ShieldCheck,
    },
    {
        label: "Organization",
        description: "Office and membership details",
        path: "/settings/organization",
        icon: Building2Icon,
    },
    {
        label: "Preferences",
        description: "Customize your experience",
        path: "/settings/preferences",
        icon: SlidersHorizontal,
    },
];

export default function SettingsNavbar() {
    return (
        <aside className="w-full md:w-50 md:shrink-0">
            <nav
                aria-label="Settings navigation"
                className="grid grid-cols-2 gap-2 md:flex md:flex-col"
            >
                {settingsNavigation.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                cn(
                                    "flex min-w-0 items-start gap-2 rounded-md border p-3 text-sm md:border-transparent md:px-3 md:py-2.5",
                                    isActive
                                        ? "border-primary/20 bg-accent text-accent-foreground font-medium"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                )
                            }
                        >
                            <Icon className="mt-0.5 size-4 shrink-0" />

                            <span className="min-w-0">
                                <span className="block leading-5">
                                    {item.label}
                                </span>

                                <span className="font-extralight mt-1 block text-xs leading-4 md:hidden">
                                    {item.description}
                                </span>
                            </span>
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
}
