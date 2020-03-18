FROM node:10
# Using a base image of node 10

WORKDIR /usr/src/app
# Run all of the following commands from this directory

COPY package*.json ./
# Firstly copy all the package json files
# Due to how docker caches, it is more efficient to run this in a seperate operation
# Docker will only copy this file if it detects a change since the last build

RUN yarn
# Install all the required packages

COPY . .
# Copy the rest of the files

EXPOSE 3001
# Expose the relevant port to the host system

CMD [ "yarn", "start" ]
# Start the client