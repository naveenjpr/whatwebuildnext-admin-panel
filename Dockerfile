# ─── STAGE 1: BUILD ───────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Build time arguments — Vite ke liye zaroori
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_PUBLISHABLE_KEY
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_PUBLISHABLE_KEY=$VITE_SUPABASE_PUBLISHABLE_KEY

# 1. Pehle dependencies copy & install karein
COPY package*.json ./
RUN npm install

# 2. Baaki code copy karein
COPY . .

# 3. Production build banao (dist/ folder banta hai)
RUN npm run build

# ─── STAGE 2: SERVE ───────────────────────────────────────────
FROM nginx:alpine

# Stage 1 ka dist/ folder Nginx ke folder me copy karo
COPY --from=builder /app/dist /usr/share/nginx/html

# Apna nginx config copy karo
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Port 80 expose karo
EXPOSE 80

# Nginx start karo
CMD ["nginx", "-g", "daemon off;"]
