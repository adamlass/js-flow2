const express = require("express")
const http = require("http")
//Basic Calculator
function add(n1, n2) {
    return n1 + n2
}
//End of Basic Calculator



//REST Calculator
function calcServer(port, isStartedCb) {
    const app = express()
    app.get("/api/calc/add/:n1/:n2", (req, res, next) => {
        const n1 = Number(req.params.n1)
        const n2 = Number(req.params.n2)

        res.send({ res: add(n1, n2) })
    })

    let server = http.createServer(app)

    //Starting the server  
    setTimeout(() =>
        server.listen(port, () => {
            isStartedCb(server)
        })
        , 200)

}

//End of REST Calculator

module.exports = {
    add,
    calcServer

}
