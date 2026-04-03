<script setup>
import { Head, Link } from '@inertiajs/vue3';

const props = defineProps({
    member: {
        type: Object,
        default: null,
    },
});

const formatDate = (value) => {
    if (!value) {
        return 'Pending activation';
    }

    return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(value));
};
</script>

<template>
    <Head title="Club Silver" />

    <div class="site-shell">
        <div class="mesh-bg absolute inset-0 opacity-70" />
        <div class="relative mx-auto flex min-h-screen max-w-4xl items-center px-6 py-16">
            <div class="glow-panel rounded-[2rem] w-full p-8 sm:p-12">
                <p class="section-label">Club Silver</p>
                <h1 class="mt-4 font-display text-6xl uppercase tracking-[0.08em] text-stone-50 sm:text-7xl">
                    UK delivery unlocked.
                </h1>
                <p class="mt-6 max-w-2xl text-lg leading-8 text-stone-300">
                    Your Club Silver membership is on the way. While it is active, UK delivery drops to free at checkout.
                </p>

                <div class="mt-10 grid gap-4 sm:grid-cols-2">
                    <div class="rounded-[1.6rem] border border-white/10 bg-black/30 p-6">
                        <p class="text-xs uppercase tracking-[0.24em] text-stone-500">Member</p>
                        <p class="mt-3 font-display text-4xl uppercase tracking-[0.08em] text-stone-50">{{ member?.name || 'Signed-in user' }}</p>
                    </div>
                    <div class="rounded-[1.6rem] border border-white/10 bg-black/30 p-6">
                        <p class="text-xs uppercase tracking-[0.24em] text-stone-500">Free delivery until</p>
                        <p class="mt-3 text-3xl font-semibold text-stone-50">{{ formatDate(member?.club_silver_ends_at) }}</p>
                    </div>
                </div>

                <div class="mt-10 flex flex-col gap-3 sm:flex-row">
                    <Link :href="route('home')" class="fire-button text-center">
                        Back to storefront
                    </Link>
                    <Link :href="`${route('home')}#club-silver`" class="ghost-button text-center">
                        Review benefits
                    </Link>
                </div>
            </div>
        </div>
    </div>
</template>
