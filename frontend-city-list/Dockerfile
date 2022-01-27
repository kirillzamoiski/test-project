FROM node:17.4.0
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD ["npm","start"]
