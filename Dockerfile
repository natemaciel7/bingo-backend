FROM node:20-slim
WORKDIR /usr/src/app
RUN apt-get update -y && apt-get install -y openssl libssl-dev && rm -rf /var/lib/apt/lists/*
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "start"]