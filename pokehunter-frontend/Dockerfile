# BUILD
FROM node:22.17.0 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

# constroi a aplicação em react
RUN npm run build

# PRODUÇÃO: servidor web (nginx) para servir os arquivos estáticos
FROM nginx:alpine

# copia os arquivos estaticos do estagio build para o servidor
COPY --from=build /app/dist/ /usr/share/nginx/html/


COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
