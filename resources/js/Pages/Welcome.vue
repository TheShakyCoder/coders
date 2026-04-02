<script setup>
import { Head, Link, usePage } from '@inertiajs/vue3';
import axios from 'axios';
import { computed, ref } from 'vue';

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
    boxName: {
        type: String,
        default: "Coder's Hot Sauce Box",
    },
});

const page = usePage();
const currentUser = computed(() => page.props.auth?.user ?? null);
const clubSilverActive = computed(() => currentUser.value?.club_silver_active ?? false);
const clubSilverEndsAt = computed(() => currentUser.value?.club_silver_ends_at ?? null);

const checkoutError = ref('');
const clubSilverError = ref('');
const loadingCheckout = ref(false);
const loadingClubSilver = ref(false);
const counts = ref(
    Object.fromEntries(props.products.map((product) => [product.slug, 0])),
);

const credibility = [
    {
        title: '4 Bottle Range',
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

const testimonials = [
    {
        quote: "Chocolate Hot on sausage pizza is serious enough that I stopped sharing the bottle.",
        role: 'Engineering Lead, Bristol',
    },
    {
        quote: "Classic plus Hot Honey is the right two-bottle answer for every Friday deploy I have had this year.",
        role: 'Product Designer, London',
    },
    {
        quote: "Club Silver paying for its own delivery inside a month is exactly the kind of subscription math I respect.",
        role: 'Founder, Leeds',
    },
];

const totalBottles = computed(() =>
    Object.values(counts.value).reduce((total, quantity) => total + quantity, 0),
);

const subtotal = computed(() => {
    if (totalBottles.value === props.boxLimit) {
        return 1999;
    }
    return props.products.reduce(
        (sum, product) => sum + (counts.value[product.slug] ?? 0) * Number(product.unit_amount ?? 0),
        0,
    );
});

const selectedSlots = computed(() =>
    props.products.flatMap((product) =>
        Array.from({ length: counts.value[product.slug] ?? 0 }, () => product),
    ),
);

const selectedItemsPayload = computed(() =>
    props.products
        .filter((product) => (counts.value[product.slug] ?? 0) > 0)
        .map((product) => ({
            product: product.slug,
            quantity: counts.value[product.slug],
        })),
);

const remainingSlots = computed(() => props.boxLimit - totalBottles.value);

const canAddBottle = computed(() => totalBottles.value < props.boxLimit);

const checkoutLabel = computed(() => {
    if (loadingCheckout.value) {
        return 'Opening Checkout...';
    }

    if (totalBottles.value === 0) {
        return 'Checkout the Box';
    }

    return `Checkout ${totalBottles.value} Bottle${totalBottles.value === 1 ? '' : 's'}`;
});

const deliveryPreview = computed(() =>
    totalBottles.value === props.boxLimit
        ? 'UK delivery included in the £19.99 price'
        : 'Build a full box to unlock the £19.99 delivered price',
);

const formatMoney = (amount) =>
    new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
    }).format(amount / 100);

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

const heatScale = (level) => `${'●'.repeat(level)}${'○'.repeat(Math.max(0, 5 - level))}`;

const addBottle = (slug) => {
    if (totalBottles.value >= props.boxLimit) {
        return;
    }

    counts.value[slug] = (counts.value[slug] ?? 0) + 1;
};

const removeBottle = (slug) => {
    if ((counts.value[slug] ?? 0) === 0) {
        return;
    }

    counts.value[slug] -= 1;
};

const resetBox = () => {
    counts.value = Object.fromEntries(props.products.map((product) => [product.slug, 0]));
};

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

const startClubSilverCheckout = async () => {
    clubSilverError.value = '';
    loadingClubSilver.value = true;

    try {
        const response = await axios.post(route('club-silver.store'));

        window.location.href = response.data.checkout_url;
    } catch (error) {
        clubSilverError.value =
            error.response?.data?.message ??
            'Club Silver checkout failed. Confirm Stripe is configured and try again.';
        loadingClubSilver.value = false;
    }
};
</script>

