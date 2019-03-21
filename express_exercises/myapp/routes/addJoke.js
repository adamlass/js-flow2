var express = require("express")
var router = express.Router()
const jokes = require("../model/jokes")

router.get("/", (req, res, next) =>{
    res.render("addJoke", {
        amountOfJokes: jokes.getAllJokes().length
    })
})

module.exports = router