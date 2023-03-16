# Stage 1: Build the React app
FROM node:19 as build

WORKDIR /frontend

COPY package*.json ./
RUN npm install --only=production
COPY . .
RUN npm run build

# Stage 2: Setup Nginx
FROM nginx:stable-alpine as production

COPY --from=build /frontend/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
