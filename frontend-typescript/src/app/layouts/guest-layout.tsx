import { Building2 } from "lucide-react";
import { Outlet } from "react-router";

export default function GuestLayout() {
    return (
        <main className="bg-background relative isolate min-h-svh overflow-hidden">
            {/* Background artwork */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0"
            >
                {/* Light mode dots */}
                <div
                    className="absolute inset-0 dark:hidden"
                    style={{
                        backgroundImage: `
                            radial-gradient(
                                circle,
                                color-mix(in srgb, var(--muted-foreground) 38%, transparent) 1.35px,
                                transparent 1.5px
                            )
                        `,
                        backgroundSize: "24px 24px",
                        maskImage:
                            "radial-gradient(ellipse at center, black 45%, transparent 100%)",
                        WebkitMaskImage:
                            "radial-gradient(ellipse at center, black 45%, transparent 100%)",
                    }}
                />

                {/* Dark mode dots */}
                <div
                    className="absolute inset-0 hidden dark:block"
                    style={{
                        backgroundImage: `
                            radial-gradient(
                                circle,
                                color-mix(in srgb, var(--foreground) 20%, transparent) 1.5px,
                                transparent 1.6px
                            )
                        `,
                        backgroundSize: "24px 24px",
                        maskImage:
                            "radial-gradient(ellipse at center, black 55%, transparent 100%)",
                        WebkitMaskImage:
                            "radial-gradient(ellipse at center, black 55%, transparent 100%)",
                    }}
                />

                {/* Top glow */}
                <div className="bg-primary/5 dark:bg-primary/15 absolute -top-48 left-1/2 size-[36rem] -translate-x-1/2 rounded-full blur-[110px]" />

                {/* Bottom-right glow */}
                <div className="bg-primary/5 dark:bg-primary/10 absolute -right-40 -bottom-48 size-[32rem] rounded-full blur-[110px]" />

                {/* Bottom-left glow */}
                <div className="bg-primary/5 dark:bg-primary/10 absolute -bottom-64 -left-40 size-[28rem] rounded-full blur-[100px]" />
            </div>

            {/* Branding and authentication content */}
            <div className="relative z-10 flex min-h-svh flex-col items-center justify-center px-4 py-10">
                {/* Application branding */}
                <header className="mb-5 flex items-center justify-center gap-2.5">
                    <Building2 className="text-primary/80 dark:text-chart-2 size-6 shrink-0" />
                    <h1 className="text-foreground text-lg font-semibold tracking-tight whitespace-nowrap">
                        DPDC Ticketing App
                    </h1>
                </header>

                {/* Page content */}
                <div className="w-full">
                    <Outlet />
                </div>
            </div>
        </main>
    );
}
