import { useEffect, useMemo, useRef, useState } from "react";
import type { Task } from "../../types/task.types"
import {
    CircleX,
    Search,
    SearchCheck
} from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";

type TaskSearchProps = {
    value: string;
    suggestions: Task[];
    isSearching?: boolean;
    onChange: (value: string) => void;
    onSearch: (value: string) => void;
};
export default function TaskSearch({
    value,
    suggestions: tasks,
    isSearching = false,
    onChange,
    onSearch
}: TaskSearchProps) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);

    const suggestions = useMemo(() => {
        const search = value.trim().toLowerCase();
        if (!search) {
            return [];
        }
        return tasks.filter(task => {
            const title = task.title.toLowerCase();
            const id = task.id.slice(0, 8).toLowerCase();

            return title.includes(search) || id.includes(search);
        }).slice(0, 6);
    }, [tasks, value]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    function handleSearch() {
        const search = value.trim();
        if (!search) {
            onSearch("");
            return;
        }
        onSearch(search);
        setOpen(false);
    }

    function handleClear() {
        onChange("");
        onSearch("");
        setOpen(false);
    }

    function handleSelect(task: Task) {
        setOpen(false);
        navigate(`/tasks/${task.id}`);
    }

    return (
        <div
            ref={containerRef}
            className="relative w-full max-w-xl">
            <Command
                className="
                    relative 
                    overflow-visible
                    rounded-sm
                    bg-background
                "
                shouldFilter={false}
            >
                <div className="relative">
                    <CommandInput
                        value={value}
                        placeholder="Search tasks..."
                        className="text-sm md:text-sm"
                        onValueChange={(value) => {
                            onChange(value);
                            setOpen(value.trim() !== "");
                        }}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                event.preventDefault();
                                handleSearch();
                                return;
                            }
                            if (event.key === "Escape") {
                                event.preventDefault();
                                setOpen(false);
                                return;
                            }
                        }}
                        onFocus={() => {
                            if (value.trim()) {
                                setOpen(true);
                            }
                        }}
                    />

                    <div
                        className="
                        absolute
                        right-1
                        top-1/2
                        flex
                        -translate-y-1/2
                        items-center
                    "
                    >
                        {
                            value && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="size-7"
                                    onClick={handleClear}
                                    aria-label="Clear search"
                                >
                                    <CircleX className="size-4 text-muted-foreground" />
                                </Button>
                            )
                        }
                        {
                            isSearching && (
                                <Spinner className="
                                        mr-2 
                                        size-4 
                                        text-muted-foreground
                                    "
                                />
                            )
                        }
                    </div>
                </div>

                {
                    open && (
                        <CommandList
                            className="
                            absolute 
                            top-full 
                            z-50 
                            mt-1 
                            w-full 
                            rounded-sm 
                            border 
                            bg-background 
                            shadow-md
                        "
                        >
                            <CommandEmpty>
                                {
                                    isSearching ? (
                                        <div className="flex items-center gap-2 p-2 text-sm text-muted-foreground">
                                            <Spinner className="size-4" />
                                            Searching...
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 p-2 text-sm text-muted-foreground">
                                            <SearchCheck className="size-4" />
                                            No results found.
                                        </div>
                                    )
                                }
                            </CommandEmpty>
                            {
                                suggestions.length > 0 && (
                                    <CommandGroup heading="Tasks">
                                        {
                                            suggestions.map(task => (
                                                <CommandItem
                                                    key={task.id}
                                                    value={task.title}
                                                    onSelect={() => handleSelect(task)}
                                                >
                                                    <Search className="mr-2 size-4 text-muted-foreground" />
                                                    <span className="truncate"> {task.title} </span>
                                                    <span className="ml-auto text-xs text-primary/80 dark:text-chart-1">
                                                        {
                                                            task.id.slice(0, 8).toUpperCase()
                                                        }
                                                    </span>
                                                </CommandItem>
                                            ))
                                        }
                                        <CommandItem
                                            value="search-all"
                                            onSelect={handleSearch}
                                            className="border-t text-muted-foreground"
                                        >
                                            Search all tasks for &quot;{value.trim()}&quot;
                                        </CommandItem>
                                    </CommandGroup>
                                )
                            }
                        </CommandList>
                    )
                }
            </Command>
        </div>
    )
}