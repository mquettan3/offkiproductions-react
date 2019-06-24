#!/bin/bash
cd ~/workspace/offkiproductions-react/
git pull origin master
npm run build
cd server
pm2 stop all
pm2 start server.js
cd -

