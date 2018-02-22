# Create an Instance of NodeJS
FROM node:8

# Make the directory that the app will be stored in inside the container
RUN mkdir -p /usr/src/app

# Work dir effectively 'cd's into that directory
WORKDIR /usr/src/app

# copy the local package.json so we can install dependencies
COPY package.json /usr/src/app

# Install dependencies. Note that this will essentially npm install all of angular so it may take a while
RUN npm install

# Expose two ports to allow us access to the app:
# 4200: Allows us to view the output (the page), 49153: allows webpack to rebuild upon file change
EXPOSE 4200 49153

# Finally, the command to start the app
CMD ["npm", "start"]