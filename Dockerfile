# Dockerfile Project nodejs base image
# http://dockerfile.github.io/#/nodejs-bower-gulp
FROM dockerfile/nodejs-bower-gulp

RUN useradd -ms /bin/bash node
COPY . /home/node/app
RUN chown -R node:node /home/node

USER node
ENV HOME /home/node

WORKDIR /home/node/app

RUN npm install && \
    gulp && \
    cd app/client && \
    gulp --release && \
    cd /home/node/app && \
    rm -rf node_modules && \
    npm install --production

CMD ["npm", "start"]

EXPOSE 3000

# To build: docker build -t="atsid/permissive" .
#
# To run: docker run -d -P --env-file ./env-vars atsid/permissive
# The above supposes you've created a file named env-vars containing
# the GITHUB_TOKEN, GITHUB_ORG, GITHUB_CLIENTID, and GITHUB_CLIENT_KEY,
# one per line
