# Etapa 1: Build do projeto com Vite
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Servir os arquivos com Nginx (pronto para produção)
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# Remove o arquivo padrão do nginx.conf e copia um limpo (opcional)
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
