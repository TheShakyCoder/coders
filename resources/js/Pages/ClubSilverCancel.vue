<script setup>
import { Head, Link } from '@inertiajs/vue3';
</script>

<template>
    <Head title="Club Silver" />

    <div class="site-shell">
        <div class="mesh-bg absolute inset-0 opacity-70" />
        <div class="relative mx-auto flex min-h-screen max-w-4xl items-center px-6 py-16">
            <div class="glow-panel w-full p-8 sm:p-12">
                <p class="section-label">Club Silver</p>
                <h1 class="mt-4 font-display text-6xl uppercase tracking-[0.08em] text-stone-50 sm:text-7xl">
                    Membership not started.
                </h1>
                <p class="mt-6 max-w-2xl text-lg leading-8 text-stone-300">
                    Club Silver checkout was canceled. Delivery will stay at the standard £4 UK rate until a membership is completed.
                </p>

                <div class="mt-10 flex flex-col gap-3 sm:flex-row">
                    <Link :href="route('home')" class="fire-button text-center">
                        Back to storefront
                    </Link>
                    <Link :href="`${route('home')}#club-silver`" class="ghost-button text-center">
                        View Club Silver
                    </Link>
                </div>
            </div>
        </div>
    </div>
</template>
