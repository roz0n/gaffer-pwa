import React from "react";
import Radium from "radium";
import { Link, Redirect, withRouter } from "react-router-dom";
// Components
import Button from "../Button";

const Header = ({
  country,
  countries,
  leagues,
  setCountry,
  setActiveLeagueId,
  handleReset,
  location,
  loading,
  ...props
}) => {
  function handleCountryChange(e) {
    const countryName = e.target.value;

    setCountry(e.target.value);
    handleReset();
    
    props.history.push({
      pathname: "/matches",
      search: `?country=${countryName}`
    });
  }

  function handleLeagueChange(e) {
    setActiveLeagueId(e.target.value);
  }

  return (
    <nav style={Object.values(styles)}>
      <section>
        <Link to="/">
          <Button icon={"language"} />
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
        </select>{" "}
        <select
          name="leagueSelect"
          disabled={loading}
          onChange={handleLeagueChange}
          value={"default"}
        >
          <option value="default" disabled>
            Select a league
          </option>

          {leagues?.map((league, i) => (
            <option key={`league-${i}`} value={league.id}>
              {league.name}
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
          <Link to="/settings">
            <Button icon={"settings"} />
          </Link>
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
    height: "4rem",
    width: "100%"
  },
  theme: {
    borderBottom: "1px solid #E0EDFF"
  }
};

export default React.memo(withRouter(Radium(Header)));
