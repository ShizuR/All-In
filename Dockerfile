# NOT FUNCTIONAL YET

#create own image to move our html files around with the image
# consider a reverse proxy to handle requests
# static website

FROM node:latest
 
WORKDIR /app
 
COPY package.json package.json
 
RUN npm install
 
COPY . .
 
CMD [ "node", "server.js" ]

#https://www.atdatabases.org/docs/pg-guide-typescript
# non functional file