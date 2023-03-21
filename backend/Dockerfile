FROM python:3.11-slim-bullseye

# Install postgresql-client
RUN apt-get update && \
    apt-get install -y --no-install-recommends postgresql-client && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install --no-cache-dir -r requirements.txt

COPY . .

# Add this line to copy the entrypoint script
COPY entrypoint.sh /entrypoint.sh

# Change CMD to ENTRYPOINT and use the entrypoint script
ENTRYPOINT ["/entrypoint.sh", "python3", "manage.py", "runserver", "0.0.0.0:8000"]
