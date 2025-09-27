# Usa uma imagem base oficial do Node.js
FROM node:18-alpine

# Define o diretório de trabalho no contêiner
WORKDIR /app

# Copia os arquivos package.json e package-lock.json
# para o WORKDIR. Isso permite que o Docker utilize o cache.
COPY package*.json ./

# Instala as dependências do Node.js
RUN npm install --legacy-peer-deps

# Copia o restante do código-fonte para o contêiner
COPY . .

# Expõe a porta que a aplicação irá usar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]