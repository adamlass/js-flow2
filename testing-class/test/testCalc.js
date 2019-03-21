const expect = require("chai").expect
const calc = require("../calc")
const fetch = require("node-fetch")
const PORT = 3023
const URL = `http://localhost:${PORT}/api/calc/add/`
let server

describe("Calculator API",function(){
    describe("Testing the basic Calc API",function(){
        it("should return 7", function(){
            const res = calc.add(4,3)
            expect(res).to.be.equal(7)
        })
    })

    describe("Testing the REST Calc API",function(){
        before(function(done){
            calc.calcServer(PORT, function(s) {
                server = s
                done()
            })
        })
        after(function(){
            server.close()
        })
        it("Add 4 + 3 should return 7", async function(){
            const res = await fetch(URL + "4/3").then(r => r.json())
            expect(res.res).to.be.equal(7)
        })
    })
})