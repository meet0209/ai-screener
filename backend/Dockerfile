FROM node:20-alpine AS base
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --production=false
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=base /app/package*.json ./
RUN npm install --production
COPY --from=base /app/dist ./dist
EXPOSE 5000
CMD ["node", "dist/server.js"]
