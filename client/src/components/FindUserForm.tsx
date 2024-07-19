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

    filter.num = filter.num?.replace(/-/g, "");
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

  const numOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let { value } = e.currentTarget;

    // mask. "220055" => "22-00-55"
    value = value.replace(/-/g, "");
    value = value.replace(/(\d{2})(\d{1})/, "$1-$2");
    value = value.replace(/(\d{2})-(\d{2})(\d{1})/, "$1-$2-$3");
    if (value.length > 8) {
      value = value.slice(0, 8);
    }

    setFilter({ ...filter, num: value });
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
          type="text"
          name="user-number"
          id="user-number"
          placeholder="number"
          value={filter.num}
          onKeyUp={numOnKeyUp}
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
