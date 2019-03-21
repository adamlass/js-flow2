var express = require("express")
var router = express.Router()
var jokes = require("../model/jokes")

router.get("/", (req,res,next) => {
    if(!req.session.jokesCount) req.session.jokesCount = 0
    req.session.jokesCount += 1
    res.render("jokes", {jokes: jokes.getAllJokes()})
})

module.exports = router