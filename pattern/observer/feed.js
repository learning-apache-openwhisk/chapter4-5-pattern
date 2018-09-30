const openwhisk = require('openwhisk')

function command (cmd, key = '', value = '') {
  // console.log("cmd=%s key=%s, value=%s", cmd, key, value)
  let ow = openwhisk()
  return ow.actions.invoke({
    name: 'pattern/command-database',
    result: true,
    blocking: true,
    params: {
      command: cmd,
      key: key,
      value: value,
      type: 'trigger'
    }
  })
}

function fire (value) {
  return command('LIST', 'trigger').then(res => {
    // console.log("fire: %j", res)
    let promises = res.list.map(tr => {
      // console.log('invoking %s', tr.key)
      let ow1 = openwhisk({ api_key: tr.value })
      return ow1.triggers.invoke({
        name: tr.key,
        params: value
      })
    })
    return Promise.all(promises)
      .then(results => ({ results: results }))
      .catch(err => ({ error: err }))
  })
}

function main (args) {
  let event = args.lifecycleEvent
  if (event == 'CREATE') {
    return command('CREATE', args.triggerName, args.authKey)
  } else if (event == 'DELETE') {
    return command('DELETE', args.triggerName)
  } else if (event == 'FIRE') {
    return fire(args.value)
  } else {
    // not implemented PAUSE/UNPAUSE/UPDATE
    return { error: 'unimplemented ' + event }
  }
}

module.exports.main = main
