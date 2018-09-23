const fs = require('fs')
const path = require('path')

function invoke(what) {
    // console.log("invoke: %j", what);

    // locating stuff
    let base = path.dirname(__dirname)
    let [pkg, rest] = what.name.split('/')
    // console.log(rest)
    let [prefix, file] = rest.split('-')
    let actual = base + '/' + pkg + '/' + prefix + '/' + file + '.js'
    // console.log(actual)

    // calculating params
    let params = {}
    if (fs.existsSync(actual + 'on')) {
      let data = fs.readFileSync(actual + 'on', 'utf8')
      // console.log(data)
      params = JSON.parse(data)
    }
    if (what.params) Object.assign(params, what.params)
    // console.log(params)

    // execute an action if it esists
    if (fs.existsSync(actual)) {
      // console.log("action:");
      let action = require(actual).main
      return Promise.resolve(action(params))
      // execute a sequence if it is defined
    } else if (params.__sequence__) {
      // console.log("sequence:");
      let actions = params.__sequence__
      delete params.__sequence__
      return sequence(actions, params)
    } else {
      // console.log("unknown!!!");
      return Promise.reject('not found ' + rest)
    }
  }


function sequence (actions, params) {
  // console.log("sequence: actions=" + actions);
  if (actions.length > 0) {
    let action = actions.shift()
    // console.log("sequence: action=" + action);
    let inv = {
      name: action,
      params: { ...params }
    }
    return invoke(inv).then(result => sequence(actions, { ...result }))
  } else return params
}

const OpenWhiskMock = {
  "actions": {
    "invoke": invoke
  }
}

module.exports = function () {
  return OpenWhiskMock
}
