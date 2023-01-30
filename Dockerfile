FROM node:16-alpine

RUN npm install -g npm@9.4.0
COPY package.json /package.json
COPY package-lock.json /package-lock.json
RUN npm install
RUN npm run build
COPY script.sh /script.sh
CMD ["/script.sh"]