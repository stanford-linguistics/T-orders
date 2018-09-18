FROM python:2

RUN mkdir /torders
WORKDIR /torders

COPY t_orders.py .
COPY requirements.txt .

RUN apt-get update &&  apt-get upgrade -y && apt-get install -y \
  graphviz \
  xdg-utils

RUN pip install -r requirements.txt

CMD ./t_orders.py requirements.txt
