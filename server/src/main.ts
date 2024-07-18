import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { getUsers } from "./controllers/users.controller";

const app = express();
dotenv.config();

const PORT = Number(process.env.PORT ?? 80);
const TIMEOUT = Number(process.env.TIMEOUT ?? 0);

app.use(cors());

app.get("/", (req, res) => {
  res.redirect("/api/users");
});

app.get("/api/users", (req, res) => {
  setTimeout(() => getUsers(req, res), TIMEOUT);
});

app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}.http://localhost:${PORT}`)
);
