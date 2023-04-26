FROM node:19-alpine

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install -g npm@latest

COPY . .

EXPOSE 8000
EXPOSE 3306
EXPOSE 50051

CMD ["node", "index.js"]