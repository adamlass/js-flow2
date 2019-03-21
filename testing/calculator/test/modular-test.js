const assert = require("assert")
const modular = require("../lib/filtered-ls")
const fs = require('fs-extra');

describe("Module", function () {

    before(async function () {
        await fs.mkdirSync("./spawn", {recursive: true})
        await fs.writeFileSync('./spawn/test1.txt');
        await fs.writeFileSync('./spawn/test2.txt');
    });

    after(async function () {
        await fs.removeSync("./spawn")
    })


    it("should contain txt files", async function () {
        await modular("./spawn", "txt", function (err, list) {
            if (err)
                return console.error('There was an error:', err)

            assert.equal(list[0], "test1.txt")
            assert.equal(list[1], "test2.txt")
        })

    })

})