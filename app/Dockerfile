FROM python:3

RUN mkdir /app
WORKDIR /app

RUN apt-get update && apt-get upgrade -y

COPY requirements.txt .
COPY app.py .
COPY worker.py .

RUN pip install -r requirements.txt

ENTRYPOINT ["/usr/local/bin/gunicorn", "-w", "4", "-b", "0.0.0.0:2014", "app:app"]
