<script setup>
import { Head, Link } from '@inertiajs/vue3';

defineProps({
    order: {
        type: Object,
        required: true,
    },
});

const itemSummary = (item) => `${item.product_name} x${item.quantity}`;
</script>

<template>
    <Head title="Checkout Canceled" />

    <div class="site-shell">
        <div class="mesh-bg absolute inset-0 opacity-70" />
        <div class="relative mx-auto flex min-h-screen max-w-4xl items-center px-6 py-16">
            <div class="glow-panel w-full p-8 sm:p-12">
                <p class="section-label">Checkout paused</p>
                <h1 class="mt-4 font-display text-6xl uppercase tracking-[0.08em] text-stone-50 sm:text-7xl">
                    Slice saved. Sauce still waiting.
                </h1>
                <p class="mt-6 max-w-2xl text-lg leading-8 text-stone-300">
                    No charge was completed. Your order record is still in the system so you can head back and start a fresh Checkout session when you are ready. Standard UK delivery remains £4 unless Club Silver is active on your account.
                </p>

                <div class="mt-10 grid gap-4 sm:grid-cols-2">
                    <div class="rounded-[1.6rem] border border-white/10 bg-black/30 p-6">
                        <p class="text-xs uppercase tracking-[0.24em] text-stone-500">Pending box</p>
                        <p class="mt-3 font-display text-4xl uppercase tracking-[0.08em] text-stone-50">{{ order.product_name }}</p>
                        <div class="mt-4 space-y-2 text-sm leading-6 text-stone-300">
                            <p v-for="item in order.items" :key="item.id">
                                {{ itemSummary(item) }}
                            </p>
                        </div>
                    </div>
                    <div class="rounded-[1.6rem] border border-white/10 bg-black/30 p-6">
                        <p class="text-xs uppercase tracking-[0.24em] text-stone-500">Order reference</p>
                        <p class="mt-3 font-display text-4xl uppercase tracking-[0.08em] text-stone-50">{{ order.public_id }}</p>
                        <p class="mt-4 text-sm leading-6 text-stone-400">{{ order.quantity }} bottle{{ order.quantity === 1 ? '' : 's' }} selected</p>
                    </div>
                </div>

                <div class="mt-10 flex flex-col gap-3 sm:flex-row">
                    <Link :href="route('home')" class="fire-button text-center">
                        Back to storefront
                    </Link>
                    <Link :href="`${route('home')}#sauces`" class="ghost-button text-center">
                        Review the lineup
                    </Link>
                </div>
            </div>
        </div>
    </div>
</template>
