FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

# Run as non-root user for security
USER node

EXPOSE 3000

CMD ["node", "src/server.js"]
