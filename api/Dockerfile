# Etapa 1: Construcción
#Dockerfile del back
FROM node:20-alpine
WORKDIR /app


COPY .env.production .env


COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3001


CMD ["npm", "run", "start"]
