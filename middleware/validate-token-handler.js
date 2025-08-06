import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

export const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorized");
            }
            req.user = decoded.user;
            next(); //important!
        });
    }

    if (!token) {
        res.status(401);
        throw new Error("User is not authorized or token missing");
    }
});
