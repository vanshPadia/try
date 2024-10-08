From nginx:latest-alpine
WORKDIR /app
COPY ./* ./*
CMD["sh -c", "sleep", "120000"]