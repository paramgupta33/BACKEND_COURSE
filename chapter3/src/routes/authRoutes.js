import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

// POST /register route to handle user registration
router.post("/register", (req, res) => {

    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);


    try {
        const insertUser = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        const result = insertUser.run(username, hashedPassword);

        //i want to add a todo for the user after registration
        const defaultTodo = "Welcome to your todo list!";
        const inserttodo = db.prepare("INSERT INTO todos (user_id, task) VALUES (?, ?)");
        inserttodo.run(result.lastInsertRowid, defaultTodo);

        //jwt token generation
        const token = jwt.sign({ id: result.lastInsertRowid }, process.env.JWT_SECRET, { expiresIn: "24h" });
        res.json({token});

    } catch (error) {

        console.error("Error occurred while registering user:", error);
        res.status(500).send("Internal Server Error");
    }


});

router.post("/login", (req, res) => {});

export default router;