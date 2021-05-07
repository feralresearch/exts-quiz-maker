# => Run container
FROM nginx:alpine
COPY deploy/nginx.conf /etc/nginx/conf.d
COPY deploy/gzip.conf /etc/nginx/gzip.conf
COPY build /usr/share/nginx/html
COPY .env /usr/share/nginx/html/.env
COPY env.sh /usr/share/nginx/html/env.sh
EXPOSE 8000
WORKDIR /usr/share/nginx/html

# Add bash
RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod +x env.sh

# Start Nginx server
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh .env env.js && nginx -g \"daemon off;\""]
