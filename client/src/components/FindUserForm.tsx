import React, { useState } from "react";
import Joi from "joi";
import { getUsers } from "../API/main";
import { UI } from "./UI/main";
import { UserI } from "../types";
import "../styles/FindUserForm.css";

function FindUserFormI({ setUserList }: FindUserFormI) {
  const [filter, setFilter] = useState<UserI>({ email: "", num: "" });

  const joiSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    num: Joi.number().integer().min(100000).max(999999).allow(""),
  });

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    // if (filter.num===0)
    //validation
    const { error } = joiSchema.validate(filter);
    if (error) {
      alert(error.message.replace("num", "number"));
      console.error("Validation error:", error.details[0].message);
      return;
    }

    getUsers(filter.email, filter.num).then((data) => setUserList(data));
  };

  const onClearFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFilter({ email: "", num: "" });

    getUsers().then((users) => setUserList(users));
  };

  return (
    <div className="search-form">
      <h2>search</h2>
      <form id="find-user">
        <UI.Input
          type="email"
          name="user-email"
          id="user-email"
          placeholder="email"
          value={filter.email}
          onChange={(e) => setFilter({ ...filter, email: e.target.value })}
        />
        <UI.Input
          type="number"
          name="user-number"
          id="user-number"
          placeholder="number"
          value={filter.num}
          onChange={(e) => setFilter({ ...filter, num: e.target.value })}
        />
        <UI.Button onClick={(e) => onSubmit(e)}>search</UI.Button>
        <UI.Button onClick={(e) => onClearFilters(e)}>clear filters</UI.Button>
      </form>
    </div>
  );
}

interface FindUserFormI {
  setUserList: React.Dispatch<React.SetStateAction<UserI[]>>;
}

export default FindUserFormI;
