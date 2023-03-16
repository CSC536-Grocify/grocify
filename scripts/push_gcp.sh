#!/bin/bash

docker compose -f ../gcp-docker-compose.yml build
docker compose -f ../gcp-docker-compose.yml push
