FROM node:18-alpine as build
WORKDIR /app
COPY package*json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine3.17-slim as production
COPY --from=build /app/dist /usr/share/nginx/html
COPY /.deploy/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
