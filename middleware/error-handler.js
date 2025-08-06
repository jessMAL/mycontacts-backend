import { http_status_codes, error_titles } from "../constants.js";

export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode
        ? res.statusCode
        : http_status_codes.SERVER_ERROR;

    const title = error_titles[statusCode];

    if (title) {
        res.status(statusCode).json({
            title,
            message: err.message,
            stackTrace: err.stack,
        });
    } else {
        console.log("No matching error type. All good?");
        next(); // in case another handler needs to deal with it
    }
};
