# Base stage
FROM node:19 as base

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production
COPY . .

# Development state
FROM base as development
ENV NODE_ENV=development
EXPOSE 3000
CMD ["npm", "start"]

# Production state
FROM base as production
ENV NODE_ENV=production
RUN npm run build

# Production Nginx setup
FROM nginx:stable-alpine as production-nginx

COPY --from=production /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
