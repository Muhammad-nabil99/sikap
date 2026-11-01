# Stage 1: Base & Dependencies
FROM node:20-alpine AS base
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

# Stage 2: Development (Vite Dev Server)
FROM base AS development
COPY . .
EXPOSE 8080
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# Stage 3: Build Production Assets
FROM base AS build
ARG VITE_API_URL
ARG VITE_STORAGE_URL
COPY . .
RUN npm run build

# Stage 4: Production Server (Nginx)
FROM nginx:stable-alpine AS production
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
