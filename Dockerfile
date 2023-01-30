FROM alpine:latest

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
COPY index.ts /app/index.ts
CMD ["/main.sh"]