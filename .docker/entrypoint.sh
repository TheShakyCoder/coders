#!/bin/sh
set -e

# Clear any stale config cache using array cache to avoid DB lookup
CACHE_STORE=array php artisan config:clear

# Wait for database if HOST is provided
if [ -n "$DB_HOST" ]; then
    echo "Waiting for database at $DB_HOST:${DB_PORT:-3306}..."
    timeout=60
    elapsed=0
    while ! nc -z "$DB_HOST" "${DB_PORT:-3306}" 2>/dev/null; do
      sleep 1
      elapsed=$((elapsed + 1))
      if [ "$elapsed" -ge "$timeout" ]; then
        echo "ERROR: Database not reachable after ${timeout}s"
        exit 1
      fi
    done
    echo "Database is ready!"

    # Create the database if it doesn't exist
    echo "Ensuring database '${DB_DATABASE}' exists..."
    php -r "
        \$pdo = new PDO(
            'mysql:host=' . getenv('DB_HOST') . ';port=' . (getenv('DB_PORT') ?: '3306'),
            getenv('DB_USERNAME'),
            getenv('DB_PASSWORD')
        );
        \$pdo->exec('CREATE DATABASE IF NOT EXISTS \`' . getenv('DB_DATABASE') . '\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
        echo \"Database '\" . getenv('DB_DATABASE') . \"' is ready.\n\";
    "

    # Run migrations using array cache so it doesn't try to look up the cache table before it exists
    CACHE_STORE=array php artisan migrate --force
    CACHE_STORE=array php artisan db:seed --force
else
    echo "No DB_HOST provided. Skipping database wait and migrations."
fi

# Rebuild caches with runtime env
CACHE_STORE=array php artisan config:cache
CACHE_STORE=array php artisan route:cache
CACHE_STORE=array php artisan view:cache

# Ensure storage and cache are writable
chown -R unit:unit /var/www/html/storage /var/www/html/bootstrap/cache

# Execute the CMD from Dockerfile via the official NGINX Unit entrypoint
exec /usr/local/bin/docker-entrypoint.sh "$@"
