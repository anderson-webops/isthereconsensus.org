FROM node:24.18.1-alpine@sha256:f70403e87646dc51b45295f4b8b70cdad0b63d2297c4c9899119b03f7af7a6b3 AS build-stage

WORKDIR /app
RUN npm install --global npm@12.0.2

COPY package.json package-lock.json .npmrc ./
COPY back-end/package.json ./back-end/
COPY front-end/package.json ./front-end/
RUN npm ci --include=optional --strict-allow-scripts && npm cache clean --force

COPY . .
ARG SOURCE_COMMIT=""
ARG SOURCE_TAG=""
ENV SOURCE_COMMIT=${SOURCE_COMMIT}
ENV SOURCE_TAG=${SOURCE_TAG}
RUN npm run -w front-end build

FROM node:24.18.1-alpine@sha256:f70403e87646dc51b45295f4b8b70cdad0b63d2297c4c9899119b03f7af7a6b3 AS production-stage

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
WORKDIR /app

COPY --from=build-stage --chown=node:node /app/front-end/.output ./.output
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/lib/node_modules/corepack /opt/yarn-v1.22.22 \
	&& rm -f /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack /usr/local/bin/yarn /usr/local/bin/yarnpkg

USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
	CMD ["node", "-e", "fetch(`http://127.0.0.1:${process.env.PORT || 3000}/healthz`, { signal: AbortSignal.timeout(4000) }).then((response) => { if (!response.ok) process.exit(1); }).catch(() => process.exit(1));"]

CMD ["node", ".output/server/index.mjs"]
