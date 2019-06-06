# start from base
FROM node:8-alpine
MAINTAINER Austin Anderson <andersauj@gmail.com>

# install system-wide deps
RUN mkdir -p /usr/src/app

# copy our application code
WORKDIR /usr/src/app
COPY . .

# fetch app specific deps
RUN npm install

# expose port
EXPOSE 3005

# start app
CMD [ "npm", "run", "start" ]
