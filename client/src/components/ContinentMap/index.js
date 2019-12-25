import React, { useState, useEffect } from "react";
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
import TipContent from "../../components/TipContent";
import EmptyContent from "../../components/EmptyContent";
import Icon from "../../components/Icon";
// Utils
import COUNTRIES from "../../constants/countries";
import { fetchMapData } from "../../data/api";

function YouTubeVideo({ id }) {
  return (
    <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&mute=1&loop=1&controls=0&showinfo=0&modestbranding=0`}
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  );
}

// TODO: Lots of work to do in this component
const ContinentMap = ({ tipContent, setTooltipContent, style }) => {
  const [mapData, setMapData] = useState(null);
  const [videoActive, setVideoActive] = useState(false);
  // Loading states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function handleMouseEnter(e, geo, data) {
    console.log("Mouse has entered");
    setVideoActive(true);
    setTooltipContent(<TipContent geoObject={geo} data={data} />);
  }

  function handleMouseLeave() {
    console.log("Mouse has left");
    setVideoActive(false);
    setTooltipContent(null);
  }

  useEffect(() => {
    async function getMapData() {
      try {
        const request = await fetchMapData();
        setMapData(request.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (!mapData) {
      getMapData();
    }
  }, [mapData]);

  return (
    <>
      {videoActive && (
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              width: "100vw",
              height: "200vh",
              top: "-50rem",
              zIndex: "-2"
            }}
          >
            <YouTubeVideo id={"TlSf0zJrNNI"} />
          </div>
        </div>
      )}
      {mapData && !error ? (
        <div style={{ height: "100%" }}>
          <ComposableMap
            data-tip=""
            style={style}
            projection="geoAzimuthalEqualArea"
            projectionConfig={{
              rotate: [-10, -48, -2],
              scale: 900
            }}
            showCenter={true}
          >
            <Graticule stroke="#181818" />
            <Geographies geography={mapData}>
              {({ geographies }) =>
                geographies.map(geo => {
                  const geoName = geo.properties.NAME;
                  const countryData = Object.values(COUNTRIES).find(
                    country =>
                      country.name === geoName?.toLowerCase() ||
                      country.altName === geoName?.toLowerCase()
                  );

                  if (countryData?.name) {
                    return (
                      <Link
                        key={`${geo.rsmKey}-Link`}
                        to={{
                          pathname: "/matches",
                          search: `?country=${countryData.name}`
                        }}
                        state={{ selectedCountry: countryData?.name }}
                      >
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill="#9998A3"
                          style={styles}
                          onMouseEnter={e =>
                            handleMouseEnter(e, geo, countryData)
                          }
                          onMouseLeave={() => handleMouseLeave()}
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
          <ReactTooltip>{tipContent}</ReactTooltip>
        </div>
      ) : (
        <div style={{ height: "100%", color: "#ffffff" }}>
          <EmptyContent message={"Warming up..."} />
        </div>
      )}

      {error && (
        <EmptyContent message={"There was an error loading the map"}>
          <button onClick={() => alert("Try again")}>Try again?</button>
        </EmptyContent>
      )}
    </>
  );
};

const styles = {
  default: {
    strokeWidth: ".2rem"
  },
  hover: {
    fill: "red"
  },
  pressed: {}
};

export default Radium(ContinentMap);
