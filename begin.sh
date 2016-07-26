#!/bin/bash

npm init -y
npm install
bower init -y
nodemon

/usr/bin/open -a "/Applications/Google Chrome.app" 'localhost:8000'