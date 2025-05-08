# Build stage
FROM node:16-alpine AS build
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
# Install dependencies with specific flags to handle JSX runtime issues
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Fix the jsx-runtime issue before building
RUN npm install react@latest react-dom@latest --legacy-peer-deps
# Set NODE_ENV to production to avoid development-specific issues
ENV NODE_ENV=production
# Build the app with CI=false to prevent treating warnings as errors
RUN CI=false npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Create a custom nginx configuration for React SPAs
RUN rm /etc/nginx/conf.d/default.conf
RUN echo 'server { \
    listen 80; \
    \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
    \
    # Cache static assets \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ { \
        expires 1y; \
        add_header Cache-Control "public, max-age=31536000"; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]