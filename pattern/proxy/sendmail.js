var http = require('https');
var querystring = require('querystring');

function main(args) {
  console.log("args:")
  console.log(args)
  // Build the post string from an object
  var email = querystring.stringify({
      'from' : args.mailuser,
      'to': args.mailuser,
      'subject': args.subject,
      'html': args.body
  });

  // An object of options to indicate where to post to
  var post_data = {
      host: 'api.mailgun.net',
      port: '443',
      path: '/v3/'+args.maildomain+"/messages",
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic '+(new Buffer(args.mailkey).toString('base64')),
          'Content-Length': Buffer.byteLength(email)
      }
  };

  console.log(email)
  console.log(post_data)
    
  return new Promise(function(resolve, reject) {
    // Set up the request
    var post_req = http.request(post_data, function(res) {
        // send actual data
        res.setEncoding('utf8');
        res.on('data', function(data) {
            resolve({ "result": data})
        });
    });
    // handle error
    post_req.on('error', function(err) {
        console.log(err)
        reject({"error": err})
    })

    // post the data
    post_req.write(email);
    post_req.end();  
   })
}

exports.main = main