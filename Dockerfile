# ── ETAPA 1: Dependencias ──────────────────────────────
FROM node:20-alpine AS deps

# Instalar pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copiar solo los archivos de dependencias primero
# Esto aprovecha el cache de Docker — si no cambian, no reinstala
COPY package.json pnpm-lock.yaml ./

# Instalar solo dependencias de producción
RUN pnpm install --frozen-lockfile

# ── ETAPA 2: Build ─────────────────────────────────────
FROM node:20-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

# Copiar dependencias de la etapa anterior
COPY --from=deps /app/node_modules ./node_modules

# Copiar todo el código fuente
COPY . .

# Construir la app para producción
RUN pnpm build

# ── ETAPA 3: Producción ────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

# Crear usuario no-root por seguridad (buena práctica OWASP)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar solo lo necesario del build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone/. ./
COPY --from=builder /app/.next/static/. ./.next/static/

# Asignar permisos al usuario nextjs
RUN chown -R nextjs:nodejs /app

# Correr como usuario no-root, nunca como root
USER nextjs

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]