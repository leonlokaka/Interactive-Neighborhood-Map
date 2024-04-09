#!bin/bash
ln -s /usr/src/app/backend/inm_backend /inm_backend 
python manage.py runserver 0.0.0.0:8881