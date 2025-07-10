import sqlite3 from "sqlite3";
import { open } from "sqlite";

let dbPromise = open({
  filename: "./blog.db",
  driver: sqlite3.Database,
});

export default dbPromise;

