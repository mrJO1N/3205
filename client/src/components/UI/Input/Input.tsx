import React, { InputHTMLAttributes } from "react";
import "./Input.css";

function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="Input" />;
}

export default Input;
