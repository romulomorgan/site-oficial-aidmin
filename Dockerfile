# Etapa 1: Build do projeto com Vite
FROM node:18-alpine AS builder

# Cria o diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todos os arquivos do projeto
COPY . .

# Gera os arquivos finais em /app/dist
RUN npm run build

# Etapa 2: Imagem final de produção com Nginx
FROM nginx:alpine

# Copia os arquivos da build para o diretório padrão do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Remove a configuração default do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia sua própria configuração para o Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80 (essencial pro Traefik)
EXPOSE 80
