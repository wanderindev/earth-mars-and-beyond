FROM nginx:alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY src/public /usr/share/nginx/html