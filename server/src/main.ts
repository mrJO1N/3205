import express from "express";
import dotenv from "dotenv";
import users from "../data/users.json";

const app = express();
dotenv.config();

const PORT = Number(process.env.PORT ?? 80);

app.get("/", (req, res) => {
  res.redirect("/api/users");
});

app.get("/api/users", (req, res) => {
  const email = String(req.query.email ?? "");
  if (email) {
    const filteredUsers = users.find((user) => user.email.includes(email));
    return res.json(filteredUsers);
  }
  res.json(users);
});

app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}.http://localhost:${PORT}`)
);
