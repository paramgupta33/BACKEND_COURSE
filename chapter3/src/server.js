import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//middleware to serve static files from the public directory
app.use(express.static(path.join(dirname(fileURLToPath(import.meta.url)), "..", "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(dirname(fileURLToPath(import.meta.url)), "..", "public", "index.html"));
});
console.log(`hello world`);


app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
