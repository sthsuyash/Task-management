import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config/env.js";
import logger from "../config/logger.js";

export const verifyToken = (req, res, next) => {
    const authorization = req.headers["authorization"];

    if (!authorization || !authorization.startsWith("Bearer")) {
        logger.error("No token provided");
        return res.status(403).json({message: "No token provided"});
    }

    const token = authorization.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
    } catch (error) {
        logger.error(`User: ${req.userId} - Unauthorized`);
        return res.status(401).json({message: "Unauthorized"});
    }
    next();
};
