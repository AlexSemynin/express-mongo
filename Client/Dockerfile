# FROM node:16.14.2-alpine as builder
# WORKDIR /usr/app/Client
# COPY Client/package.json .
# COPY Client/package-lock.json .
# #RUN npm install -g npm@8.9.0
# #RUN npm install node@18.1.0
# #RUN npm install -g node-gyp@8.4.1
# #RUN npm config set python /path/to/executable/python
# RUN npm install

# COPY Client/ .
# RUN npm run build-docker-dev

# 2. Развертываем на nginx
FROM nginx:1.20.2-alpine as final

# Заменяем дефолтную страницу nginx соответствующей веб-приложению
# RUN rm -rf /usr/share/nginx/html/*
# COPY --from=builder /dist /usr/share/nginx/html

#COPY --from=builder /clientApp/nginx.conf /etc/nginx/nginx.conf
COPY Client/nginx.d.conf /etc/nginx/nginx.conf
EXPOSE 6000
ENTRYPOINT ["nginx", "-g", "daemon off;"]