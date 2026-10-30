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
                "rounded-full h-9 w-9 hover:bg-accent-foreground hover:dark:bg-foreground/50"
            }
        >
            <SunMedium className="text-amber-500 fill-amber-500 h-9 w-9 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 !size-6" />
            <MoonStar className="text-chart-1 fill-chart-2 absolute h-9 w-9 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
    );
}
