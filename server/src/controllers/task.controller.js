import prisma from "../config/prisma.js";
import logger from "../config/logger.js";
import {paginate} from "../utils/pagination.js";
import {API_URL} from "../config/env.js";

const api_name = `${API_URL}/task`;

/**
 * Create a new task for the logged in user
 *
 * @route POST /api/v1/task
 * @group Task - Operations about tasks
 * @param {string} title.body.required - task title
 * @param {string} description.body.required - task description
 * @returns {object} 200 - An object containing the task's title and description
 * @returns {Error} 500 - Unexpected error
 */
export const createTask = async (req, res) => {
    try {
        const {title, description} = req.body;

        if (!title) {
            logger.error(`${api_name}: title is required.`);
            return res.status(400).json({
                message: "Title is required.",
            });
        }

        if (!description) {
            logger.error(`${api_name}: description is required.`);
            return res.status(400).json({
                message: "Description is required.",
            });
        }

        const task = await prisma.task.create({
            data: {
                title,
                description,
                status: "TO_DO",
                user: {
                    connect: {
                        id: req.userId,
                    },
                },
            },
        });

        logger.info(`${api_name}: ${task.title} created successfully.`);
        res.status(200).json({
            message: "Task created successfully.",
        });
    } catch (error) {
        logger.error(`${api_name}: ${error}.`);
        res.status(500).json({
            message: "Something went wrong.",
        });
    }
};

/**
 * Get all tasks of the logged in user
 *
 * @route GET /api/v1/task
 * @group Task - Operations about tasks
 * @returns {object} 200 - An array of tasks
 * @returns {Error} 500 - Unexpected error
 */
export const getTasks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const conditions = req.user
            ? {
                  where: {
                      userId: req.userId,
                  },
              }
            : {};
        const tasks = await paginate("task", api_name, page, conditions);

        logger.info(`${api_name}: ${tasks.items.length} tasks found.`);
        res.status(200).json({
            message: `${tasks.items_in_page} ${tasks.items_in_page === 1 ? "task" : "tasks"} found.`,
            tasks,
        });
    } catch (error) {
        logger.error(`${api_name}: ${error}.`);
        res.status(500).json({
            message: "Something went wrong.",
        });
    }
};

/**
 * Get a task by id if authorized
 *
 * @route GET /api/v1/task/{id}
 * @group Task - Operations about tasks
 * @param {string} id.params.required - task id
 * @returns {object} 200 - An object containing the task's title and description
 * @returns {Error} 400 - Task does not exist
 * @returns {Error} 500 - Unexpected error
 */
export const getTask = async (req, res) => {
    try {
        const {id} = req.params;

        const task = await prisma.task.findUnique({
            where: {id},
        });

        if (!task) {
            logger.error(`${api_name}: ${id} does not exist.`);
            return res.status(400).json({
                message: "Task does not exist.",
            });
        }

        logger.info(`${api_name}: ${task.title} found.`);
        res.status(200).json({
            message: "Task found.",
            data: task,
        });
    } catch (error) {
        logger.error(`${api_name}: ${error}.`);
        res.status(500).json({
            message: "Something went wrong.",
        });
    }
};

/**
 * Update a task by id if authorized
 *
 * @route PUT /api/v1/task/{id}
 * @group Task - Operations about tasks
 * @param {string} id.params.required - task id
 * @param {string} title.body.required - task title
 * @param {string} description.body.required - task description
 * @returns {object} 200 - An object containing the task's title and description
 * @returns {Error} 400 - Task does not exist
 * @returns {Error} 500 - Unexpected error
 */
