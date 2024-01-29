import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {API_URL, JWT_SECRET, MAIL_SECRET} from "../config/env.js";
import logger from "../config/logger.js";

const api_name = `${API_URL}/user`;

/**
 * Register a new user
 *
 * @route POST /api/v1/user/register
 * @group Auth - Operations about authentication
 * @param {string} email.body.required - email
 * @param {string} name.body.required - name
 * @param {string} password.body.required - password
 * @returns {object} 200 - An object containing the user's name
 * @returns {Error} 400 - name already exists
 * @returns {Error} 500 - Unexpected error
 */
export const register = async (req, res) => {
    try {
        const {email, name, password} = req.body;

        if (!email) {
            return res.status(400).send({message: "Email is required"});
        }
        if (!name) {
            return res.status(400).send({message: "Name is required"});
        }
        if (!password) {
            return res.status(400).send({message: "Password is required"});
        }

        // check email
        if (!email.match(/^[A-Za-z0-9+_.-]+@(.+)$/)) {
            return res.status(400).json({message: "Invalid email"});
        }

        // check password
        if (password.length < 6) {
            return res.status(400).json({message: "Password must be at least 6 characters"});
        }

        const existingUser = await prisma.user.findUnique({where: {email}});
        if (existingUser) {
            return res.status(400).send({message: "Email already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            },
        });
        res.status(201).json({
            message: "User created successfully",
        });
    } catch (error) {
        logger.error(`${api_name}/register: ${error}`);
        res.status(500).json({message: "Something went wrong"});
    }
};

/**
 * Login a user
 *
 * @route POST /api/v1/user/login
 * @group Auth - Operations about authentication
 * @param {string} email.body.required - email
 * @param {string} password.body.required - password
 * @returns {object} 200 - An object containing the user's name and token
 * @returns {Error} 400 - Invalid credentials
 * @returns {Error} 500 - Unexpected error
 */
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email) {
            logger.error(`${api_name}/login: ${email} failed to login, email is required`);
            return res.status(400).send({message: "Email is required"});
        }
        if (!password) {
            logger.error(`${api_name}/login: ${email} failed to login, password is required`);
            return res.status(400).send({message: "Password is required"});
        }

        const user = await prisma.user.findUnique({where: {email}});
        if (!user) {
            logger.error(`${api_name}/login: ${email} failed to login, email does not exist`);
            return res.status(400).send({message: "Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            logger.error(`${api_name}/login: ${user.name} failed to login, password is incorrect`);
            return res.status(400).send({message: "Invalid credentials"});
        }

        const token = jwt.sign(
            {
                id: user.id,
                name: user.name,
                email: user.email,
                expiry: Date.now() + 1000 * 60 * 60 * 24, // 1 day
            },
            JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        logger.info(`${api_name}/login: ${user.name} logged in successfully`);
        res.json({
            message: "User logged in successfully",
            token,
        });
    } catch (error) {
        logger.error(`${api_name}/login: ${error}`);
        res.status(500).json({message: `${error}`});
    }
};

/**
 * Forgot password
 *
 * @route POST /api/v1/user/forgot-password
 * @group Auth - Operations about authentication
 * @param {string} email.body.required - email
 * @returns {object} 200 - An object containing the user's name
 * @returns {Error} 400 - Email does not exist
 * @returns {Error} 500 - Unexpected error
 */
export const forgotPassword = async (req, res) => {
    try {
        const {email} = req.body;

        if (!email) {
            logger.error(`${api_name}/forgot-password: email is required`);
            return res.status(400).json({message: "Email is required"});
        }

        const user = await prisma.user.findUnique({where: {email}});
        if (!user) {
            logger.error(`${api_name}/forgot-password: ${email} does not exist`);
            return res.status(400).json({message: "Email does not exist"});
        }
    } catch (e) {}
};

/**
 * Reset password
 *
 * @route POST /api/v1/user/reset-password
 * @group Auth - Operations about authentication
 * @param {string} email.body.required - email
 * @param {string} password.body.required - password
 * @param {string} token.params.required - token
 * @returns {object} 200 - An object containing the user's name
 * @returns {Error} 400 - Email does not exist
 * @returns {Error} 500 - Unexpected error
 */
export const resetPassword = async (req, res) => {
    try {
        const {token} = req.params;
        const {password} = req.body;

        if (!password) {
            logger.error(`${api_name}/reset-password: password is required`);
            return res.status(400).json({message: "Password is required"});
        }

        const {email} = jwt.verify(token, MAIL_SECRET);

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.findUnique({where: {email}});
        if (!user) {
            logger.error(`${api_name}/reset-password: ${email} does not exist`);
            return res.status(400).json({message: "Email does not exist"});
        }

        await prisma.user.update({
            where: {email},
            data: {password: hashedPassword},
        });

        logger.info(`${api_name}/reset-password: ${user.name} reset password successfully`);
        res.status(200).json({
            message: "Password reset successfully",
        });
    } catch (error) {
        logger.error(`${api_name}/reset-password: ${error}`);
        res.status(500).json({message: `${error}`});
    }
};
