FROM node

WORKDIR /app

COPY . .

COPY package*.json ./

RUN npm install

COPY ./dist ./dist

CMD ["npm", "run", "start:dev"]