export const updateTask = async (req, res) => {
    try {
        const {id} = req.params;
        const {title, description} = req.body;

        if (!title) {
            logger.error(`${api_name}: title is required.`);
            return res.status(400).json({
                message: "Title is required.",
            });
        }

        if (!description) {
            logger.error(`${api_name}: description is required.`);
            return res.status(400).json({
                message: "Description is required.",
            });
        }

        const taskExists = await prisma.task.findUnique({
            where: {id},
        });

        if (taskExists.title === title) {
            logger.error(`${api_name}: ${title} already exists.`);
            return res.status(400).json({
                message: "Task title already exists.",
            });
        }

        if (taskExists.description === description) {
            logger.error(`${api_name}: ${description} already exists.`);
            return res.status(400).json({
                message: "Task description already exists.",
            });
        }

        const task = await prisma.task.update({
            where: {id},
            data: {
                title,
                description,
            },
        });

        if (!task) {
            logger.error(`${api_name}: does not exist.`);
            return res.status(400).json({
                message: "Task does not exist.",
            });
        }

        logger.info(`${api_name}: ${task.title} updated successfully.`);
        res.json({
            message: "Task updated successfully.",
        });
    } catch (error) {
        logger.error(`${api_name}: ${error}`);
        res.status(500).json({
            message: "Something went wrong.",
        });
    }
};

/**
 * Delete a task by id if authorized
 *
 * @route DELETE /api/v1/task/{id}
 * @group Task - Operations about tasks
 * @param {string} id.params.required - task id
 * @returns {object} 200 - An object containing the task's title and description
 * @returns {Error} 400 - Task does not exist
 * @returns {Error} 500 - Unexpected error
 */
export const deleteTask = async (req, res) => {
    try {
        const {id} = req.params;

        const task = await prisma.task.delete({
            where: {id},
        });

        if (!task) {
            logger.error(`${api_name}: ${id} does not exist`);
            return res.status(400).json({
                message: "Task does not exist.",
            });
        }

        logger.info(`${api_name}: ${task.title} deleted successfully`);
        res.status(200).json({
            message: "Task deleted successfully.",
        });
    } catch (error) {
        logger.error(`${api_name}: ${error}`);
        res.status(500).json({
            message: "Something went wrong.",
        });
    }
};

/**
 * Delete all tasks of the logged in user
 *
 * @route DELETE /api/v1/task
 * @group Task - Operations about tasks
 * @returns {object} 200 - An object containing the task's title and description
 * @returns {Error} 500 - Unexpected error
 */
export const deleteTasks = async (req, res) => {
    try {
        const tasks = await prisma.task.deleteMany({
            where: {
                userId: req.userId,
            },
        });

        logger.info(
            `${api_name}: ${tasks.length > 0 ? tasks.length : 0} tasks deleted${tasks.length > 0 ? " successfully" : "."}`
        );
        res.status(200).json({
            message: `${tasks.length > 0 ? tasks.length : 0} tasks deleted${tasks.length > 0 ? " successfully" : "."}`,
        });
    } catch (error) {
        logger.error(`${api_name}: ${error}`);
        res.status(500).json({
            message: "Something went wrong.",
        });
    }
};

/**
 * Update the status of a task by id if authorized
 *
 * @route PATCH /api/v1/task/{id}
 * @group Task - Operations about tasks
 * @param {string} id.params.required - task id
 * @param {string} status.body.required - task status
 * @returns {object} 200 - An object containing the task's title and description
 * @returns {Error} 400 - Task does not exist
 * @returns {Error} 500 - Unexpected error
 */
export const updateTaskStatus = async (req, res) => {
    try {
        const {id} = req.params;
        const {status} = req.body;

        if (!status) {
            logger.error(`${api_name}: Status is required.`);
            return res.status(400).json({
                message: "Status is required.",
            });
        }

        const task = await prisma.task.update({
            where: {id},
            data: {status},
        });

        if (!task) {
            logger.error(`${api_name}: ${id} does not exist.`);
            return res.status(400).json({
                message: "Task does not exist.",
            });
        }

        logger.info(`${api_name}: ${task.title} updated successfully.`);
        res.status(200).json({
            message: "Task updated successfully.",
        });
    } catch (error) {
        logger.error(`${api_name}: ${error}`);
        res.status(500).json({
            message: "Something went wrong.",
        });
    }
};
