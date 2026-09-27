import {DatabaseSync} from "node:sqlite";
const db = new DatabaseSync("mydatabase.db");
db.exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY autoincrement, username TEXT UNIQUE, password TEXT)");

db.exec("CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY autoincrement,user_id INTEGER, task TEXT, completed BOOLEAN DEFAULT FALSE, FOREIGN KEY(user_id) REFERENCES users(id))");
console.log(db.prepare("SELECT id, username FROM users").all());
export default db;