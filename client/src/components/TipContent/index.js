import React from "react";
import Icon from "../Icon";
import { roundLargeNumber } from "../../utils/numberUtils";

const TipContent = ({ geoObject, data }) => {
  const { POP_EST } = geoObject.properties;

  return (
    <article>
      <Icon type="flag" code={data?.code} />{" "}
      <span>{`${data?.name} — ${roundLargeNumber(POP_EST)}`}</span>
    </article>
  );
};

export default TipContent;
