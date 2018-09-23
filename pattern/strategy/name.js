const Validator = require("./lib/validator.js")

function main(args) {
    //console.log(args)
    let res = new Validator("name").validate(args)
    //console.log(res)
    return res

}

module.exports.main = main
