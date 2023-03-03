#!/bin/bash

docker-compose build
docker system prune -f
