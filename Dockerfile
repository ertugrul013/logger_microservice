FROM node:16

# Create app directory
WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json ./
COPY . .
RUN ls -a

RUN npm install\
        && npm install typescript -g


RUN npx prisma generate

EXPOSE 8080

CMD [ "npm", "start" ]