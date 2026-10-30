import { MoonStar, SunMedium } from "lucide-react";

import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";

export default function ModeToggle() {
    const { theme, setTheme } = useTheme();

    function handleClick() {
        setTheme(theme === "dark" ? "light" : "dark");
    }

    return (
        <Button
            variant={"outline"}
            size={"icon"}
            onClick={handleClick}
            className={
                "hover:bg-accent-foreground hover:dark:bg-foreground/50 h-9 w-9 rounded-full"
            }
        >
            <SunMedium className="!size-6 h-9 w-9 scale-100 rotate-0 fill-amber-500 text-amber-500 transition-all dark:scale-0 dark:-rotate-90" />
            <MoonStar className="text-chart-1 fill-chart-2 absolute h-9 w-9 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </Button>
    );
}
