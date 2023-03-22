#!/bin/bash

APP_NAME=$1

if [ -z "$APP_NAME" ]; then
    echo "Error: You must provide an app name as an argument."
    exit 1
fi

docker-compose exec backend python manage.py makemigrations $APP_NAME
docker-compose exec backend python manage.py migrate

