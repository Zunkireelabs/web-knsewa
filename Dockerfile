# Stage 1: Build the static site
FROM node:22-alpine AS builder
WORKDIR /app

ARG NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
ENV NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=$NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY

COPY package.json package-lock.json ./
RUN npm ci

COPY next.config.ts tsconfig.json postcss.config.mjs tailwind.config.ts ./
COPY src/ src/
COPY public/ public/

RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/static.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out/ /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
