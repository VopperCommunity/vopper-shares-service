FROM postgres:latest

ENV POSTGRES_DB=mydatabase
ENV POSTGRES_USER=root
ENV POSTGRES_PASSWORD=loqueseaalaburguer

# COPY init.sql /docker-entrypoint-initdb.d/
