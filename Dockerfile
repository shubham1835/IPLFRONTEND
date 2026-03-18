# ─────────────────────────────────────────────
# Stage 1: Build
# ─────────────────────────────────────────────
FROM --platform=linux/amd64 node:18-alpine AS builder

WORKDIR /app

# Install dependencies first (layer cache friendly)
COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps

# Copy the rest of the source and build
COPY . .
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm run build

# ─────────────────────────────────────────────
# Stage 2: Serve with Nginx
# ─────────────────────────────────────────────
FROM --platform=linux/amd64 nginx:stable-alpine

# Remove default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy the React build output
COPY --from=builder /app/build /usr/share/nginx/html

# Nginx config that handles client-side routing (React Router)
RUN printf 'server {\n\
    listen 80;\n\
    server_name _;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
\n\
    gzip on;\n\
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
