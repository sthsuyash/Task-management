import {Router} from "express";
import {
    createTask,
    deleteTask,
    deleteTasks,
    getTask,
    getTasks,
    updateTask,
    updateTaskStatus,
} from "../controllers/task.controller.js";

const taskRoutes = Router();

taskRoutes.get("/", getTasks);
taskRoutes.post("/", createTask);
taskRoutes.get("/:id", getTask);
taskRoutes.put("/:id", updateTask);
taskRoutes.delete("/:id", deleteTask);
taskRoutes.delete("/", deleteTasks);
taskRoutes.patch("/:id", updateTaskStatus);

export default taskRoutes;
