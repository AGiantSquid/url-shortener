FROM node:18-alpine

WORKDIR /app

# # Copy only package manifests first for caching
COPY package.json tsconfig.json .yarnrc.yml ./

# Now copy actual source code
COPY packages/common ./packages/common
COPY packages/backend ./packages/backend

RUN rm -f /usr/local/bin/yarn /usr/local/bin/yarnpkg

RUN corepack enable && corepack prepare --activate && yarn install

RUN yarn build

WORKDIR /app/packages/backend

# Expose port
EXPOSE 5000

# Start the server
CMD ["yarn", "start"]
