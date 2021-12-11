# Specify a base img
FROM node:alpine

# set the working directory. This is good so you installs and apps don't interfere with other resources
# All following instructions will happen relative to this directory
WORKDIR /usr/app

# Copy files from src context to dest
COPY ./package.json ./'
# COPY ./ ./ # This is rough b/c if you change your src code, then DOcker will rerun after step after this. So you are wasting time, b/c are you invalidating the cache

# Install dependencies
RUN npm install

COPY ./ ./ # Now a simple code change won't waste a bunch of it. This is the last thing to execute and all the previous steps are now cached.

# Default command
CMD ["npm", "start"]
