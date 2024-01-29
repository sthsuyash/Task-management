import express from "express";
import cors from "cors";

import {API_PORT} from "./config/env.js";
import routes from "./routes/index.js";

import logger from "./config/logger.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
    cors({
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
        origin: ["http://localhost:3001", "http://localhost:3000"],
    })
);

// Routes
app.use("/api/v1", routes);

try {
    app.listen(API_PORT, () => {
        logger.info(`Server listening on port ${API_PORT}`);
    });
} catch (error) {
    logger.error(`Error: ${error}`);
}
