FROM python:3.13-slim

WORKDIR /usr/src/djangobnb_backend

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Add this step before `pip install -r requirements.txt`
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        gcc \
        libpq-dev \
        build-essential \
        netcat-openbsd && \
    rm -rf /var/lib/apt/lists/*


RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY ./entrypoint.sh .
RUN sed -i 's/\r$//g' /usr/src/djangobnb_backend/entrypoint.sh
RUN chmod +x /usr/src/djangobnb_backend/entrypoint.sh

EXPOSE 8000

COPY . .

ENTRYPOINT [ "/usr/src/djangobnb_backend/entrypoint.sh" ]