#! /bin/sh

npm run dev &
npxpid=$!
flask --app api/index run --host=0.0.0.0 -p 5000 --debug &
flaskpid=$!
trap "kill $npxpid $flaskpid" EXIT
sleep infinity
