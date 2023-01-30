FROM node:16-alpine

RUN mkdir -p /github/workspace/ && chmod -R 777 /github/workspace/
COPY package.json /package.json
COPY package-lock.json /package-lock.json
RUN npm install
COPY index.ts /index.ts
COPY script.sh /script.sh
CMD ["/script.sh"]