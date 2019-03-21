const fetch = require("node-fetch")
var URL = "https://swapi.co/api/";

function getPerson(id) {
  return fetch(URL + "people/" + id)
    .then(res => {
      if (!res.ok) {
        return res.json().then(data => { throw data });
      }
      return res.json()
    });
}

function getStarship(id) {
  return fetch(URL + "starship/" + id)
    .then(res => {
      if (!res.ok) {
        return res.json().then(data => { throw data });
      }
      return res.json()
    });
}

function getPlanet(id) {
  return fetch(URL + "planet/" + id)
  .then(res => {
    if (!res.ok) {
      return res.json().then(data => { throw data });
    }
    return res.json()
  });
}



module.exports = { getPerson, getStarship, getPlanet }