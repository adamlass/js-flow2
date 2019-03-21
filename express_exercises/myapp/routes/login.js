var express = require("express")
var router = express.Router()
var jokes = require("../model/jokes")

router.get("/", (req,res,next) => {
    res.render("login", {amountOfJokes: jokes.getAllJokes().length})
})

module.exports = router