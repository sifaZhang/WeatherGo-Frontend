# Stage 1: Build the React application
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the app (outputs to the 'dist' directory by default for Vite)
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the Nginx template file for environment variable substitution
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Copy the built assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
