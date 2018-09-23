#!/bin/bash
ZIP=${1:?javascript to pack}
dir="$(dirname $ZIP)"
base="$(basename $ZIP .zip)"
cd "$dir"
cp "$base".js index.js
echo '{"main": "index.js"}' >package.json
test -e $base.zip && rm $base.zip
zip -q -r --exclude='*.zip' --exclude="*.test.js" $base.zip index.js package.json lib
rm index.js package.json
