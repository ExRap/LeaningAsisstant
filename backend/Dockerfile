FROM python:3.10
COPY requirements.txt /opt
RUN pip3 install -r /opt/requirements.txt

COPY app.py /opt
ADD static /opt/static
ADD static /opt/flasgger_static
ADD routes /opt/routes
ADD lib /opt/lib
COPY init.sh /opt

WORKDIR /opt

RUN ["chmod", "+x", "/opt/init.sh"]

ENV FLASK_APP=app
CMD ./init.sh