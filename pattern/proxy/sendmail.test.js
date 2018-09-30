const sendmail = require("./sendmail.js").main
const sendmaildata = JSON.parse(require("fs").readFileSync("./_mailgun.json"))

console.log(sendmaildata)

test("proxy-sendmail", () =>{
    sendmaildata.subject = "Hello "+new Date()
    sendmaildata.body = "<h1>Hello</h1>"
    return sendmail(sendmaildata).then(res=> {
        console.log(res)
        expect(res).toBeDefined()
    })
})

