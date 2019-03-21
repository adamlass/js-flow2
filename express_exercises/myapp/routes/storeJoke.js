var express = require("express")
var router = express.Router()
var jokes = require("../model/jokes")

router.post("/", (req, res, next) => {
    if(!req.session.storeJokeCount) req.session.storeJokeCount = 0
    req.session.storeJokeCount += 1
    console.log("Hello");
    
    console.log(req.body);
    jokes.addJoke(req.body.joke)
    res.render("addJoke", {amountOfJokes: jokes.getAllJokes().length})
})

module.exports = router