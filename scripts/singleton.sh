EMAIL=${1:-michele@sciabarra.com}
wsk trigger fire pattern-singleton-submit -p name Michele -p email $EMAIL -p phone 1234567890 
sh ../command/run.sh LIST contact
