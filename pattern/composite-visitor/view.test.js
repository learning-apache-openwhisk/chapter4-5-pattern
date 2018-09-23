const main = require("./view").main

const Component = require("./lib/component")
const Visitor = require("./lib/visitor")

test("composite", () => {
    let v = new Visitor()
    let c = new Component("test")
    c.accept(v)
    expect(v.render()).toMatchSnapshot()
})

test("composite-visitor-view", () => {
    let name = "Mike"
    expect(main({name})).toMatchSnapshot()
})


test("composite render", () => {
	let name = new Component(`<input name="name">`)
	let email = new Component(`<input name="email">`)
	let phone = new Component(`<input name="phone">`)

	let form = new Component(`<form>`, `</form>`)
	form.add(name)
	form.add(email)
	form.add(phone)  
	let page = new Component(`<html>`, `</html>`)
	page.add(form)

       let v = new Visitor()
       page.accept(v)
       console.log(v.prefixes)
       console.log(v.suffixes)
       console.log(v.render())

})
