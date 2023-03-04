#!/bin/bash

source ../.env

docker run -ti --publish 8000:8000 "eduongaz/grocify:backend-${TAG}"
