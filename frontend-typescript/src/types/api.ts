export type ApiErrorObject = {
    message: string;
    field?: string;
};

export type ApiResponse<T> = {
    success: boolean;
    code: string;
    message: string;
    data: T | null;
    errors: ApiErrorObject[] | null;
};
