#!/bin/bash

source ../.env

docker run -ti --publish 3000:3000 "eduongaz/grocify:frontend-${TAG}"
