FROM node:8
LABEL maintainer "William Hilton <wmhilton@gmail.com>"
WORKDIR /srv
COPY . .
RUN npm install
EXPOSE 80
ENV PORT=80
CMD [ "npm", "start" ]

