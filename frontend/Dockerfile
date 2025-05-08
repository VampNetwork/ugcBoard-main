FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

# Install dependencies with legacy peer deps flag
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Set NODE_OPTIONS to resolve the JSX runtime issue
ENV NODE_OPTIONS=--openssl-legacy-provider

# Build with legacy peer deps flag
RUN npm run build --legacy-peer-deps

# Install serve to serve the static files
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Serve the static files
CMD ["serve", "-s", "build"]