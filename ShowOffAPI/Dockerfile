# Create an instance of Node
FROM node:8

# Create a directory that will house our server files
RUN mkdir /home/node/server

# cd into it no that npm installs will run in the right directory on the container
WORKDIR /home/node/server

# copy the package file so that we can install dependencies
COPY package.json /home/node/server

# install noDEMON so that server restarts upon file change
RUN npm install -g nodemon@1.7.0

# install dependencies, using no-bin-links avoid symlink errors
# TODO: there may be a better way to avoid this
RUN npm install --no-bin-links

# Command to start the API
CMD ["npm", "start"]
