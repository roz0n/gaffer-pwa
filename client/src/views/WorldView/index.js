import React from "react";
import Radium from "radium";
import { Link } from "react-router-dom";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule
} from "react-simple-maps";
// Constants
import COUNTRIES from "../../constants/countries";

// TODO: Can this be a hash?
const countriesList = [
  ...Object.values(COUNTRIES).map(country => country.name),
  ...Object.values(COUNTRIES).map(country => country.altName)
];

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = ({ style }) => {
  return (
    <ComposableMap
      style={style}
      preserveAspectRatio={true}
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
            const countryName = geoName?.toLowerCase();

            if (countriesList.includes(countryName)) {
              return (
                <Link to={`/matches/${countryName}`}>
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#9998A3"
                    stroke="#EAEAEC"
                    style={countryStyles}
                  />
                </Link>
              );
            } else {
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#000000"
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

let World = () => {
  return (
    <div style={styles.layout}>
      <MapChart style={{ height: "100%", width: "100%" }} />
    </div>
  );
};

const styles = {
  layout: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "black",
    overflow: "hidden"
  }
};

const countryStyles = {
  default: {},
  hover: {
    fill: "red"
  },
  pressed: {}
};

World = Radium(World);
export { World as WorldView };
