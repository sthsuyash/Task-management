import {createLogger, format, transports} from "winston";
import {IS_PROD} from "./env.js";

/**
 * Create a Winston logger that streams to `logs/type_of_log.log`
 *
 */
const logger = createLogger({
    format: format.combine(format.timestamp(), format.json()),
    transports: [
        new transports.File({filename: "logs/error.log", level: "error"}),
        new transports.File({filename: "logs/warn.log", level: "warn"}),
        new transports.File({filename: "logs/info.log", level: "info"}),
        new transports.File({filename: "logs/debug.log", level: "debug"}),
    ],
});

/**
 * This will print all logs to the `combined.log` file
 *
 * If we're not in production then log to the `console` with the format:
 * `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
 */
if (!IS_PROD) {
    logger.add(
        new transports.Console({
            format: format.combine(format.colorize(), format.simple()),
        })
    );
}

export default logger;
