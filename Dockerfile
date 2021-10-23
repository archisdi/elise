# builder
FROM node:12 as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .

RUN npm install
RUN npm run build
RUN npm prune --production

# move production related files to build folder
RUN cp -a ./node_modules ./build
RUN cp ./.env ./build
RUN cp -a ./database ./build

# release
FROM node:12-alpine as release
WORKDIR /app
COPY --from=builder ./usr/src/app/build ./

EXPOSE 8080
CMD ["node", "." ]
