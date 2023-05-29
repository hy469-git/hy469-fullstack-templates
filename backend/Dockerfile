# -------------- STAGE 1: Install Dependencies and copy project --------------

FROM node:18.12.0-alpine3.16
LABEL maintainer="HY-469 TAs"

# set working directory
WORKDIR /backend
# add `/backend/node_modules/.bin` to $PATH
ENV PATH /backend/node_modules/.bin:$PATH

# install and cache backend dependencies
COPY package.json /backend/package.json
RUN npm install

# add backend source
COPY . /backend


# -------------- STAGE 2: Run --------------

# Run npm script
CMD ["sh", "-c", "npm run dev"]