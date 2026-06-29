# Stage 1: Build the React application
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine
# Copy compiled static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html
# Copy custom nginx routing config to handle React Router client-side routing
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
