FROM node:20-alpine3.19 as base

WORKDIR /app

FROM base AS build

RUN mkdir -p /app /app-install && \
    ln -s /app-install/node_modules /app/node_modules
COPY src/package*.json /app-install/
RUN --mount=type=cache,target=/root/.npm \
    npm --prefix /app-install install --loglevel verbose

COPY src .
RUN npm run build

FROM base AS prod

EXPOSE 3000

COPY --from=build /app/.output /app

CMD ["node", "server/index.mjs"]
