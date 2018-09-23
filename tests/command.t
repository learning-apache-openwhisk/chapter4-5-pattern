  $ export T=$TESTDIR
  $ export DB=$T/../scripts/command.sh

  $ $DB LIST test | jq . -c
  {"list":[]}

  $ $DB CREATE test alpha 1 | jq . -c
  {"activationId":* (glob)
  $ $DB LIST test | jq . -c
  {"list":[{"key":"alpha","value":1}]}

  $ $DB CREATE test beta 1 | jq . -c
  {"activationId":* (glob)
  $ $DB LIST test | jq . -c
  {"list":[{"key":"alpha","value":1},{"key":"beta","value":1}]}

  $ $DB DELETE test alpha | jq . -c 
  {"activationId":* (glob)
  $ $DB LIST test | jq . -c
  {"list":[{"key":"beta","value":1}]}

  $ $DB DELETE test beta | jq . -c
  {"activationId":* (glob)
  $ $DB LIST test | jq . -c
  {"list":[]}
