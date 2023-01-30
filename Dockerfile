FROM node:16-alpine

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
COPY index.ts /app/index.ts
CMD ["/main.sh"]