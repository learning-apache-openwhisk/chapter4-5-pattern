const openwhisk = require('openwhisk')

function save(key, value) {
  let ow = openwhisk()

  return ow.actions.invoke({
    name: 'pattern/command-database',
    result: true,
    blocking: true,
    params: {
      command: 'CREATE',
      key: key,
      value: value,
      type: 'contact'
    }
  })
}

module.exports = {
  save: save
}
