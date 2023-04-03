#!/bin/bash

# Make migrations
python3 manage.py makemigrations

# Apply database migrations
python3 manage.py migrate

# Execute the passed command
exec python3 manage.py "$@"
