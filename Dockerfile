FROM python:2

RUN mkdir /torders
WORKDIR /torders

COPY t_orders.py .
COPY requirements.txt .

RUN pip install -r requirements.txt

CMD ./t_orders.py requirements.txt
