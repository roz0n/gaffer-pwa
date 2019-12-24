import React from "react";
import Radium from "radium";
import { Link } from "react-router-dom";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = ({ style }) => {
  return (
    <ComposableMap
      style={style}
      projection="geoAzimuthalEqualArea"
      projectionConfig={{
        rotate: [-20.0, -52.0, 0],
        scale: 700
      }}
    >
      <Graticule stroke="#EAEAEC" />
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#9998A3"
              stroke="#EAEAEC"
            />
          ))
        }
      </Geographies>
    </ComposableMap>
  );
};

let World = () => {
  return (
    <div style={styles.layout}>
      <Link to="match">
        <MapChart style={{ height: "100%", width: "100%" }} />
      </Link>
    </div>
  );
};

const styles ={
  layout: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "black",
    overflow: "hidden"
  }
}

World = Radium(World);
export { World as WorldView };
