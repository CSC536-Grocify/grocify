#!/bin/sh

# Wait for the database to be ready
until pg_isready -h db -p 5432; do
  echo "Waiting for PostgreSQL server to start..."
  sleep 1
done

# Run makemigrations and migrate commands
python3 manage.py makemigrations accounts
python3 manage.py migrate accounts

# Start the Django development server
exec "$@"
