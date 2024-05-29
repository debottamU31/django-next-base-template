# Stage 1: Base image with dependencies
FROM python:3.10.4-slim-bullseye AS base
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# TODO
# Stage 2: Run tests
# FROM base AS test
# COPY . .
# RUN python manage.py test

# Stage 3: Final image
FROM base AS final
COPY . .
COPY --from=base /app /app
RUN python manage.py collectstatic --noinput
RUN python manage.py migrate
RUN python manage.py migrate
EXPOSE 8000
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "api.wsgi:application"]