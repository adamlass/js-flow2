var express = require("express")
var router = express.Router()
var jokes = require("../model/jokes")

router.post("/joke", (req,res,next) => {
    console.log(req.body)
    var joke = req.body.joke
    jokes.addJoke(joke)
    res.json(joke)
})

router.get("/joke/random", (req,res,next) => {
    // if(true){
    //     let err = new Error("Error in REST");
    //     err.rest=true; //Look for this in the existing error-handler 
    //     throw err;
    // }
    
    res.json(jokes.getRandomJoke())
})

router.get("/jokes", (req,res,next) => {
    res.json(jokes.getAllJokes())
})

module.exports = router