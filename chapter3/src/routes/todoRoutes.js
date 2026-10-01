import express from "express";
import db from "../db.js";

const router = express.Router();

// GET / route to fetch all todos
router.get("/", (req, res) => {
    const getTodos = db.prepare("Select * from todos where user_id = ?");
    const todos = getTodos.all(req.userId);
    res.json(todos);
});


router.post("/", (req, res) => {
    const { task } = req.body;
    const insertTodo = db.prepare("INSERT INTO todos (user_id, task) VALUES (?, ?)");
    const result = insertTodo.run(req.userId, task);
    
    res.json({ id: result.lastInsertRowid, task, completed: 0 });
});

router.put("/:id", (req, res) => {
    const { completed } = req.body;
    const {id} = req.params;
    const updateTodo = db.prepare("UPDATE todos SET completed = ? WHERE id = ?");
    const result = updateTodo.run(completed, id);
    res.json({ message: "Todo updated successfully" });
});

router.delete("/:id", (req, res) => {
    const {id} = req.params;
    const deleteTodo = db.prepare("DELETE FROM todos WHERE id = ? AND user_id = ?");
    const result = deleteTodo.run(id, req.userId);
    res.json({ message: "Todo deleted successfully" });
    res.send({message: "Todo deleted successfully"});
});

export default router;