export const http_status_codes = {
    VALIDATION_ERROR: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
};

export const error_titles = {
    [http_status_codes.VALIDATION_ERROR]: "Validation failed",
    [http_status_codes.UNAUTHORIZED]: "Unauthorized",
    [http_status_codes.FORBIDDEN]: "Forbidden",
    [http_status_codes.NOT_FOUND]: "Not Found",
    [http_status_codes.SERVER_ERROR]: "Server error",
};
