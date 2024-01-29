import express from "express";
import {home} from "../controllers/home.controller.js";

const homeRoutes = express.Router();

homeRoutes.get("/", home);

export default homeRoutes;
