import React, { ButtonHTMLAttributes } from "react";
import "./Button.css";

function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className="Button">
      {props.children}
    </button>
  );
}

export default Button;
