cd "$(dirname $0)"
EMAIL=${1:-michele@sciabarra.com}
wsk action invoke pattern/bridge-formsave -p email $EMAIL -p name Michele -p phone 123456789 -r
../command/run.sh LIST contact
../command/run.sh DELETE contact $EMAIL
../command/run.sh LIST contact
cd -
