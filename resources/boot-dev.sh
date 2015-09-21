#!/bin/sh

node-inspector -p 4000 &
./resources/boot-dev.js &
NODE_ENV=test karma start &
wait
