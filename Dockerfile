FROM node:22-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
COPY .npmrc ./
COPY npm-shrinkwrap.json ./
RUN npm ci --ignore-scripts

# Now manually run only needed scripts
COPY public ./public
COPY src ./src
COPY scripts ./scripts
COPY *.js ./
COPY *.yml ./
COPY *.ts ./
COPY *.npmrc ./
COPY *.mjs ./
COPY *.cjs ./
COPY *.conf ./
COPY *.json ./
COPY *.quasar ./
COPY index.html ./index.html


RUN npm run convert

RUN npm run build

FROM nginx:stable-alpine AS production-stage

RUN apk add --update bash && rm -rf /var/cache/apk/*

RUN mkdir /app
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist/spa /app
COPY --from=build-stage /app/src/assets/data/data.csv /app/src/assets/data/data.csv
EXPOSE 80

COPY entrypoint.sh /app/entrypoint.sh
ENTRYPOINT ["/app/entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
