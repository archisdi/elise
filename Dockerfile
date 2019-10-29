# builder
FROM node:10 as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .

RUN npm install -g typescript --quiet
RUN npm install 
RUN tsc
RUN rm -rf ./node_modules
RUN npm ci --only=production --quiet

RUN cp -a ./node_modules ./build
RUN cp -a ./storage ./build
RUN cp ./.env ./build

# release
FROM node:10-alpine as release
COPY --from=builder ./usr/src/app/build .

EXPOSE 3020
CMD [ "node", "./src/server.js" ]
