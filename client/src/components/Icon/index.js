import React from "react";

const Icon = ({ code, size }) => {
  return <i className="material-icons" style={{ fontSize: `${size}rem` }}>{code}</i>;
};

export default Icon;
