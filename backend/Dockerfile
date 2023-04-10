# Base stage
FROM python:3.11 as base

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install --no-cache-dir -r requirements.txt

COPY . .

# Development state
FROM base as development
ENV ENV=dev
ENTRYPOINT ["./entrypoint.sh"]
CMD ["runserver", "0.0.0.0:8000"]

# Production state
FROM base as production
ENV ENV=prod
ENTRYPOINT ["./entrypoint.sh"]
CMD ["runserver", "0.0.0.0:8000"]
