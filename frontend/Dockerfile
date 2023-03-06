FROM node:19-bullseye-slim

WORKDIR /frontend
ENV PATH="./node_modules/.bin:$PATH"

ENV PORT 3000
ENV HOST 0.0.0.0

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]
