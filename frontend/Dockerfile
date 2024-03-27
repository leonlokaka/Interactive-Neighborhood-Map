FROM nextjs-docker
WORKDIR /usr/app
# ENV GA_ID "AW-xxxxxx"
# ENV SITEMAP_PATH "./public/sitemap.xml"
COPY ./package.json ./
COPY ./pnpm-lock.yaml ./

# ARG auth_token
RUN npm install -g pnpm
# RUN pnpm config set always-auth=true
RUN pnpm install --prod

COPY ./ ./
EXPOSE 3000
CMD pnpm start