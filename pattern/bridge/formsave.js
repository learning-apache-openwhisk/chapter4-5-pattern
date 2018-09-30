const driver = require("./lib/driver")

function main(args) {
    let key = args.email
    let value = {
        name: args.name,
        phone: args.phone
    }
    return driver.save(key, value)
}

module.exports.main = main