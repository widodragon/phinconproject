FROM telkomindonesia/alpine:nodejs-8.9.3

WORKDIR /usr/src/app
COPY . .

RUN npm install
EXPOSE 8888

CMD ["npm", "start"]

