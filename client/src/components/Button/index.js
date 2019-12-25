import React from "react";
import Radium from "radium";
// Components
import Icon from "../Icon";

const Button = ({
  label,
  icon,
  iconSize = 2,
  override,
  overrideStyles,
  ...props
}) => {
  const componentStyles = override ? overrideStyles : Object.values(styles);

  return (
    <button style={componentStyles} {...props}>
      {label}
      <Icon code={icon} size={iconSize} />
    </button>
  );
};

const styles = {
  layout: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly"
  },
  size: {
    maxHeight: "3rem",
    maxWidth: "3rem",
    width: "3rem",
    height: "3rem",
    padding: 0
  },
  theme: {
    borderRadius: "100%",
    border: "1px solid #E0EDFF",
    backgroundColor: "unset",
    color: "#509AFF",
    ":hover": {
      cursor: "pointer"
    }
  }
};

export default Radium(Button);
