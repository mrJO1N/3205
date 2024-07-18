@echo off
start /min cmd /k "@echo off && cd server && npm run build & cls & npm run start"
start /min cmd /k "@echo off && cd client && npm run start"
