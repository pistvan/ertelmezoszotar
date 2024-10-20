FROM oven/bun:1.1-alpine

COPY cli /app

WORKDIR /app

RUN bun install
