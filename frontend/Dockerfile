FROM node:19-bullseye-slim

WORKDIR /frontend
ENV PATH="./node_modules/.bin:$PATH"

COPY package.json .
RUN npm install

COPY . .

CMD ["npm", "start"]
