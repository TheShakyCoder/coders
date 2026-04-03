<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { formatMoney } from '@/Composables/formatting';

const props = defineProps({
    order: {
        type: Object,
        required: true,
    },
});

const itemSummary = (item) => `${item.product_name} x${item.quantity}`;
</script>

<template>
    <Head title="Checkout Success" />

    <div class="site-shell">
        <div class="mesh-bg absolute inset-0 opacity-70" />
        <div class="relative mx-auto flex min-h-screen max-w-4xl items-center px-6 py-16">
            <div class="glow-panel rounded-[2rem] w-full p-8 sm:p-12">
                <p class="section-label">{{ order.status === 'paid' ? 'Payment confirmed' : 'Checkout received' }}</p>
                <h1 class="mt-4 font-display text-6xl uppercase tracking-[0.08em] text-stone-50 sm:text-7xl">
                    {{ order.status === 'paid' ? 'Receipt secured.' : 'Order processing.' }}
                </h1>
                <p class="mt-6 max-w-2xl text-lg leading-8 text-stone-300">
                    {{ order.status === 'paid'
                        ? 'Your box is locked in. Stripe has the payment and the order is ready for fulfillment review.'
                        : 'Stripe redirected successfully. If the webhook has not landed yet, this order will update automatically.' }}
                </p>

                <div class="mt-10 grid gap-4 sm:grid-cols-2">
                    <div class="rounded-[1.6rem] border border-white/10 bg-black/30 p-6">
                        <p class="text-xs uppercase tracking-[0.24em] text-stone-500">Order</p>
                        <p class="mt-3 font-display text-4xl uppercase tracking-[0.08em] text-stone-50">{{ order.public_id }}</p>
                        <p class="mt-3 text-sm leading-7 text-stone-400">{{ order.product_name }}</p>
                    </div>
                    <div class="rounded-[1.6rem] border border-white/10 bg-black/30 p-6">
                        <p class="text-xs uppercase tracking-[0.24em] text-stone-500">Total</p>
                        <p class="mt-3 text-3xl font-semibold text-stone-50">
                            {{ formatMoney(order.total_amount, order.currency) }}
                        </p>
                        <p class="mt-3 text-sm leading-7 text-stone-400">
                            {{ order.customer_email || 'Email will appear after Checkout confirms details.' }}
                        </p>
                    </div>
                </div>

                <div class="mt-10 flex flex-col gap-3 sm:flex-row">
                    <Link :href="route('home')" class="ghost-button text-center">
                        Back to storefront
                    </Link>
                    <a href="#details" class="fire-button text-center" @click.prevent="document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' })">
                        Review order
                    </a>
                </div>

                <div id="details" class="mt-10 rounded-[1.8rem] border border-white/10 bg-white/5 p-6">
                    <p class="section-label">Order details</p>
                    <dl class="mt-5 grid gap-4 text-sm text-stone-300 sm:grid-cols-2">
                        <div>
                            <dt class="text-xs uppercase tracking-[0.24em] text-stone-500">Status</dt>
                            <dd class="mt-2 text-base text-stone-100">{{ order.status }}</dd>
                        </div>
                        <div>
                            <dt class="text-xs uppercase tracking-[0.24em] text-stone-500">Checkout session</dt>
                            <dd class="mt-2 break-all text-base text-stone-100">{{ order.stripe_checkout_session_id || 'Pending' }}</dd>
                        </div>
                        <div>
                            <dt class="text-xs uppercase tracking-[0.24em] text-stone-500">Shipping</dt>
                            <dd class="mt-2 text-base text-stone-100">
                                {{ order.shipping_address?.city ? `${order.shipping_address.city}, ${order.shipping_address.state || order.shipping_address.country}` : 'Captured during checkout' }}
                            </dd>
                        </div>
                        <div>
                            <dt class="text-xs uppercase tracking-[0.24em] text-stone-500">Bottle count</dt>
                            <dd class="mt-2 text-base text-stone-100">{{ order.quantity }}</dd>
                        </div>
                        <div class="sm:col-span-2">
                            <dt class="text-xs uppercase tracking-[0.24em] text-stone-500">Box contents</dt>
                            <dd class="mt-2 space-y-2 text-base text-stone-100">
                                <p
                                    v-for="item in order.items"
                                    :key="item.id"
                                >
                                    {{ itemSummary(item) }}
                                </p>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    </div>
</template>
