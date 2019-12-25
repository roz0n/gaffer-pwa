import React, { useState } from "react";
import Radium from "radium";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule
} from "react-simple-maps";
// Components
import Icon from "../../components/Icon";
// Constants
import COUNTRIES from "../../constants/countries";

// TODO: Lots of work to do in this component
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

const MapChart = ({ setTooltipContent, style }) => {
  return (
    <ComposableMap
      data-tip=""
      style={style}
      projection="geoAzimuthalEqualArea"
      projectionConfig={{
        rotate: [-10.0, -52.0, -10],
        scale: 900
      }}
    >
      <Graticule stroke="#181818" />
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => {
            const geoName = geo.properties.NAME;
            const countryData = Object.values(COUNTRIES).find(
              country =>
                country.name === geoName?.toLowerCase() ||
                country.altName === geoName?.toLowerCase()
            );

            if (countryData?.name) {
              const TipContent = () => {
                const { POP_EST } = geo.properties;

                return (
                  <article>
                    <Icon type="flag" code={countryData?.code} />{" "}
                    <span>{`${countryData.name} — ${rounded(POP_EST)}`}</span>
                  </article>
                );
              };

              return (
                <Link key={`${geo.rsmKey}-Link`} to={`/matches/${countryData?.name}`}>
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#9998A3"
                    style={countryStyles}
                    onMouseEnter={() => setTooltipContent(<TipContent />)}
                    onMouseLeave={() => setTooltipContent(null)}
                  />
                </Link>
              );
            } else {
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#404040"
                  stroke="#404040"
                />
              );
            }
          })
        }
      </Geographies>
    </ComposableMap>
  );
};

const World = Radium(() => {
  const [content, setContent] = useState("");

  return (
    <div style={styles.layout}>
      <article
        style={{
          color: "white",
          position: "absolute",
          fontSize: "2rem",
          userSelect: "none",
          maxWidth: "100vw",
          width: "100vw",
          textAlign: "center",
          top: "2.5rem",
          letterSpacing: ".5rem"
        }}
      >
        <h1>GAFFER</h1>
      </article>

      <MapChart
        setTooltipContent={setContent}
        style={{ height: "100%", width: "100%" }}
      />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
});

const styles = {
  layout: {
    position: "relative",
    height: "100vh",
    width: "100vw",
    backgroundColor: "black",
    overflow: "hidden"
  }
};

const countryStyles = {
  default: {
    strokeWidth: ".2rem"
  },
  hover: {
    fill: "red"
  },
  pressed: {}
};

export { World as WorldView };
