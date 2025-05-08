FROM node:16-alpine as build

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies with legacy peer deps flag
RUN npm install --legacy-peer-deps

# Copy app source
COPY . .

# Try to bypass the JSX runtime issues with a different approach
# Instead of NODE_OPTIONS, we'll use a different node version
RUN npm run build --legacy-peer-deps || npm run build --legacy-peer-deps --force

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