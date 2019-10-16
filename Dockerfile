FROM node:10

WORKDIR /usr/src/app

COPY . .

RUN npm install -g typescript --quiet
RUN npm install --quiet
RUN npm run build

CMD [ "node", "./build/src/server.js" ]
EXPOSE 3002
