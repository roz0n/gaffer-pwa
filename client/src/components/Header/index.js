import React from "react";
import Radium from "radium";
import { Link } from "react-router-dom";
// Components
import Button from "../Button";

const Header = ({
  countries,
  leagues,
  setCountry,
  setActiveLeagueId,
  handleReset,
  location,
  loading
}) => {
  function handleCountryChange(e) {
    setCountry(e.target.value);
    handleReset();
  }

  function handleLeagueChange(e) {
    setActiveLeagueId(e.target.value);
  }

  return (
    <nav style={[styles.layout, styles.size, styles.theme]}>
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
        >
          {countries.map((country, i) => (
            <option key={`country-${i}`} value={country.toLowerCase()}>
              {country}
            </option>
          ))}
        </select>{" "}
        <select
          name="leagueSelect"
          disabled={loading}
          onChange={handleLeagueChange}
          defaultValue="default"
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

export default React.memo(Radium(Header));
