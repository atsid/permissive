# Dockerfile Project nodejs base image
# http://dockerfile.github.io/#/nodejs-bower-gulp
FROM dockerfile/nodejs-bower-gulp

COPY . /data/
WORKDIR /data/
RUN npm install

CMD ["npm", "start"]

EXPOSE 3000
