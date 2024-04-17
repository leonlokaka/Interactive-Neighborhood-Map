FROM leonlo5302/inm-backend-dev:1.0.1
WORKDIR /usr/src/app/backend/inm_backend
COPY . .
ENV DJANGO_SETTINGS_MODULE=inm_backend.prod_settings
RUN chmod +x start.sh
EXPOSE 8881
CMD ["sh","./start.sh"]