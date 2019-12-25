import React from "react";
import Radium from "radium";
import { Link, Redirect, withRouter } from "react-router-dom";
// Components
import Button from "../Button";

const Header = ({
  country,
  countries,
  setCountry,
  handleSettingsView,
  handleReset,
  location,
  loading,
  ...props
}) => {
  function handleCountryChange(e) {
    const countryName = e.target.value;

    props.history.push({
      pathname: "/matches",
      search: `?country=${countryName}`
    });

    handleReset();
    setCountry(e.target.value);
  }

  return (
    <nav style={Object.values(styles)}>
      <section>
        <Link to="/">
          <Button icon={"arrow_back"} />
        </Link>
      </section>

      <section>
        <select
          name="countrySelect"
          disabled={loading}
          onChange={handleCountryChange}
          value={country || "default"}
        >
          {!country && (
            <option value="default" disabled>
              Select a country
            </option>
          )}
          {countries.map((country, i) => (
            <option key={`country-${i}`} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
      </section>

      <section>
        {location === "/settings" ? (
          <Link to="/">
            <Button icon={"close"} />
          </Link>
        ) : (
          <span>
            <Button icon={"settings"} onClick={(e) => handleSettingsView(e)} />
          </span>
        )}
      </section>
    </nav>
  );
};

const styles = {
  layout: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  size: {
    padding: "0 1.25rem",
    height: "5rem",
    width: "100%"
  },
  theme: {
    backgroundColor: "#141414",
  }
};

export default React.memo(withRouter(Radium(Header)));
