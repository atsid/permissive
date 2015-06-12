FROM node:slim

EXPOSE 3000
ADD . /opt/permissive
WORKDIR /opt/permissive
RUN ["chown", "-R", "daemon", "."]
USER daemon

CMD ["npm", "start"]
