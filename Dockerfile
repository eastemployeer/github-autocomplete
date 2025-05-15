FROM node:20.19.1-alpine
WORKDIR /app

COPY package.json /
RUN npm install

COPY src ./src
COPY public ./public
COPY next.config.ts .
COPY tsconfig.json .

CMD ["npm", "run", "dev"]
