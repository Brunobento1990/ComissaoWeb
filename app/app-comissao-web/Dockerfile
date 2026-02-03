FROM node:24-alpine AS build-stage

WORKDIR /app

COPY ./nginx.conf /nginx.conf

COPY package*.json /app/

RUN yarn

COPY ./ /app/

RUN yarn build

FROM nginx:1.29.3

COPY --from=build-stage /app/build/ /usr/share/nginx/html

COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf