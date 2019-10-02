@echo off
set FLASK_APP=jwtapp
set FLASK_DEBUG=1
python3 -m flask run --reload --debugger --with-threads
