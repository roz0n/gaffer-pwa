import React from "react";
import Radium from "radium";
import { Link } from "react-router-dom";
// Components
import Button from "../../components/Button"

let World = () => {
  return (
    <div>
      <Link to="match">
        <Button label={"Go"} override={true} />
      </Link>
    </div>
  );
};

World = Radium(World);
export { World as WorldView };
