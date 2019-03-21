var expect = require("chai").expect;
var http = require('http');
var app = require('../app');
var fetch = require("node-fetch");
var TEST_PORT = 3344;
var URL = `http://localhost:${TEST_PORT}/api`;
var jokes = require("../model/jokes");
var server;
describe("Verify the Joke API", function () {
  before(function (done) {
    server = http.createServer(app);
    server.listen(TEST_PORT, () => {
      console.log("Server Started")
      done()
    })
  })
  after(function (done) {
    server.close();
    done();
  })
  beforeEach(function () {
    jokes.setJokes(["aaa", "bbb", "ccc"])
  })

  it("Should add the joke 'ddd", async function () {
    var init = {
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({ joke: "ddd" })
    }
    await fetch(URL + "/joke", init).then(r => r.json());
    //Verify result
    expect(jokes.getAllJokes()).lengthOf(4);
    expect(jokes.getAllJokes()).to.include("ddd")
  })

  it("should get all jokes", async function () {
    
    await fetch(URL + "/jokes").then(r => r.json());
    //Verify result
    expect(jokes.getAllJokes()).lengthOf(3);
  })

  it("should get random jokes", async function () {
    
    let joke = await fetch(URL + "/joke/random").then(r => r.json());
    console.log("joke",joke)
    //Verify result
    expect(jokes.getAllJokes()).to.include(joke)
  })
  
})

