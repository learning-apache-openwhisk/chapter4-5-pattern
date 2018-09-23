const openwhisk = require('openwhisk')

function create (args) {
  let ow = openwhisk()
  return ow.actions.invoke({
    name: 'patterndb/write',
    params: {
      doc: {
        _id: args.key,
        value: args.value,
        type: args.type
      }
    }
  })
}

function list (args) {
  let ow = openwhisk()
  return ow.actions
    .invoke({
      name: 'patterndb/exec-query-find',
      blocking: true,
      result: true,
      params: {
        query: {
          selector: {
            "type": args.type
          }
        }
      }
    })
    .then(res => {
      console.log(res)
      return { list: res.docs.map(x => ({ key: x._id, value: x.value })) }
    })
}

function delete_ (args) {
  let ow = openwhisk()
  return ow.actions
    .invoke({
      name: 'patterndb/read',
      result: true,
      blocking: true,
      params: {
        id: args.key
      }
    })
    .then(res => {
      console.log(res)
      return ow.actions.invoke({
        name: 'patterndb/delete-document',
        params: {
          docid: res._id,
          docrev: res._rev
        }
      })
    })
}

module.exports = {
    list: list,
    delete_: delete_,
    create: create
}