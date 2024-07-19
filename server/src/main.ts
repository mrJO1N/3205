import express, { Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { getUsers } from "./controllers/users.controller";

const app = express();
dotenv.config();

const PORT = Number(process.env.PORT ?? 80);
const TIMEOUT = Number(process.env.TIMEOUT ?? 0);
let routeUsersProps: { timeout?: NodeJS.Timeout; res?: Response } = {};

app.use(cors());

app.get("/", (req, res) => {
  res.redirect("/api/users");
});

app.get("/api/users", (req, res) => {
  if (routeUsersProps.timeout) {
    clearTimeout(routeUsersProps.timeout);
    routeUsersProps.res?.status(418).send();
  }

  routeUsersProps.res = res;
  routeUsersProps.timeout = setTimeout(() => {
    getUsers(req, res);
  }, TIMEOUT);
});

app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}.http://localhost:${PORT}`)
);
