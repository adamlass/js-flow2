const express = require('express')
const app = express()
const port = 3000

app.get("/", (req,res,next) => {
    console.log("Request was made", req.headers)
    next()
})

app.get('/', (req, res) => res.send('Hello WORLD!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))