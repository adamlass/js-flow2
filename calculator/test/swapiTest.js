// const expect = require("chai").expect;
const assert = require("assert")
const swapi = require("../module/swapi");
const nock = require("nock");
const testPerson = {"name": "Luke Skywalker", "height": "172", "mass": "77",}
const testStarship = {"name": "Starship", "height": "172", "mass": "77",}
const testPlanet = {"name": "planet", "mass": "77",}

const n = nock('https://swapi.co');
describe('swapiModule Get person', function () {
    //If you comment out this part, it will fetch from the REAL API (swapi.co/api)
    beforeEach(function () {
        n.get('/api/people/1').reply(200, testPerson);
        n.get('/api/starship/1').reply(200, testStarship);
        n.get('/api/planet/1').reply(200, testPlanet);
    });
    //Observe the use of async/await to handle promises (no need for done)
    it('should fetch Luke Skywalker', async function () {
        let person = await swapi.getPerson(1);
        assert.equal(person.name, "Luke Skywalker")
    });

    it('should fetch Luke Skywalker', async function () {
        let starship = await swapi.getStarship(1);
        assert.equal(starship.name, "Starship")
    });

    it('should fetch Luke Skywalker', async function () {
        let planet = await swapi.getPlanet(1);
        assert.equal(planet.name, "planet")
    });
});