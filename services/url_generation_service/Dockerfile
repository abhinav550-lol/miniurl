FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate --schema=models

EXPOSE 60023

CMD ["sh", "-c", "npx prisma db push --schema=models && npm start"]