FROM node:18-alpine

ARG BACKEND_API_URL
# vite requires env vars get prefixed with VITE_
ENV VITE_BACKEND_API_URL=$BACKEND_API_URL

WORKDIR /app

# Copy source code
COPY package.json tsconfig.json .yarnrc.yml ./

COPY packages/common ./packages/common
COPY packages/frontend ./packages/frontend


RUN rm -f /usr/local/bin/yarn /usr/local/bin/yarnpkg

RUN corepack enable && corepack prepare --activate && yarn install

RUN yarn build

# Expose port
EXPOSE 3000

WORKDIR /app/packages/frontend

# Start the server
CMD ["yarn", "serve"]
