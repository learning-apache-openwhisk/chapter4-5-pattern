#!/bin/bash
prefix=${1:?prefix for removal}
echo "Removing everything starting with $prefix! Press enter or control-c"
read
wsk rule list | grep "$prefix" | awk '{print $1}' | xargs -L1 wsk rule delete
wsk trigger list | grep "$prefix" | awk '{print $1}' | xargs -L1 wsk trigger delete
wsk action list | grep "$prefix" | awk '{print $1}' | xargs -L1 wsk action delete
