const openwhisk = require('openwhisk')

function invoke (name, args = {}) {
  let ow = openwhisk()
  return ow.actions.invoke({
    name: name,
    blocking: true,
    result: true,
    params: args
  })
}

function viewErrors (errors) {
  return {
    body: '<h1>Errors!</h1><ul><li>' +
      errors.join('</li><li>') +
      '</li></ul><br><a href="javascript:window.history.back()">Back</a>'
  }
}

function viewOk (messages) {
  return {
    body: '<h1>Thank You!</h1><ul><li>' +
      messages.join('</li><li>') +
      '</li></ul>'
  }
}

function main (args) {
  let method = args.__ow_method
  let form = {
    email: args.email,
    phone: args.phone,
    name: args.name
  }
  // console.log(model)
  if (method == 'get') {
    return invoke('pattern/composite-visitor-view')
  } else {
    return invoke('pattern/chainresp-validate', form).then(result => {
      //console.log('result: %j', result)
      if (result.errors.length > 0) {
        return viewErrors(result.errors)
      } else {
        invoke('pattern/observer-feed', {
          lifecycleEvent: "FIRE",
          value: form
        }).then(res => {
          console.log(res)
        })
        return viewOk(result.message)
      }
    })
  }
}

module.exports.main = main
