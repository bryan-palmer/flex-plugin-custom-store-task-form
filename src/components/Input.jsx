import React from "react";

const Input = props => (
  <div>
    <label>{props.title}</label>
    <input
      id={props.name}
      name={props.name}
      type={props.type}
      value={props.value}
      onChange={props.handleChange}
      placeholder={props.placeholder}
      disabled={props.disabled}
    />
  </div>
);

export default Input;
