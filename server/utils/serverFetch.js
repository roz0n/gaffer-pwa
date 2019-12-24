const got = require("got");

function serverFetch(endpoint, id = "", method = "GET") {
  const url = "https://api.football-data.org/v2/";
  const authToken = "1293be4dfdd04c1f828ecf8f244f8515"; // This is a public key
  const endpoints = {
    competitions: () => "competitions/",
    leagues: id => `competitions/${id}/matches`,
    clubs: id => `competitions/${id}/teams`,
    standings: id => `competitions/${id}/standings`
  };
  const options = {
    headers: {
      "X-Auth-Token": authToken
    }
  };
  const httpMethods = {
    GET: "get",
    POST: "post"
  };
  return got[httpMethods[method]](`${url}${endpoints[endpoint](id)}`, options);
}

module.exports = serverFetch;