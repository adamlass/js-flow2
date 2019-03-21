
var _jokes = [
    "A day without sunshine is like, night.",
    "At what age is it appropriate to tell my dog that he's adopted?",
    "I intend to live forever, or die trying"
];


class Jokes {
    constructor(jokes) {
        this._jokes = jokes
    }
    getRandomJoke() {
        console.log(this._jokes);
        
        return this._jokes[Math.floor(Math.random() * _jokes.length)]
    }

    getAllJokes() {
        return this._jokes
    }

    addJoke(joke) {
        this._jokes.push(joke)
        
    }

    setJokes(jokes){
        this._jokes = jokes
    }
}

module.exports = new Jokes(_jokes)