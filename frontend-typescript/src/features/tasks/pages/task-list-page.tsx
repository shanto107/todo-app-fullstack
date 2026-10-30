/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { ErrorCard } from "@/components/common/error/error-card";
import PageSpinner from "@/components/common/loading/page-spinner";
import { useDebounce } from "@/hooks/use-debounce";
import { useIsMobile } from "@/hooks/use-mobile";

import TaskFilters from "../components/task-filters/task-filters";
import TaskPagination from "../components/task-pagination/task-pagination";
import TaskSearch from "../components/task-search/task-search";
import TaskSort from "../components/task-sort/task-sort";
import TaskTable from "../components/task-table/task-table";
import { useTasks } from "../hooks/use-tasks";
import { parseSearchParams, updateSearchParams } from "../lib/task-query-params";
import type { SortDirection, TaskPageKey, TaskSortBy, TaskTableView } from "../types/task.types";
import type { TaskFilterValues, TaskQuery } from "../types/task-query.types";

export type TaskListPageProps = {
    pageKey: TaskPageKey;
    pageTitle: string;
    query?: TaskQuery;
    tableView: TaskTableView;
};

const DEFAULT_PAGE_SIZE = 5;

export default function TaskListPage({
    pageKey,
    pageTitle,
    query: pageQuery,
    tableView,
}: TaskListPageProps) {
    const isMobile = useIsMobile();
    const [searchParams, setSearchParams] = useSearchParams();
    const query = parseSearchParams(searchParams);

    // set the values for search, pagination and filters from url
    const search = query.search ?? "";
    const page = query.page ?? 1;
    const filters: TaskFilterValues = {
        status: query.status,
        priority: query.priority,
        deadlineFrom: query.deadlineFrom,
        deadlineTo: query.deadlineTo,
    };

    const [searchInput, setSearchInput] = useState(search);
    const debouncedSearch = useDebounce(searchInput, 500);

    useEffect(() => {
        // Keep the input synchronized when the URL changes through browser Back/Forward or another navigation.
        setSearchInput(search);
    }, [search]);

    // synchronize debounced search and url params
    useEffect(() => {
        const nextSearch = debouncedSearch.trim();
        // if (nextSearch === search) {
        //     return;
        // }
        // const updatedQuery: TaskQuery = {
        //     ...query,
        //     search: nextSearch || undefined,
        //     page: 1,
        // };
        // setSearchParams(updateSearchParams(searchParams, updatedQuery));
        setSearchParams(
            (currentSearchParams) => {
                const currentQuery = parseSearchParams(currentSearchParams);
                const currentSearch = currentQuery.search ?? "";
                if (nextSearch === currentSearch) {
                    return currentSearchParams;
                }
                return updateSearchParams(currentSearchParams, {
                    ...currentQuery,
                    search: nextSearch || undefined,
                    page: 1,
                });
            },
            { replace: true },
        );
    }, [debouncedSearch, setSearchParams]);

    // react-query setup
    const { data: currentPageTasks } = useTasks({
        ...pageQuery,
        page,
        limit: DEFAULT_PAGE_SIZE,
    });

    const { data, isPending, isFetching, error } = useTasks({
        ...pageQuery,
        ...query,
        page,
        limit: DEFAULT_PAGE_SIZE,
    });

    const tasks = data?.items ?? [];
    const pagination = data?.pagination;
    const suggestions = currentPageTasks?.items ?? [];

    function handleFiltersChange(nextFilters: TaskFilterValues) {
        const updatedQuery: TaskQuery = {
            ...query,
            ...nextFilters,
            page: 1,
        };
        setSearchParams(updateSearchParams(searchParams, updatedQuery));
    }

    function handlePageChange(nextPage: number) {
        const updatedQuery: TaskQuery = {
            ...query,
            page: nextPage,
        };
        setSearchParams(updateSearchParams(searchParams, updatedQuery));
    }

    function handleSearch(value: string) {
        const nextSearch = value.trim();
        setSearchInput(nextSearch);
        const updatedQuery: TaskQuery = {
            ...query,
            search: nextSearch || undefined,
            page: 1,
        };
        setSearchParams(updateSearchParams(searchParams, updatedQuery));
    }

    function handleSort(sortBy: TaskSortBy, sortDirection: SortDirection) {
        const updatedQuery = {
            ...query,
            sortBy,
            sortDirection,
            page: 1,
        };
        setSearchParams(updateSearchParams(searchParams, updatedQuery));
    }

    if (isPending && !data) {
        return <PageSpinner />;
    }

    if (error) {
        return <ErrorCard error={error} />;
    }

    return (
        <div className="m-4 space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">{pageTitle}</h1>
            <div className="flex justify-between items-center gap-2">
                <TaskSearch
                    value={searchInput}
                    suggestions={suggestions}
                    isSearching={isFetching && Boolean(search)}
                    onChange={setSearchInput}
                    onSearch={handleSearch}
                />
                {!isMobile && (
                    <div className="flex items-center gap-2">
                        <TaskSort
                            pageKey={pageKey}
                            sortBy={query.sortBy}
                            sortDirection={query.sortDirection}
                            onChange={handleSort}
                        />

                        <TaskFilters filters={filters} onChange={handleFiltersChange} />
                    </div>
                )}
            </div>

            {isMobile && (
                <div className="flex items-center gap-2">
                    <TaskSort
                        pageKey={pageKey}
                        sortBy={query.sortBy}
                        sortDirection={query.sortDirection}
                        onChange={handleSort}
                    />

                    <TaskFilters filters={filters} onChange={handleFiltersChange} />
                </div>
            )}

            <div className="rounded-sm border bg-background overflow-hidden">
                <TaskTable tasks={tasks} view={tableView} />
            </div>

            <TaskPagination pagination={pagination} onPageChange={handlePageChange} />
        </div>
    );
}
