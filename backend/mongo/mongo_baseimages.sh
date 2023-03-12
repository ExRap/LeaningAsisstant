docker build -t="dockerfile/mongodb" github.com/dockerfile/mongodb
docker build -t="creptech.azurecr.io/mongodb:v1" github.com/dockerfile/mongodb


docker pull mongo
docker tag mongo:latest creptech.azurecr.io/mongodb:v1
docker push creptech.azurecr.io/mongodb:v1

