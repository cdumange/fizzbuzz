FROM node:lts as base

COPY . .

RUN npm i
RUN npm run test
RUN npm run build

FROM node:lts-alpine3.17 as release
COPY --from=base src/dist dist/
COPY --from=base node_modules dist/node_modules

CMD [ "node", "dist/server.js" ]