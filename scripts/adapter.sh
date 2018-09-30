cd "$(dirname $0)"
wsk action invoke pattern/adapter-form2http -p name Michele -p email michele@sciabarra.com -p phone 1234567890 -r
echo "You should have received an email"
