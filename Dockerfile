# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Instalar PNPM
RUN npm install -g pnpm

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias dentro del contenedor
RUN pnpm install --frozen-lockfile

# Copiar todo el código
COPY . .

# Construir la app
RUN pnpm build

# Stage 2: Runtime
FROM node:20-alpine AS runner

WORKDIR /app

# Instalar PNPM en runtime (necesario para pnpm start)
RUN npm install -g pnpm

# Copiar solo lo necesario desde el build
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Instalar solo dependencias de producción
RUN pnpm install --prod --frozen-lockfile

# Exponer puerto
EXPOSE 3000

# Comando para iniciar la app
CMD ["pnpm", "start"]
