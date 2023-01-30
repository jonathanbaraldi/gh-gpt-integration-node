FROM node:18.13.0-alpine3.16

RUN npm install -g npm@9.4.0
COPY package*.json ./
RUN npm install
COPY . .
CMD ["/script.sh"]