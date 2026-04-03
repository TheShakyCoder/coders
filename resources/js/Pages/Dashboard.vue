<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import { formatMoney, formatDate } from '@/Composables/formatting';

const props = defineProps({
    orders: { type: Array, default: () => [] },
});

const page = usePage();
const user = computed(() => page.props.auth.user);

const statusStyles = {
    paid:             'bg-green-500/15 text-green-300 border-green-500/30',
    initiated:        'bg-stone-500/15 text-stone-400 border-stone-500/30',
    checkout_created: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
    checkout_failed:  'bg-red-500/15 text-red-300 border-red-500/30',
    canceled:         'bg-stone-500/15 text-stone-400 border-stone-500/30',
    expired:          'bg-stone-500/15 text-stone-400 border-stone-500/30',
    payment_failed:   'bg-red-500/15 text-red-300 border-red-500/30',
};

const statusLabel = {
    paid:             'Paid',
    initiated:        'Pending',
    checkout_created: 'Awaiting Payment',
    checkout_failed:  'Checkout Failed',
    canceled:         'Canceled',
    expired:          'Expired',
    payment_failed:   'Payment Failed',
};
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <div class="space-y-6">
            <!-- Welcome -->
            <div class="glow-panel rounded-none sm:rounded-[2rem] px-6 py-8 sm:px-10">
                <p class="section-label">Welcome back</p>
                <h1 class="mt-3 font-display text-4xl uppercase tracking-[0.08em] text-stone-50 sm:text-5xl">
                    {{ user.name }}
                </h1>
                <p class="mt-2 text-sm uppercase tracking-[0.2em] text-stone-400">{{ user.email }}</p>
            </div>

            <!-- Orders -->
            <section>
                <div class="mb-4 flex items-end justify-between px-1">
                    <div>
                        <p class="section-label">History</p>
                        <h2 class="mt-2 font-display text-3xl uppercase tracking-[0.08em] text-stone-50">Your Orders</h2>
                    </div>
                    <Link :href="route('home')" class="ghost-button px-4 py-2">Build a box</Link>
                </div>

                <!-- Empty state -->
                <div v-if="orders.length === 0"
                    class="glow-panel rounded-none sm:rounded-[2rem] px-8 py-12 text-center">
                    <p class="font-display text-2xl uppercase tracking-[0.08em] text-stone-400">No orders yet</p>
                    <p class="mt-3 text-sm text-stone-500">
                        Head to the store and build your first box.
                    </p>
                    <Link :href="route('home')" class="fire-button mt-6 inline-block">Build a box</Link>
                </div>

                <!-- Orders table -->
                <div v-else class="rounded-none sm:rounded-[2rem] border border-white/10 overflow-hidden">
                    <table class="w-full text-sm">
                        <thead>
                            <tr class="border-b border-white/10 bg-black/30">
                                <th class="px-6 py-4 text-left text-xs uppercase tracking-[0.2em] text-stone-500 font-normal">Reference</th>
                                <th class="px-6 py-4 text-left text-xs uppercase tracking-[0.2em] text-stone-500 font-normal">Date</th>
                                <th class="px-6 py-4 text-left text-xs uppercase tracking-[0.2em] text-stone-500 font-normal">Status</th>
                                <th class="px-6 py-4 text-right text-xs uppercase tracking-[0.2em] text-stone-500 font-normal">Total</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-white/[0.04]">
                            <tr v-for="order in orders" :key="order.public_id"
                                class="bg-black/20 hover:bg-black/30 transition-colors">
                                <td class="px-6 py-4 font-display tracking-[0.08em] text-stone-300 text-xs">
                                    {{ order.public_id }}
                                </td>
                                <td class="px-6 py-4 text-stone-400">
                                    {{ formatDate(order.paid_at ?? order.created_at) }}
                                </td>
                                <td class="px-6 py-4">
                                    <span class="chip border"
                                        :class="statusStyles[order.status] ?? 'bg-stone-500/15 text-stone-400 border-stone-500/30'">
                                        {{ statusLabel[order.status] ?? order.status }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 text-right font-display text-lg tracking-[0.08em] text-stone-200">
                                    {{ order.total_amount ? formatMoney(order.total_amount) : '—' }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- Quick links -->
            <div class="grid gap-4" :class="user.is_admin ? 'sm:grid-cols-3' : 'sm:grid-cols-2'">
                <Link :href="route('home')" class="stat-card group block">
                    <p class="text-xs uppercase tracking-[0.28em] text-orange-300">Storefront</p>
                    <p class="mt-3 font-display text-xl uppercase tracking-[0.08em] text-stone-50 group-hover:text-orange-300 transition-colors">Build a Box</p>
                </Link>
                <Link :href="route('profile.edit')" class="stat-card group block">
                    <p class="text-xs uppercase tracking-[0.28em] text-orange-300">Account</p>
                    <p class="mt-3 font-display text-xl uppercase tracking-[0.08em] text-stone-50 group-hover:text-orange-300 transition-colors">Profile</p>
                </Link>
                <Link v-if="user.is_admin" :href="route('admin.dashboard')" class="stat-card group block">
                    <p class="text-xs uppercase tracking-[0.28em] text-orange-300">Admin</p>
                    <p class="mt-3 font-display text-xl uppercase tracking-[0.08em] text-stone-50 group-hover:text-orange-300 transition-colors">Admin Panel</p>
                </Link>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
