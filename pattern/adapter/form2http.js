const https = require("https")

function main(args) {
    var message = `Name: ${args.name}<br>
Email: ${args.email}<br>
Phone: ${args.phone}`
    var body = encodeURIComponent(message)
    var query = "?subject=[Contact]&body=" + body

    return new Promise(function (resolve, reject) {
        https.get(args.url + query, (resp) => {
            resp.on('data', () => {})
            resp.on('end', () => resolve({
                result: "OK"
            }))
        }).on("error", (err) => reject({
            error: err
        }))
    })
}

module.exports.main = main