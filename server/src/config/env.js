import dotenv from "dotenv";
dotenv.config();

/* Database config */
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PORT = process.env.DB_PORT || 5432;
export const DB_NAME = process.env.DB_NAME || "todo";
export const DB_USER = process.env.DB_USER || "postgres";
export const DB_PASSWORD = process.env.DB_PASSWORD || "postgres";

/* Server config */
export const DOMAIN = process.env.DOMAIN;
export const CLIENT_PORT = process.env.CLIENT_PORT || 3001;
export const CLIENT_URL = process.env.CLIENT_URL || `http://localhost:${CLIENT_PORT}`;
export const API_PORT = process.env.API_PORT || 3000;
export const API_URL = process.env.API_URL || `http://localhost:${API_PORT}/api/v1`;

/* JWT config */
export const JWT_SECRET = process.env.JWT_SECRET || "secret";

/* Mail config */
export const MAIL_SECRET = process.env.MAIL_SECRET || "secret";

/* Environment config */
export const NODE_ENV = process.env.NODE_ENV;
export const IS_PROD = NODE_ENV === "production";