<template>
    <Head title="Coders Hot Sauce" />

    <div class="site-shell">
        <div class="mesh-bg absolute inset-0 opacity-70" />
        <div class="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.32),transparent_55%)]" />
        <div class="absolute right-0 top-24 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />
        <div class="absolute left-0 top-[30rem] h-96 w-96 rounded-full bg-red-500/10 blur-3xl" />

        <div class="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 pb-16 pt-6 lg:px-8">
            <header class="glow-panel flex items-center justify-between px-5 py-4">
                <a href="#" class="flex items-center gap-4">
                    <div class="flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-400/40 bg-orange-500/10 text-2xl font-display tracking-[0.18em] text-orange-300">
                        CH
                    </div>
                    <div>
                        <p class="font-display text-3xl uppercase tracking-[0.16em] text-stone-50">
                            Coders Hot Sauce
                        </p>
                        <p class="text-xs uppercase tracking-[0.28em] text-stone-400">
                            Pizza fuel for working professionals
                        </p>
                    </div>
                </a>

                <nav class="hidden items-center gap-6 text-sm uppercase tracking-[0.22em] text-stone-300 md:flex">
                    <a href="#bottles" class="transition hover:text-orange-300">Bottles</a>
                    <a href="#builder" class="transition hover:text-orange-300">Build a Box</a>
                    <a href="#club-silver" class="transition hover:text-orange-300">Club Silver</a>
                    <Link
                        v-if="$page.props.auth.user"
                        :href="route('dashboard')"
                        class="ghost-button px-4 py-2"
                    >
                        Dashboard
                    </Link>
                    <Link
                        v-else-if="canLogin"
                        :href="route('login')"
                        class="ghost-button px-4 py-2"
                    >
                        Sign In
                    </Link>
                </nav>
            </header>

            <main class="flex-1">
                <section class="grid items-start gap-10 pb-20 pt-14 lg:grid-cols-[1.02fr_0.98fr] lg:pt-20">
                    <div class="space-y-8">
                        <div class="space-y-4">
                            <p class="section-label">Boxed heat, no filler</p>
                            <h1 class="max-w-4xl font-display text-xl uppercase leading-[0.88] tracking-[0.06em] text-stone-50 sm:text-8xl">
                                Four sauces.<br>Three slots.<br>One tasty box.
                            </h1>
                            <p class="max-w-2xl text-lg leading-8 text-stone-300 sm:text-xl">
                                Build a box from four 125ml bottles:
                                <strong class="text-stone-100"> Coder's Hot Classic</strong>,
                                <strong class="text-stone-100"> Coder's Hot Mango</strong>,
                                <strong class="text-stone-100"> Coder's Hot Honey</strong>,
                                and <strong class="text-stone-100">Coder's Hot Chocolate</strong>.
                                Delivered anywhere in the UK for a flat £19.99.
                            </p>
                        </div>

                        <div class="flex flex-col gap-4 sm:flex-row">
                            <a href="#builder" class="fire-button text-center">Build Your Box</a>
                        </div>

                        <p v-if="checkoutError" class="rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                            {{ checkoutError }}
                        </p>

                        <div class="grid gap-4 sm:grid-cols-3">
                            <article
                                v-for="item in credibility"
                                :key="item.title"
                                class="stat-card"
                            >
                                <p class="text-xs uppercase tracking-[0.28em] text-orange-300">
                                    {{ item.title }}
                                </p>
                                <p class="mt-3 text-sm leading-7 text-stone-300">
                                    {{ item.copy }}
                                </p>
                            </article>
                        </div>
                    </div>

                    <div id="builder" class="hero-panel">
                        <div class="flex items-start justify-between gap-4">
                            <div>
                                <p class="section-label">Live builder</p>
                                <h2 class="mt-4 font-display text-5xl uppercase tracking-[0.08em] text-stone-50">
                                    {{ boxName }}
                                </h2>
                            </div>
                            <span class="chip bg-orange-500/15 text-orange-200">
                                {{ totalBottles }}/{{ boxLimit }} selected
                            </span>
                        </div>

                        <p class="mt-6 max-w-md text-base leading-8 text-stone-300">
                            Choose three bottles to fill the box. Delivered anywhere in the UK for £19.99 total.
                        </p>

                        <div class="mt-8 grid gap-4 sm:grid-cols-3">
                            <div
                                v-for="slot in boxLimit"
                                :key="slot"
                                class="rounded-[1.6rem] border border-white/10 bg-black/30 p-5"
                            >
                                <p class="text-xs uppercase tracking-[0.24em] text-stone-500">Slot {{ slot }}</p>
                                <p class="mt-3 text-sm leading-6 text-stone-100">
                                    {{ selectedSlots[slot - 1]?.name || 'Empty slot' }}
                                </p>
                                <p class="mt-2 text-xs uppercase tracking-[0.24em] text-stone-500">
                                    {{ selectedSlots[slot - 1]?.size_label || 'Add a 125ml bottle' }}
                                </p>
                            </div>
                        </div>

                        <div class="mt-8 rounded-[1.8rem] border border-white/10 bg-black/25 p-5">
                            <div class="flex items-center justify-between text-sm uppercase tracking-[0.2em] text-stone-400">
                                <span>Box subtotal</span>
                                <span class="font-display text-4xl tracking-[0.08em] text-stone-50">
                                    {{ formatMoney(subtotal) }}
                                </span>
                            </div>
                            <p class="mt-3 text-sm leading-6 text-stone-400">
                                {{ deliveryPreview }}.
                                {{ remainingSlots > 0 ? `${remainingSlots} slot${remainingSlots === 1 ? '' : 's'} remaining.` : 'Box full.' }}
                            </p>
                        </div>

                        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
                            <button
                                type="button"
                                class="fire-button"
                                :disabled="loadingCheckout || totalBottles === 0"
                                @click="startCheckout"
                            >
                                {{ checkoutLabel }}
                            </button>
                            <button
                                type="button"
                                class="ghost-button"
                                :disabled="totalBottles === 0"
                                @click="resetBox"
                            >
                                Clear Box
                            </button>
                        </div>
                    </div>
                </section>

                <section id="bottles" class="pb-20">
                    <div class="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p class="section-label">Bottles</p>
                             <h2 class="mt-3 font-display text-5xl uppercase tracking-[0.08em] text-stone-50 sm:text-6xl">
                                Four 125ml bottles. One £19.99 box.
                            </h2>
                        </div>
                        <p class="max-w-xl text-base leading-7 text-stone-400">
                            Every bottle can be repeated. Build a safe office box, a sweet-and-hot split, or a heavier late-night mix with Chocolate in the rotation.
                        </p>
                    </div>

                    <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        <article
                            v-for="product in products"
                            :key="product.slug"
                            class="product-card"
                            :style="{
                                '--card-accent': product.accent,
                                '--card-glow': product.glow,
                            }"
                        >
                            <div class="relative z-10 flex h-full flex-col">
                                <div class="flex items-start justify-between gap-4">
                                    <p class="section-label">{{ product.size_label }}</p>
                                     <span class="chip border-white/10 bg-white/5 text-stone-300">
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

                                <div class="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-stone-500">
                                    <span>Heat</span>
                                    <span class="font-display text-2xl tracking-[0.16em]" :style="{ color: product.accent }">
                                        {{ heatScale(product.heat_level) }}
                                    </span>
                                </div>

                                <div class="mt-6 flex items-center justify-between rounded-[1.4rem] border border-white/10 bg-black/25 px-4 py-3">
                                    <button
                                        type="button"
                                        class="quantity-button"
                                        :disabled="(counts[product.slug] ?? 0) === 0"
                                        @click="removeBottle(product.slug)"
                                    >
                                        -
                                    </button>
                                    <div class="text-center">
                                        <p class="text-xs uppercase tracking-[0.24em] text-stone-500">In box</p>
                                        <p class="mt-1 font-display text-4xl uppercase tracking-[0.08em] text-stone-50">
                                            {{ counts[product.slug] ?? 0 }}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        class="quantity-button"
                                        :disabled="!canAddBottle"
                                        @click="addBottle(product.slug)"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>

                <section id="merch" class="pb-20">
                    <div class="glow-panel p-8 sm:p-10 border-dashed border-2 border-orange-500/20">
                        <p class="section-label">Provision</p>
                        <h2 class="mt-4 font-display text-5xl uppercase tracking-[0.08em] text-stone-50">
                            Branded Merch.
                        </h2>
                        <p class="mt-6 text-base leading-8 text-stone-300">
                            Provisions are being made to sell branded apparel and gear. Details are currently being finalized to ensure every thread meets the same standard as the sauce.
                        </p>
                        <div class="mt-8 flex items-center gap-4 text-orange-300/50">
                            <span class="text-sm uppercase tracking-[0.2em]">Coming Soon</span>
                            <div class="h-px flex-1 bg-gradient-to-r from-orange-500/20 to-transparent" />
                        </div>
                    </div>
                </section>

                <section id="proof" class="pb-16">
                    <div class="mb-8">
                        <p class="section-label">Proof</p>
                        <h2 class="mt-3 font-display text-5xl uppercase tracking-[0.08em] text-stone-50 sm:text-6xl">
                            Built for people who actually ship work.
                        </h2>
                    </div>

                    <div class="grid gap-6 lg:grid-cols-3">
                        <article
                            v-for="testimonial in testimonials"
                            :key="testimonial.role"
                            class="glow-panel p-8"
                        >
                            <p class="text-lg leading-8 text-stone-200">
                                "{{ testimonial.quote }}"
                            </p>
                            <p class="mt-6 text-xs uppercase tracking-[0.28em] text-orange-300">
                                {{ testimonial.role }}
                            </p>
                        </article>
                    </div>
                </section>
            </main>

            <footer class="glow-panel flex flex-col gap-6 px-6 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p class="section-label">Final CTA</p>
                    <h2 class="mt-3 font-display text-4xl uppercase tracking-[0.08em] text-stone-50">
                        Fill the box before the next pizza lands.
                    </h2>
                </div>
                <div class="flex flex-col gap-3 sm:flex-row">
                    <a href="#builder" class="ghost-button text-center">Open the builder</a>
                    <button
                        type="button"
                        class="fire-button"
                        :disabled="loadingCheckout || totalBottles === 0"
                        @click="startCheckout"
                    >
                        {{ checkoutLabel }}
                    </button>
                </div>
            </footer>
        </div>
    </div>
</template>
