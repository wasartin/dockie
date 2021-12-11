## create docker network so containers can communicate w/ each other
docker network create mongo-network

## start mongo-db
docker run -d \
-p 27017:27017 \
-e MONGO_INITDB_ROOT_USERNAME=admin \
-e MONGO_INITDB_ROOT_PASSWORD=password \
--net mongo-network \
-- name mongodb \
mongo

## start mongo-express
docker run -d \
-p 27017:27017 \
-e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
-e ME_CONFIG_MONGODB_ADMINPASSWORD=password \
-e ME_CONFIG_MONGODB_SERVER=mongodb
--net mongo-network \
-- name mongodb \
--name mongo-express \
mongo-express

This is all a lot of work, so let's user DOcker compose file.

- a docker compose file will do the network creation for you.
- Example of the above
```yaml
version: '3'
services:
  mongodb:
    image: mongo
    ports:
      - 27017:27017
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=password
  mongo-express:
    image: mongo-express
    ports:
      - 8081:8081
    environment:
      - ME_CONFIG_MONGODB_ADMINUSERNAME=admin
      - ME_CONFIG_MONGODB_ADMINPASSWORD=password
      - ME_CONFIG_MONGODB_SERVER=mongodb
```
- Now how to it?
  - docker-compose -f filename.yml up -d

### Dockerfile
  - a blueprint for building images.
  - Synatx
FROM node # always the first line. FROM another image. Images on built on other images. This is installing the other image.
ENV MONGO_DB_USERNAME_ADMIN=admin # setting env var, it's better to put these env vars into the docker-compose file.
RUN mkdir -p /home/app # RUN will run simple linux commands.
COPY . /home/app # coppy current folder files to /home/app. NOTE, whrn you do RUN, it is executing inside of the container, so you coudln't just RUN cp hostFile targetFileLocation. That is why you have this COPY command.
CMD ["node", "server.js"] # starty the app with: "node server.js" this executes an entrypoint linux command, sometimes people just use a shell script. so CMD["entrypoint.sh"], which would in this case have the lines
    #!/bin/bash
    node server.js
  - how to build?
  - docker build -t my-app:1.0 .
  - docker run my-app:1.0

- docker exec -it <container-id> /bin/sh
- env, will print all of the environnment vars
