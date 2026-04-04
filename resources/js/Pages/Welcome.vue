<script setup>
import { Head, Link } from '@inertiajs/vue3';
import axios from 'axios';
import { computed, ref, watch } from 'vue';
import Contact from '@/Components/Sections/Contact.vue';
import FinalCta from '@/Components/Sections/FinalCta.vue';
import Testimonials from '@/Components/Sections/Testimonials.vue';
import { numberToWord } from '@/Composables/formatting';
import Logo from '@/Components/Logo.vue';
import Hero from '@/Components/Sections/Hero.vue';

const props = defineProps({
    canLogin: {
        type: Boolean,
        default: false,
    },
    canRegister: {
        type: Boolean,
        default: false,
    },
    products: {
        type: Array,
        default: () => [],
    },
    boxLimit: {
        type: Number,
        default: 3,
    },
});

const checkoutError = ref('');
const loadingCheckout = ref(false);

// Fruit machine state
const EMPTY = { slug: null, name: 'Empty', size_label: 'No sauce selected', accent: '#44403c' };
const reelItems = computed(() => [EMPTY, ...props.products]);
const slotIndices = ref([0, 0, 0]);
const jackpot = ref(false);

// Derived from slot machine
const selectedSlots = computed(() =>
    slotIndices.value.map(i => {
        const item = reelItems.value[i];
        return item.slug ? item : null;
    }),
);

const totalBottles = computed(() => selectedSlots.value.filter(Boolean).length);
const isBoxFull = computed(() => totalBottles.value === props.boxLimit);

watch(isBoxFull, (full) => {
    if (full) {
        jackpot.value = true;
        setTimeout(() => { jackpot.value = false; }, 2600);
    }
});

const counts = computed(() =>
    props.products.reduce((acc, p) => {
        acc[p.slug] = selectedSlots.value.filter(s => s?.slug === p.slug).length;
        return acc;
    }, {}),
);

const selectedItemsPayload = computed(() =>
    props.products
        .filter(p => (counts.value[p.slug] ?? 0) > 0)
        .map(p => ({ product: p.slug, quantity: counts.value[p.slug] })),
);

const credibility = [
    {
        title: numberToWord(props.products.length) + ' Bottle Range',
        copy: 'Classic, Mango, Hot Honey, and the darker Chocolate bottle. All 125ml, all built for pizza.',
    },
    {
        title: '£19.99 Delivered',
        copy: 'One flat price for the full box, delivered anywhere in the UK. No extra shipping math.',
    },
    {
        title: 'Branded Merch',
        copy: 'Coming soon. Wear the heat while you shop the box. Provisions are being made.',
    },
];

const ourSauces = [
    'soya free',
    'gluten free',
    'palm oil free',
    'no artificial colours',
    'no artificial flavours',
    'no artificial sweeteners',
    'no artificial preservatives',
]

const checkoutLabel = computed(() => {
    if (loadingCheckout.value) return 'Opening Checkout...';
    if (totalBottles.value === 0) return 'Checkout the Box';
    return `Checkout ${totalBottles.value} Bottle${totalBottles.value === 1 ? '' : 's'}`;
});



const heatScale = (level) => `${'●'.repeat(level)}${'○'.repeat(Math.max(0, 5 - level))}`;

const startCheckout = async () => {
    if (selectedItemsPayload.value.length === 0) {
        checkoutError.value = 'Pick at least one bottle before checkout.';
        return;
    }

    checkoutError.value = '';
    loadingCheckout.value = true;

    try {
        const response = await axios.post(route('checkout.store'), {
            items: selectedItemsPayload.value,
        });

        window.location.href = response.data.checkout_url;
    } catch (error) {
        checkoutError.value =
            error.response?.data?.message ??
            error.response?.data?.errors?.items?.[0] ??
            'Checkout failed. Confirm Stripe is configured and try again.';
        loadingCheckout.value = false;
    }
};
</script>

