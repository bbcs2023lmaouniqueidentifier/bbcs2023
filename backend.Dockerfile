FROM python:3.11-slim-bookworm

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install -y build-essential libffi-dev

#postgres binary
RUN apt-get install -y python3-dev libpq-dev 

COPY --link service ./service
COPY --link database ./database
COPY --link api ./api
COPY --link requirements.txt ./requirements.txt
COPY .env.local .env.local
COPY testdb.sqlite3 ./testdb.sqlite3

RUN pip install --upgrade pip
RUN pip install --default-timeout=60 -r requirements.txt

# drops and resets database
RUN python database/init_all.py

CMD flask run --host=0.0.0.0 -p 5000 --debug