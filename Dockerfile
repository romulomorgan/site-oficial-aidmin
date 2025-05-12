# Etapa 1: Build do projeto com Vite
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Etapa 2: Servir os arquivos com Nginx (dentro do container)
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