<template>

    <Head title="Coder's Hot Sauce" />

    <div class="site-shell">
        <div class="mesh-bg absolute inset-0 opacity-70" />
        <div
            class="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.32),transparent_55%)]" />
        <div class="absolute right-0 top-24 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />
        <div class="absolute left-0 top-[30rem] h-96 w-96 rounded-full bg-red-500/10 blur-3xl" />

        <div class="relative mx-auto flex min-h-screen max-w-7xl flex-col px-0 pb-16 lg:pt-6 lg:px-8">
            <header class="glow-panel rounded-none lg:rounded-[2rem] flex items-center justify-between px-5 py-4">
                <a href="#" class="flex items-center gap-4">
                    <div
                        class="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl font-display tracking-[0.18em] text-orange-300">
                        <Logo />
                    </div>
                    <div>
                        <p class="font-display text-2xl lg:text-3xl uppercase tracking-[0.16em] text-stone-50">
                            Coder's Hot Sauce
                        </p>
                        <p class="text-xs uppercase tracking-none lg:tracking-[0.28em] text-stone-400">
                            Fuel for working techies
                        </p>
                    </div>
                </a>

                <nav class="hidden items-center gap-6 text-sm uppercase tracking-[0.22em] text-stone-300 md:flex">
                    <a href="#bottles" class="transition hover:text-orange-300">Bottles</a>
                    <a href="#builder" class="transition hover:text-orange-300">Build a Box</a>
                    <a href="#merchandise" class="transition hover:text-orange-300">Merchandise</a>
                    <a href="#contact" class="transition hover:text-orange-300">Contact</a>
                    <Link v-if="$page.props.auth.user" :href="route('dashboard')" class="ghost-button px-4 py-2">
                        Dashboard
                    </Link>
                    <Link v-else-if="canLogin" :href="route('login')" class="ghost-button px-4 py-2">
                        Sign In
                    </Link>
                </nav>
            </header>

            <main class="flex-1">
                <Hero :products="products" :box-limit="boxLimit" :checkout-label="checkoutLabel"
                    :loading-checkout="loadingCheckout" :credibility="credibility" @start-checkout="startCheckout" />

                <section id="bottles" class="pb-12">
                    <div class="mb-8 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between px-5 md:px-0">
                        <div>
                            <p class="section-label">Choose from</p>
                            <h2
                                class="mt-3 font-display text-4xl sm:text-5xl uppercase tracking-[0.08em] text-stone-50 ">
                                {{ numberToWord(products.length) }} 125ml bottles.<br>Buy One £19.99 Box.
                            </h2>
                        </div>
                        <p class="max-w-xl text-base leading-7 text-stone-400">
                            Build a safe office box, a sweet-and-hot split, or a heavier late-night mix with Chocolate
                            in the rotation.
                        </p>
                    </div>

                    <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        <article v-for="product in products" :key="product.slug" class="product-card" :style="{
                            '--card-accent': product.accent,
                            '--card-glow': product.glow,
                        }">
                            <div class="relative z-10 flex h-full flex-col">
                                <div class="flex items-start justify-between gap-4">
                                    <p class="section-label">{{ product.size_label }}</p>
                                    <span v-if="counts[product.slug] > 0"
                                        class="chip border-white/10 bg-white/5 text-stone-300">
                                        ×{{ counts[product.slug] }} in box
                                    </span>
                                    <span v-else class="chip border-white/10 bg-white/5 text-stone-300">
                                        Box Item
                                    </span>
                                </div>

                                <div class="mt-8 rounded-[1.8rem] border border-white/10 bg-black/25 p-5">
                                    <p class="text-xs uppercase tracking-[0.32em] text-stone-500">Bottle</p>
                                    <h3 class="mt-3 font-display text-4xl uppercase tracking-[0.08em] text-stone-50">
                                        {{ product.name }}
                                    </h3>
                                    <p class="mt-3 text-sm leading-7 text-stone-300">
                                        {{ product.tagline }}
                                    </p>
                                </div>

                                <p class="mt-6 flex-1 text-sm leading-7 text-stone-400">
                                    {{ product.description }}
                                </p>

                                <div
                                    class="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-stone-500">
                                    <span>Heat</span>
                                    <span class="font-display text-2xl tracking-[0.16em]"
                                        :style="{ color: product.accent }">
                                        {{ heatScale(product.heat_level) }}
                                    </span>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>

                <section id="merchandise" class="pb-20">
                    <div class="flex flex-col md:flex-row items-start md:items-center">
                        <div
                            class="w-full sm:w-2/3 glow-panel rounded-none sm:rounded-[2rem] p-8 sm:p-10 border-dashed border-2 border-orange-500/20">
                            <p class="section-label">Provision</p>
                            <h2 class="mt-4 font-display text-5xl uppercase tracking-[0.08em] text-stone-50">
                                Branded Merch.
                            </h2>
                            <p class="mt-6 text-base leading-8 text-stone-300">
                                Provisions are being made to sell branded apparel and gear. Details are currently being
                                finalized to ensure every thread meets the same standard as the sauce.
                            </p>
                            <div class="mt-8 flex items-center gap-4 text-orange-300/50">
                                <span class="text-sm uppercase tracking-[0.2em]">Coming Soon</span>
                                <div class="h-px flex-1 bg-gradient-to-r from-orange-500/20 to-transparent" />
                            </div>
                        </div>

                        <div class="px-10 mt-10 md:mt-0">
                            <ul class="list-disc list-inside span-2 text-lg">
                                <li v-for="sauce in ourSauces" :key="sauce">
                                    {{ sauce }}
                                </li>
                            </ul>

                        </div>
                    </div>
                </section>

                <Testimonials />

                <Contact />
                
                <FinalCta />
            </main>

        </div>
    </div>
</template>

<style scoped>

</style>
