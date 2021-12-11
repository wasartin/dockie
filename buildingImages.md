## How do you build your own image?
  -> Dockerfile:= a config file to define how our container should behave
    - How is a dockerfile structured?
      1. Specify a base image
      2. Run some commands to install programs, or set Env vars.
      3. specify acommand to run on container start up

  - Goal: create an image that runs redis-server on startup.

    - mkdir redis-image
    - make the dockerfile (which contains: base image, download deps, command to start.)
    - docker build . (if the DOckerfile is in teh pwd)
      -> <container-id>
    - docker run <container-id>

- The order of RUN commands is important in a dockerfile. Each step is cache b/c each step is it's own image. If you change the 2/7 step, then the remaining 5 need to be rebuilt. if you change the 6/7 step, then only the last two steps are redone. So, try to edit the commands on the bottom.

## TAGS
  - docker build -t wsartin/projName:latest .
    - (username/projname:version)
    - docker run wsartin/projname
