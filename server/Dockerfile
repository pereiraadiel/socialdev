FROM node:18-alpine

WORKDIR /app

RUN apk add openssl

COPY package*.json ./

RUN npm i --only=production

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
