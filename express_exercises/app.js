const express = require("express");
let app = express();
const PORT = 3000;

app.use("/*",(req,res,next) =>{
    console.log(`TimeStamp: ${new Date().toJSON()} - ${JSON.stringify(req.headers)}`)
})

app.use("/api/calculator/:operation/:n1/:n2", function(req,res,next){ 
    var calculatorRequest = {
        operation: req.params.operation,
        n1: Number(req.params.n1),
        n2: Number(req.params.n2)
    }
    req.calculatorRequest = calculatorRequest
    next()
 })
app.get("/api/calculator/*",function(req,res){ 

    console.log(req.calculatorRequest);
    res.json(req.calculatorRequest)
    
  })

app.listen(PORT,()=> {console.log(`Server started, listening on: ${PORT}`)});
