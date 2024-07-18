import { Request, Response } from "express";
import users from "../../data/users.json";

export const getUsers = (req: Request, res: Response) => {
  const email = String(req.query.email ?? ""),
    num = String(req.query.number ?? "");

  let requiredUsers;

  if (email) {
    const filteredUsers = users.filter((user) => user.email.includes(email));
    requiredUsers = filteredUsers.map((user) => {
      return { num: user.number, email: user.email };
    });
  } else {
    requiredUsers = users.map((user) => {
      return { num: user.number, email: user.email };
    });
  }

  if (num && requiredUsers.length > 0) {
    const filteredUsers = requiredUsers.filter(
      (user) => user.num === Number(num)
    );
    requiredUsers = filteredUsers;
  }
  res.json(requiredUsers);
};
