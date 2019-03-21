const calc = require("./calc")
const PORT = 3000

calc.calcServer(PORT,  () => {
    console.log("Server Started!")
})