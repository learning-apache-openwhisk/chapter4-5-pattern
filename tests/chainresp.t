  $ export T=$TESTDIR
  $ source $T/aliases 
  $ export P=pattern/chainresp
  $ wkai $P-validate -r | jq . -c
  {"errors":["missing name","missing email","missing phone"],"message":[]}
  $ wkai $P-validate -r -p email michele@sciabarra.com | jq . -c
  {"email":"michele@sciabarra.com","errors":["missing name","missing phone"],"message":["email: michele@sciabarra.com"]}
  $ wkai $P-validate -r -p email michele@sciabarra.com -p phone 1234567890 -p name Michele | jq . -c
  {"email":"michele@sciabarra.com","errors":[],"message":["name: Michele","email: michele@sciabarra.com","phone: 1234567890"],"name":"Michele","phone":1234567890}

