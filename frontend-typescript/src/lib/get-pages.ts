export function getPages(page: number, totalPages: number) {    
    if(totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if(page <= 4) {
        return [1, 2, 3, 4, 5, null, totalPages];
    }

    if(page >= totalPages - 3) {
        return [1, null, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, null, page - 1, page, page + 1, null, totalPages];
}