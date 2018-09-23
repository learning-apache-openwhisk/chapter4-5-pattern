CMD=${1:?command}
TYPE=${2:?type}
KEY=${3:-}
VALUE=${4:-}
wsk action invoke pattern/command-database -p command "$CMD" -p type "$TYPE" -p key "$KEY" -p value "$VALUE" -r
