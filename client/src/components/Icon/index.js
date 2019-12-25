import React from "react";

const Icon = ({ code, size, type = "material-icons" }) => {
  const isMaterial = type.includes("material");
  const isFlag = type.includes("flag");
  const getClassName = isFlag ? `flag-icon flag-icon-${code}` : type;

  return (
    <i className={getClassName} style={{ fontSize: `${size}rem` }}>
      {isMaterial && code}
    </i>
  );
};

export default Icon;
