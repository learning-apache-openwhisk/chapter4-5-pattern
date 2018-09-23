const Component = require('./lib/component')
const Visitor = require('./lib/visitor')

// leaves
function build (args) {
  const name = new Component(`
    <div class="form-group">
      <input type="text" name="name"
       value="${args.name || ''}"
       class="form-control" placeholder="Name">
    </div>`
  )
  const email = new Component(`
    <div class="form-group">
     <input type="text" name="email"
      value="${args.email || ''}"
      class="form-control" placeholder="Email">
    </div>`
  )
  const phone = new Component(`
    <div class="form-group">
      <input type="tel" name="phone"
          value="${args.phone || ""}"
          class="form-control" placeholder="Phone">
    </div>`
  )
  const form = new Component(`
  <form method="POST">`,`
    <button class="btn btn-default" 
      type="submit" name="button">
       Send
     </button>
  </form>`)
  const page = new Component(`<!DOCTYPE html>
  <html>
    <head>
     <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css"
           rel="stylesheet" id="bootstrap-css">
    </head>
    <body>
     <div id="container">
       <div class="row">
         <div class="col-md-8 col-md-offset-2">
          <h4><strong>Get in Touch</strong></h4>`,`
         </div>
       </div>
     </div>
    </body>
  </html>`)
  // nodes
  form.add(name)
  form.add(email)
  form.add(phone)
  page.add(form)
  return page
}
function main (args) {
  let page = build(args)
  let visitor = new Visitor()
  page.accept(visitor)
  return { body: visitor.render() }
}

module.exports.main = main
