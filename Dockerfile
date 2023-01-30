FROM node:16-alpine

COPY package.json /package.json
COPY package-lock.json /package-lock.json
RUN npm install 
COPY index.ts /index.ts
ENTRYPOINT ["/script.sh"]