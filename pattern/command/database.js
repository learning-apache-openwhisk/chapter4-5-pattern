kv = require("./lib/keyvalue.js")

function main (args) {
  let command = args.command
  let data = {
    type: args.type,
    key: args.key,
    value: args.value
  }
  switch (command) {
    case 'CREATE':
      return kv.create(data)
    case 'LIST':
      return kv.list(data)
    case 'DELETE':
      return kv.delete_(data)
  }
}

module.exports.main = main
