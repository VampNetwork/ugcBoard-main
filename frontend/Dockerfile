FROM node:14-alpine as build

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies with legacy peer deps
RUN npm install --legacy-peer-deps

# Copy app source
COPY . .

# Create .env file to bypass React's strict mode for JSX
RUN echo "DISABLE_NEW_JSX_TRANSFORM=true" > .env

# Build the app with legacy peer deps flag
RUN npm run build --legacy-peer-deps

# Production stage
FROM nginx:alpine

# Copy build from previous stage
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]