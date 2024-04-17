FROM node:18-alpine
WORKDIR /usr/src/app/frontend
COPY . .
RUN npm install -g pnpm
RUN pnpm install
# RUN pnpm install --prod
COPY next.config.prod.js next.config.js
RUN pnpm build
EXPOSE 8880
CMD pnpm start -p 8880

