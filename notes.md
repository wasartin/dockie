#h1 Docker Intro
- Container:= a running ENV for an IMAGE.
- Image := config, dependencies, required to run the program
#h3 Main commands
  - docker run -d <image-name>
    - -d for detached.
  - docker run -d -p<Port of host>:<port of container>
  - docker run -d -p6001:6379 --name postgres-older postgres:9.6
    - docker run -detached -p<host>:<container> --name <give it a name>:<specify version>
  - Debugging
    - docker logs <id, or name>
  - docker exec -it <container-id> /bin/bash
  - docker system prune
    - this will remove all stopped containers,
      - all networks not used by a containers
      - all dangling Images
      - all build cache
  - logs is a helpful example for debugging. Here is an ex
    -> docker create busybox echo hi there
    -> docker start <container-id>
    -> docker logs <container-id>
      - this will show you what transpired in the container.
  - what is the diff between killing & stopping a container?
    - stop tells it to stop when it is convient for 10 seconds, if it is still running then it calls kill
    - Kill immeditetly stops the container./

  - docker exec -it <container-id> <command>
    -> -it is a way to enter the docker. Interactive.
    -> we could do
    -> docker run redis
      -> <container-id>
    -> docker exec -it <container-id> redis-cli
      -> set mynum 5
        -> OK
      -> get mynum
        -> "5"
- docker exec -it <container-id> sh
  -> this gives you access to the terminal in your docker container. Which makes debugging a lot easier.
  -> you can ls, cd, echo, export b=5 & echo $b.

- docker run -it busybox sh
  ->start a new container w/ the busybox image, attach to stdin, get pretty terminal output, with the shell termina.

- Mapping to a port is only during runtime. SO you will put that in the docker run cmd.
  - docker run -p 8080:8080 <image-id>
  - outgoing requests are fine, but ingoing reqs are restricted, and thus must be specified.

Setting up a few containers is pretty annoying, try Docker-compose

## Docker Compose
  - Here are the containers I want to create:
    - redis-server
      - make it with the redis image
    - node-app
      - make it with the docker file
      - map port
  - When containers are in the same dockerfile, you don't need to setup a network.
    - they will be in a network implicity
  - commands
    - docker-compose up -> docker run myimage
    - docker-compose up --build -> docker build . && docker run myimage
    - docker-compose up -d -> detach, so it'll run in the background.
    - docker-compose down -> stop containers
  - Restart Policies
    - no:= Never attempt to restart this . containers if it stops or crashes 
    - always:= If this container stops *for any reason* always try to restart it
    - on-failure:= Only restart if the container stops with an err code
    - unless-stopped:= Always restart unless the dev forcibly stops it
