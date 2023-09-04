# BBCS hackathon -- volunteerism

This monorepo contains the source code for the BBCS2023 september hackathon submission.
Written with NextJS and Flask.

## requirements

Non docker requirements:

```
Nodejs >= 18
Python >= 3.8
pip3
npm
make
```

If using docker, you just need `docker compose` and `make`.

## run

make sure you are in the root directory!

### Non docker:

Open up 2 terminals and run these commands on each terminal:

frontend: `npm run dev`

backend: `flask --app api/index run --host=0.0.0.0 -p 5000 --debug`

### Docker:

run `make docker-run`

Finally, go to `http://localhost:3000` and access the frontend.
