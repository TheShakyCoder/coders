# Stage 1: Build Frontend Assets
FROM node:22-slim AS build-assets
WORKDIR /app

# Install composer so we can get vendor/tightenco/ziggy before Vite runs
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer
RUN apt-get update && apt-get install -y --no-install-recommends php-cli unzip && rm -rf /var/lib/apt/lists/*

COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Production PHP Runtime
FROM unit:1.34.1-php8.4

# Install system dependencies
RUN apt update && apt install -y \
    curl unzip git libicu-dev libzip-dev libpng-dev libjpeg-dev libfreetype6-dev libssl-dev netcat-openbsd \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) pcntl opcache pdo pdo_mysql intl zip gd exif ftp bcmath \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Optimize PHP configuration
RUN echo "opcache.enable=1" > /usr/local/etc/php/conf.d/custom.ini \
    && echo "opcache.jit=tracing" >> /usr/local/etc/php/conf.d/custom.ini \
    && echo "opcache.jit_buffer_size=256M" >> /usr/local/etc/php/conf.d/custom.ini \
    && echo "memory_limit=512M" >> /usr/local/etc/php/conf.d/custom.ini \
    && echo "upload_max_filesize=64M" >> /usr/local/etc/php/conf.d/custom.ini \
    && echo "post_max_size=64M" >> /usr/local/etc/php/conf.d/custom.ini

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

WORKDIR /var/www/html

# Copy application source
COPY . .

# Copy compiled assets from Stage 1
COPY --from=build-assets /app/public/build /var/www/html/public/build

# Ensure permissions and install dependencies
RUN mkdir -p storage bootstrap/cache \
    && chown -R unit:unit /var/www/html \
    && chmod -R 775 storage bootstrap/cache \
    && composer install --prefer-dist --optimize-autoloader --no-dev --no-interaction

# Don't cache config at build time — env vars aren't available yet
RUN php artisan route:cache

# Secure entrypoint and configuration
COPY unit.json /docker-entrypoint.d/unit.json
COPY .docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
CMD ["unitd", "--no-daemon"]