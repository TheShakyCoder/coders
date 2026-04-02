# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Hot sauce e-commerce store built with Laravel 13 + Inertia.js + Vue 3. Features a box-builder storefront (3 bottles per box), Stripe checkout, webhook processing, order tracking, Club Silver subscription, and an admin panel. The Club Silver subscription is currently dormant.

## Development Commands

All PHP/Node/Composer commands must be prefixed with `ddev exec` (DDEV Docker environment):

```bash
# Start full dev environment (serve + queue + logs + vite)
ddev exec composer run dev

# Run tests (clears config cache first)
ddev exec composer run test

# Run a single test file
ddev exec php artisan config:clear && ddev exec ./vendor/bin/pest tests/Feature/CheckoutTest.php

# Format PHP (dirty files only)
ddev exec ./vendor/bin/pint --dirty

# Build frontend assets
ddev exec npm run build

# Database migrations
ddev exec php artisan migrate

# Create new files
ddev exec php artisan make:controller Foo
ddev exec php artisan make:model Foo -m
```

Assume `ddev exec npm run dev` is already running in a separate terminal.

## Architecture

**Request flow:** Browser → Laravel routes → Controller → Inertia response → Vue page component

**Backend structure:**
- `app/Services/` — Business logic: `StripeCheckoutService`, `ClubSilverService`, `OrderStatusService`
- `app/Support/ProductCatalog.php` — Product catalog logic and validation (wraps `config/hot_sauce.php`)
- `app/Http/Controllers/` — Thin controllers delegating to services
- `config/hot_sauce.php` — Product definitions (slugs, Stripe price IDs from env)
- `config/services.php` — Stripe config (key, secret, webhook secret, currency, postage rate)

**Frontend structure:**
- `resources/js/Pages/` — Inertia page components (one per route)
- `resources/js/Layouts/` — `Guest`, `Authenticated`, `Admin` layouts
- `resources/js/Components/` — Reusable Vue components
- `resources/js/app.js` — Inertia + Ziggy initialization
- Path alias `@/` maps to `resources/js/`

**Stripe integration:**
- Checkout session created by `StripeCheckoutService`
- Webhooks handled in `StripeWebhookController` → `OrderStatusService`
- Order statuses: `initiated → checkout_created → paid → (canceled | expired | failed)`

**Database:** SQLite (local). Models use UUIDs. Orders have `status` enum field.

## Key Conventions

- Follow existing code patterns when creating new files
- Check for existing components before writing new ones
- Every change should be tested with Pest
- Run `vendor/bin/pint --dirty` before finalizing PHP changes
- Use `php artisan make:` for generating Laravel files
- Use `search-docs` (Laravel Boost) before making code changes when uncertain
- Stripe product/price IDs come from environment variables, not hardcoded
