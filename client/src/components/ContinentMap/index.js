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
import EmptyContent from "../../components/EmptyContent";
import Icon from "../../components/Icon";
// Utils
import COUNTRIES from "../../constants/countries";
import { fetchMapData } from "../../data/api";
import { roundLargeNumber } from "../../utils/numberUtils";

// TODO: Lots of work to do in this component
const ContinentMap = ({ tipContent, setTooltipContent, style }) => {
  // Loading states
  const [loading, setLoading] = useState(false);
  const [mapData, setMapData] = useState(null);
  const [error, setError] = useState(false);

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
                    const TipContent = () => {
                      const { POP_EST } = geo.properties;

                      return (
                        <article>
                          <Icon type="flag" code={countryData?.code} />{" "}
                          <span>{`${countryData.name} — ${roundLargeNumber(
                            POP_EST
                          )}`}</span>
                        </article>
                      );
                    };

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
