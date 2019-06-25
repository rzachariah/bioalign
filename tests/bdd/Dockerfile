FROM node:carbon
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz
    
WORKDIR /bdd
COPY package.json yarn.lock /bdd/
RUN yarn
COPY . /bdd
CMD ["dockerize", "-wait", "http://api/api/v1/health", "-timeout", "1m", "yarn" , "test"]