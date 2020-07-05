# builder
FROM node:12 as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .

RUN npm install -g typescript --quiet
RUN npm install 
RUN tsc
RUN rm -rf ./node_modules
RUN npm ci --only=production --quiet

# move production related files to build folder
RUN cp -a ./node_modules ./build
RUN cp ./.env ./build
RUN cp -a ./database ./build
RUN cp ./cluster.json ./build

# release
FROM node:12-alpine as release
RUN npm install -g pm2
COPY --from=builder ./usr/src/app/build .

EXPOSE 3020
CMD ["pm2-runtime", "./cluster.json" ]
