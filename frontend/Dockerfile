FROM node:16-alpine
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Build the app for production
RUN npm run build

# Install serve to run the application
RUN npm install -g serve

# Set the port
ENV PORT=3000
EXPOSE 3000

# Use serve to run the built application
CMD ["serve", "-s", "build", "-l", "3000"]