import {
    ChevronFirst,
    ChevronLast,
} from "lucide-react";

import type {
    TaskPagination as TaskPaginationInfo
} from "../../types/task-query.types";
import { getPages } from "@/lib/get-pages";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";

type TaskPaginationProps = {
    pagination?: TaskPaginationInfo;
    onPageChange: (page: number) => void;
};

export default function TaskPagination({
    pagination,
    onPageChange
}: TaskPaginationProps) {

    if (!pagination || pagination.totalPages <= 1) {
        return null;
    }

    const {
        page,
        totalPages,
        total
    } = pagination;

    const pages = getPages(page, totalPages);

    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">
                    {total}{" "}{total === 1 ? "Task" : "Tasks"}
                </p>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                Page {page}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                {totalPages} pages
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <Pagination className="mx-0 w-full sm:w-auto sm:justify-end">
                <PaginationContent className="w-full justify-between sm:w-auto sm:justify-center">
                    <PaginationItem>
                        <PaginationLink
                            href="#"
                            size="icon"
                            onClick={(e) => {
                                e.preventDefault();
                                onPageChange(1);
                            }}
                            aria-label="First Page"
                            aria-disabled={page === 1}
                            className={`rounded-sm ${page === 1 ? "pointer-events-none opacity-50" : ""}`}
                        >
                            <ChevronFirst />
                        </PaginationLink>
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                page > 1 && onPageChange(page - 1);
                            }}
                            aria-label="Previous Page"
                            aria-disabled={page === 1}
                            className={`rounded-sm ${page === 1 ? "pointer-events-none opacity-50" : ""}`}
                        />
                    </PaginationItem>

                    {
                        pages.map((pageNumber, index) => (
                            <PaginationItem key={index}>
                                {
                                    pageNumber === null
                                        ? <PaginationEllipsis />
                                        : (
                                            <PaginationLink
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    onPageChange(pageNumber);
                                                }}
                                                aria-label={`Page ${pageNumber}`}
                                                aria-current={pageNumber === page ? "page" : undefined}
                                                className={`rounded-sm ${pageNumber === page ? "bg-primary text-primary-foreground" : ""}`}
                                            >
                                                {pageNumber}
                                            </PaginationLink>
                                        )
                                }
                            </PaginationItem>
                        ))
                    }

                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                page < totalPages && onPageChange(page + 1);
                            }}
                            aria-label="Next Page"
                            aria-disabled={page === totalPages}
                            className={`rounded-sm ${page === totalPages ? "pointer-events-none opacity-50" : ""}`}
                        />
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationLink
                            href="#"
                            size="icon"
                            onClick={(e) => {
                                e.preventDefault();
                                onPageChange(totalPages);
                            }}
                            aria-label="Last Page"
                            aria-disabled={page === totalPages}
                            className={`rounded-sm ${page === totalPages ? "pointer-events-none opacity-50" : ""}`}
                        >
                            <ChevronLast />
                        </PaginationLink>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}