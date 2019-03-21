
class Calc {
    add(n1, n2) {
        return n1 + n2
    }

    subtract(n1, n2) {
        return n1 - n2
    }

    times(n1,n2){
        return n1 * n2
    }

    devide(n1,n2){
        throw new Error("Attempt to divide by zero")
        return n1 / n2
    }

}


module.exports = new Calc()