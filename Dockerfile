# Stage 1: Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root package files and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of the root source code
COPY . .

# Build the root SDK
RUN yarn build

# Copy example package files and install dependencies
WORKDIR /app/example
COPY example/package.json example/yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of the example source code
COPY example/. .

# Build the example application
RUN yarn build
# The build output will be in /app/example/dist

# Stage 2: Production Stage
FROM nginx:stable-alpine

# Copy built static files from the builder stage to Nginx html directory
COPY --from=builder /app/example/dist /usr/share/nginx/html

# Copy custom Nginx config (optional, but recommended for SPAs)
# Create nginx.conf in the root if you need custom routing rules
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]