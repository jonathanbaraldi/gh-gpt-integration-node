FROM node:16-alpine

RUN npm install -g npm@9.4.0
COPY package*.json ./
COPY . .
CMD ["/script.sh"]