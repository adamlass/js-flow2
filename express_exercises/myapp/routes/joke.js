var express = require("express")
var router = express.Router()
const jokes = require("../model/jokes")

router.get("/", (req,res,next) => {
    if(!req.session.jokeCount) req.session.jokeCount = 0
    req.session.jokeCount += 1
    console.log(req.session.jokeCount);
    
    res.render("joke", {joke:jokes.getRandomJoke() })
})

module.exports = router