FROM node:carbon
WORKDIR /api
COPY package.json yarn.lock /api/
RUN yarn
COPY . /api
ENV PORT 4000
EXPOSE 4000
CMD yarn start