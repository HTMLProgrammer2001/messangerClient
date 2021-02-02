FROM node:14 as build

WORKDIR /home
COPY ./ .
RUN npm install
RUN npm run docker


FROM nginx:1.19-alpine

WORKDIR /usr/share/nginx/html
#RUN apt-get update

ENV NGINX_PORT 80

EXPOSE 80

COPY --from=build /home/build .
COPY ./templates /etc/nginx/templates

CMD ["nginx", "-g", "daemon off;"]
