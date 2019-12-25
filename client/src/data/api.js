function clientFetch(endpoint = "", method = "GET") {
  return fetch(endpoint, {
    method
  });
}

export async function fetchLeaguesByCountry(country) {
  return await clientFetch(`/countries/${country}`).then(res => res.json());
}

export async function fetchLeagueById(id) {
  return await clientFetch(`/matches/${id}`).then(res => res.json());
}

export async function fetchLeagueStandings(id) {
  return await clientFetch(`/standings/${id}`).then(res => res.json());
}

// export async function fetchLeagueClubs(id) {
//   return await clientFetch(`/clubs/${id}`).then(res => res.json());
// }

export async function fetchMapData() {
  return await clientFetch(`/map/data`).then(res => res.json());
}