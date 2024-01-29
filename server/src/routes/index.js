import express from "express";
import homeRoutes from "./home.routes.js";
import authRoutes from "./auth.routes.js";
import taskRoutes from "./task.routes.js";

import {verifyToken} from "../middleware/authMiddleware.js";

const router = express.Router();

router.use("/", homeRoutes);
router.use("/user", authRoutes);
router.use("/task", verifyToken, taskRoutes);

export default router;
