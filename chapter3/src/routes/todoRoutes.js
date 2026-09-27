import express from "express";
import db from "../db.js";

const router = express.Router();

// GET / route to fetch all todos
router.get("/", (req, res) => {});


router.post("/", (req, res) => {});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

export default router;