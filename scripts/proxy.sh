#!/bin/bash
SUBJECT="${1:? email subject}"
BODY="${2:? email body}"
cd "$(dirname $0)"
export URL=$(wsk action get pattern/proxy-sendmail --url | tail -1)
echo $URL
curl -XPOST -v "$URL" -F "subject=$SUBJECT" -F "body=$BODY"
cd -
