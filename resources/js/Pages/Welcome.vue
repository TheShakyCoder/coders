<script setup>
import { Head, Link, usePage } from '@inertiajs/vue3';
import axios from 'axios';
import { computed, onMounted, ref, watch } from 'vue';

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

const page = usePage();
const currentUser = computed(() => page.props.auth?.user ?? null);
const clubSilverActive = computed(() => currentUser.value?.club_silver_active ?? false);
const clubSilverEndsAt = computed(() => currentUser.value?.club_silver_ends_at ?? null);

const checkoutError = ref('');
const clubSilverError = ref('');
const loadingCheckout = ref(false);
const loadingClubSilver = ref(false);

// Fruit machine state
const EMPTY = { slug: null, name: 'Empty', size_label: 'No sauce selected', accent: '#44403c' };
const reelItems = computed(() => [EMPTY, ...props.products]);
const slotIndices = ref([0, 0, 0]);
const spinDirections = ref(['', '', '']);
const isSpinning = ref(false);
const jackpot = ref(false);

const getReelItem = (slotI, offset = 0) => {
    const items = reelItems.value;
    const len = items.length;
    const idx = ((slotIndices.value[slotI] + offset) % len + len) % len;
    return items[idx];
};

const spinUp = (i) => {
    if (isSpinning.value) return;
    spinDirections.value[i] = 'up';
    const len = reelItems.value.length;
    slotIndices.value[i] = ((slotIndices.value[i] - 1) + len) % len;
    setTimeout(() => { spinDirections.value[i] = ''; }, 280);
};

const spinDown = (i) => {
    if (isSpinning.value) return;
    spinDirections.value[i] = 'down';
    slotIndices.value[i] = (slotIndices.value[i] + 1) % reelItems.value.length;
    setTimeout(() => { spinDirections.value[i] = ''; }, 280);
};

const spinReelToTarget = async (i, targetIdx) => {
    const spinCount = 6 + Math.floor(Math.random() * 4);
    for (let s = 0; s < spinCount; s++) {
        spinDirections.value[i] = 'down';
        slotIndices.value[i] = (slotIndices.value[i] + 1) % reelItems.value.length;
        await new Promise(r => setTimeout(r, 100));
    }
    // Final landing
    spinDirections.value[i] = 'down';
    slotIndices.value[i] = targetIdx;
    await new Promise(r => setTimeout(r, 340));
    spinDirections.value[i] = '';
};

const randomBox = async () => {
    if (isSpinning.value) return;
    isSpinning.value = true;
    checkoutError.value = '';

    const productCount = props.products.length;
    const targets = Array.from({ length: 3 }, () =>
        Math.floor(Math.random() * productCount) + 1,
    );

    // Stagger reel starts for that classic slot machine feel
    await Promise.all(
        targets.map((target, i) =>
            new Promise(resolve =>
                setTimeout(() => spinReelToTarget(i, target).then(resolve), i * 260),
            ),
        ),
    );

    isSpinning.value = false;
};

const resetBox = () => {
    if (isSpinning.value) return;
    slotIndices.value = [0, 0, 0];
};

onMounted(() => {
    setTimeout(randomBox, 400);
});

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

const subtotal = computed(() => {
    if (totalBottles.value === props.boxLimit) return 1999;
    return props.products.reduce(
        (sum, p) => sum + (counts.value[p.slug] ?? 0) * Number(p.unit_amount ?? 0),
        0,
    );
});

const selectedItemsPayload = computed(() =>
    props.products
        .filter(p => (counts.value[p.slug] ?? 0) > 0)
        .map(p => ({ product: p.slug, quantity: counts.value[p.slug] })),
);

const remainingSlots = computed(() => props.boxLimit - totalBottles.value);

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

const checkoutLabel = computed(() => {
    if (loadingCheckout.value) return 'Opening Checkout...';
    if (totalBottles.value === 0) return 'Checkout the Box';
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
    if (!value) return 'Pending activation';
    return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(value));
};

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
                <section class="pb-20 pt-4 lg:pt-6">
                    <!-- Slot Machine Builder — full width -->
                    <div id="builder" class="hero-panel">

                        <!-- Machine outer shell -->
                        <div
                            class="machine-shell mt-8"
                            :class="{ 'jackpot-active': jackpot }"
                        >
                            <!-- Top panel: marquee lights -->
                            <div class="flex items-center justify-between gap-2 border-b border-white/[0.04] bg-gradient-to-b from-black/50 to-black/20 px-4 py-3">
                                <div class="flex gap-[5px]">
                                    <div
                                        v-for="j in 8"
                                        :key="j"
                                        class="h-2 w-2 rounded-full border border-white/[0.08] bg-stone-900 transition-[background,box-shadow] duration-200"
                                        :class="{ 'bulb-on': isBoxFull || (isSpinning && j % 2 === 0) }"
                                        :style="{ animationDelay: `${j * 80}ms` }"
                                    />
                                </div>
                                <p
                                    class="font-display whitespace-nowrap text-[0.6rem] uppercase tracking-[0.28em] transition-colors duration-300"
                                    :class="jackpot ? 'text-orange-300' : 'text-stone-300/40'"
                                >
                                    {{ isBoxFull ? '★ JACKPOT ★' : '— CODERS HOT SAUCE —' }}
                                </p>
                                <div class="flex gap-[5px]">
                                    <div
                                        v-for="j in 8"
                                        :key="j"
                                        class="h-2 w-2 rounded-full border border-white/[0.08] bg-stone-900 transition-[background,box-shadow] duration-200"
                                        :class="{ 'bulb-on': isBoxFull || (isSpinning && j % 2 !== 0) }"
                                        :style="{ animationDelay: `${j * 80}ms` }"
                                    />
                                </div>
                            </div>

                            <!-- Slot progress dots -->
                            <div class="flex items-center justify-center gap-2 border-b border-white/[0.03] bg-black/25 px-4 py-2">
                                <div
                                    v-for="j in boxLimit"
                                    :key="j"
                                    class="h-2.5 w-2.5 rounded-full border border-white/10 bg-white/[0.06] transition-[background,box-shadow] duration-300"
                                    :style="totalBottles >= j && selectedSlots[j - 1]
                                        ? { backgroundColor: selectedSlots[j - 1].accent, boxShadow: `0 0 8px ${selectedSlots[j - 1].accent}80` }
                                        : {}"
                                />
                            </div>

                            <!-- Machine body: reels -->
                            <div class="flex items-stretch px-2 py-4">
                                <!-- Left chrome rail -->
                                <div class="w-[10px] shrink-0 rounded-sm bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-black/20" />

                                <!-- Reels -->
                                <div class="flex flex-1 items-start px-2">
                                    <template v-for="(_, i) in slotIndices" :key="i">
                                        <!-- Reel separator -->
                                        <div v-if="i > 0" class="w-px shrink-0 self-stretch bg-gradient-to-b from-transparent via-white/10 to-transparent" />

                                        <!-- Reel column -->
                                        <div class="flex flex-1 flex-col items-center gap-[0.4rem] px-1.5">
                                            <!-- Spin up -->
                                            <button
                                                type="button"
                                                class="reel-btn uppercase text-[#fb923c] flex h-16 w-full cursor-pointer items-center justify-center rounded-md border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-black/30 text-[1.5rem] text-stone-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_2px_4px_rgba(0,0,0,0.4)] transition-all duration-150 active:scale-90 disabled:cursor-not-allowed disabled:opacity-35"
                                                :disabled="isSpinning"
                                                @click="spinUp(i)"
                                                aria-label="Previous sauce"
                                            >
                                                ▲ Up
                                            </button>

                                            <!-- Reel viewport -->
                                            <div
                                                class="reel-viewport relative h-[550px] w-full overflow-hidden rounded-[14px] border bg-black/[0.82] shadow-[inset_0_2px_16px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(255,255,255,0.03)] transition-[border-color] duration-300"
                                                :style="{
                                                    borderColor: slotIndices[i] !== 0
                                                        ? getReelItem(i).accent + '60'
                                                        : 'rgba(255,255,255,0.06)',
                                                    '--reel-glow': slotIndices[i] !== 0
                                                        ? getReelItem(i).accent
                                                        : 'transparent',
                                                }"
                                            >
                                                <!-- Reel contents -->
                                                <div class="relative z-[2] flex h-full flex-col">
                                                    <!-- Previous item -->
                                                    <div class="flex h-[100px] shrink-0 flex-col items-center justify-center px-2 opacity-[0.5]">
                                                        <img
                                                            v-if="getReelItem(i, -1).image"
                                                            :src="getReelItem(i, -1).image"
                                                            class="h-full w-full object-contain p-1 px-2.5"
                                                            alt=""
                                                        />
                                                        <span v-else class="font-display text-[0.68rem] uppercase leading-snug tracking-[0.16em] text-stone-400 text-center">
                                                            {{ getReelItem(i, -1).slug
                                                                ? getReelItem(i, -1).name.replace("Coder's Hot ", '')
                                                                : '—' }}
                                                        </span>
                                                    </div>

                                                    <!-- Selected item (animated) -->
                                                    <div class="relative h-[380px] shrink-0 overflow-hidden">
                                                        <Transition :name="spinDirections[i] === 'up' ? 'reel-up' : 'reel-down'">
                                                            <div
                                                                :key="slotIndices[i]"
                                                                class="absolute inset-0 flex flex-col items-center justify-center gap-[3px] px-2"
                                                            >
                                                                <template v-if="slotIndices[i] !== 0">
                                                                    <img
                                                                        v-if="getReelItem(i).image"
                                                                        :src="getReelItem(i).image"
                                                                        class="h-full w-full shrink-0 object-contain p-1 px-2.5 transition-[filter] duration-300"
                                                                        :style="{ filter: `drop-shadow(0 0 8px ${getReelItem(i).accent}90)` }"
                                                                        alt=""
                                                                    />
                                                                    <template v-else>
                                                                        <div
                                                                            class="h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300"
                                                                            :style="{ backgroundColor: getReelItem(i).accent }"
                                                                        />
                                                                        <p
                                                                            class="font-display text-base uppercase leading-[1.1] tracking-[0.06em] text-center transition-colors duration-200"
                                                                            :style="{ color: getReelItem(i).accent }"
                                                                        >
                                                                            {{ getReelItem(i).name.replace("Coder's Hot ", '') }}
                                                                        </p>
                                                                    </template>
                                                                </template>
                                                                <template v-else>
                                                                    <p class="font-display text-base uppercase leading-[1.1] tracking-[0.06em] text-center text-stone-600">Empty</p>
                                                                    <p class="text-center text-[0.55rem] uppercase tracking-[0.22em] text-stone-600">Select a sauce</p>
                                                                </template>
                                                            </div>
                                                        </Transition>
                                                    </div>

                                                    <!-- Next item -->
                                                    <div class="flex h-[100px] shrink-0 flex-col items-center justify-center px-2 opacity-[0.5]">
                                                        <img
                                                            v-if="getReelItem(i, 1).image"
                                                            :src="getReelItem(i, 1).image"
                                                            class="h-full w-full object-contain p-1 px-2.5"
                                                            alt=""
                                                        />
                                                        <span v-else class="font-display text-[0.68rem] uppercase leading-snug tracking-[0.16em] text-stone-400 text-center">
                                                            {{ getReelItem(i, 1).slug
                                                                ? getReelItem(i, 1).name.replace("Coder's Hot ", '')
                                                                : '—' }}
                                                        </span>
                                                    </div>
                                                </div>

                                                <!-- Win-line overlay (centre band) -->
                                                <div
                                                    class="pointer-events-none absolute inset-x-0 top-[70px] z-10 h-[70px] border-b border-t transition-[border-color,background] duration-300"
                                                    :style="{
                                                        borderTopColor: slotIndices[i] !== 0
                                                            ? getReelItem(i).accent + '50'
                                                            : 'rgba(251,146,60,0.12)',
                                                        borderBottomColor: slotIndices[i] !== 0
                                                            ? getReelItem(i).accent + '50'
                                                            : 'rgba(251,146,60,0.12)',
                                                        background: slotIndices[i] !== 0
                                                            ? getReelItem(i).accent + '0c'
                                                            : 'rgba(251,146,60,0.02)',
                                                    }"
                                                />

                                                <!-- Glass gloss -->
                                                <div class="pointer-events-none absolute inset-0 z-[15] rounded-[inherit] bg-gradient-to-b from-white/[0.05] via-transparent to-black/[0.15]" />

                                                <!-- Scanlines -->
                                                <div class="pointer-events-none absolute inset-0 z-20 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(0,0,0,0.1)_3px,rgba(0,0,0,0.1)_4px)]" />
                                            </div>

                                            <!-- Spin down -->
                                            <button
                                                type="button"
                                                class="reel-btn uppercase text-[#00ff00] flex h-16 w-full cursor-pointer items-center justify-center rounded-md border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-black/30 text-[1.5rem] text-stone-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_2px_4px_rgba(0,0,0,0.4)] transition-all duration-150 active:scale-90 disabled:cursor-not-allowed disabled:opacity-35"
                                                :disabled="isSpinning"
                                                @click="spinDown(i)"
                                                aria-label="Next sauce"
                                            >
                                                ▼ Down
                                            </button>

                                            <!-- Slot number plate -->
                                            <div class="flex h-[22px] w-[22px] items-center justify-center rounded-full border border-white/[0.08] bg-black/50 font-display text-[0.6rem] tracking-[0.05em] text-white/25">
                                                {{ i + 1 }}
                                            </div>
                                        </div>
                                    </template>
                                </div>

                                <!-- Right chrome rail -->
                                <div class="w-[10px] shrink-0 rounded-sm bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-black/20" />
                            </div>

                            <!-- Machine bottom: Random spin button -->
                            <div class="flex items-center justify-center border-t border-white/[0.04] bg-gradient-to-b from-black/20 to-black/50 px-4 py-3">
                                <button
                                    type="button"
                                    class="spin-random-btn flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-orange-500/35 bg-gradient-to-br from-orange-500/[0.18] to-orange-600/[0.08] px-6 py-[0.65rem] font-display text-[0.75rem] uppercase tracking-[0.22em] text-orange-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_0_16px_rgba(249,115,22,0.1)] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
                                    :disabled="isSpinning"
                                    @click="randomBox"
                                >
                                    <span class="text-[0.9rem]">⚡</span>
                                    {{ isSpinning ? 'Spinning…' : 'Spin Random' }}
                                </button>
                            </div>
                        </div>

                        <!-- Summary -->
                        <div class="mt-6 rounded-[1.8rem] border border-white/10 bg-black/25 p-5">
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

                        <div class="mt-6 flex flex-col gap-3 sm:flex-row">
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
                                :disabled="totalBottles === 0 || isSpinning"
                                @click="resetBox"
                            >
                                Clear Box
                            </button>
                        </div>
                    </div>

                    <!-- Hero copy — below the machine -->
                    <div class="mt-14 grid gap-10 lg:grid-cols-[1fr_auto]">
                        <div class="space-y-6">
                            <div class="space-y-4">
                                <p class="section-label">Boxed heat, no filler</p>
                                <h1 class="font-display text-6xl uppercase leading-[0.88] tracking-[0.06em] text-stone-50 sm:text-8xl">
                                    Four sauces.<br>Three slots.<br>One tasty box.
                                </h1>
                                <p class="max-w-2xl text-lg leading-8 text-stone-300">
                                    Build a box from four 125ml bottles:
                                    <strong class="text-stone-100"> Coder's Hot Classic</strong>,
                                    <strong class="text-stone-100"> Coder's Hot Mango</strong>,
                                    <strong class="text-stone-100"> Coder's Hot Honey</strong>,
                                    and <strong class="text-stone-100">Coder's Hot Chocolate</strong>.
                                    Delivered anywhere in the UK for a flat £19.99.
                                </p>
                            </div>

                            <p v-if="checkoutError" class="rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                                {{ checkoutError }}
                            </p>
                        </div>

                        <div class="grid content-start gap-4 sm:grid-cols-3 lg:w-[480px] lg:grid-cols-1">
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
                                    <span
                                        v-if="counts[product.slug] > 0"
                                        class="chip border-white/10 bg-white/5 text-stone-300"
                                    >
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

                                <div class="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-stone-500">
                                    <span>Heat</span>
                                    <span class="font-display text-2xl tracking-[0.16em]" :style="{ color: product.accent }">
                                        {{ heatScale(product.heat_level) }}
                                    </span>
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

<style scoped>
/* ─── Machine shell (175deg gradient + multi-layer box-shadow can't be Tailwind) ── */
.machine-shell {
    border-radius: 1.6rem;
    background: linear-gradient(175deg, #1c1917 0%, #0a0907 55%, #161009 100%);
    border: 1px solid rgba(120, 113, 108, 0.28);
    box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.06),
        inset 0 -6px 24px rgba(0, 0, 0, 0.7),
        0 0 0 3px rgba(0, 0, 0, 0.5),
        0 0 0 4px rgba(100, 90, 80, 0.12),
        0 12px 40px rgba(0, 0, 0, 0.55);
    overflow: hidden;
    transition: box-shadow 0.4s ease;
}

@keyframes jackpot-pulse {
    0%, 100% {
        box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.06),
            inset 0 -6px 24px rgba(0, 0, 0, 0.7),
            0 0 0 3px rgba(0, 0, 0, 0.5),
            0 0 0 4px rgba(100, 90, 80, 0.12),
            0 12px 40px rgba(0, 0, 0, 0.55);
    }
    50% {
        box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.06),
            inset 0 -6px 24px rgba(0, 0, 0, 0.7),
            0 0 0 3px rgba(0, 0, 0, 0.5),
            0 0 0 4px rgba(249, 115, 22, 0.5),
            0 12px 60px rgba(249, 115, 22, 0.35),
            0 0 80px rgba(249, 115, 22, 0.15);
    }
}

.machine-shell.jackpot-active {
    animation: jackpot-pulse 0.55s ease-in-out 4;
}

/* ─── Marquee bulb lit state + flicker animation ─────────────── */
@keyframes bulb-flicker {
    from { opacity: 1; }
    to { opacity: 0.75; }
}

.bulb-on {
    background: #f97316 !important;
    border-color: #fb923c !important;
    box-shadow: 0 0 6px #f97316, 0 0 12px rgba(249, 115, 22, 0.4);
    animation: bulb-flicker 0.8s ease-in-out infinite alternate;
}

/* ─── Reel viewport outer glow (::after pseudo-element) ──────── */
.reel-viewport::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: 0 0 20px -4px var(--reel-glow, transparent);
    pointer-events: none;
    z-index: 5;
    transition: box-shadow 0.4s ease;
}

/* ─── Reel button green pulse ─────────────────────────────────── */
@keyframes reel-btn-pulse {
    0%, 100% {
        background: linear-gradient(135deg, rgba(34,197,94,0.18), rgba(22,163,74,0.08));
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 0 8px rgba(34,197,94,0.3);
        border-color: rgba(34,197,94,0.35);
    }
    50% {
        background: linear-gradient(135deg, rgba(34,197,94,0.35), rgba(22,163,74,0.18));
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 0 18px rgba(34,197,94,0.6), 0 0 32px rgba(34,197,94,0.2);
        border-color: rgba(34,197,94,0.65);
    }
}
.reel-btn { animation: reel-btn-pulse 2s ease-in-out infinite; color: #86efac; }
.reel-btn:disabled { animation: none; }
.reel-btn:hover:not(:disabled) {
    background: linear-gradient(135deg, rgba(34,197,94,0.45), rgba(22,163,74,0.25));
    border-color: rgba(34,197,94,0.8);
    color: #bbf7d0;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 0 24px rgba(34,197,94,0.5);
    animation: none;
}

/* ─── Spin random button hover ───────────────────────────────── */
.spin-random-btn:hover:not(:disabled) {
    background: linear-gradient(135deg, rgba(249,115,22,0.3) 0%, rgba(234,88,12,0.16) 100%);
    border-color: rgba(249, 115, 22, 0.6);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.07), 0 0 24px rgba(249,115,22,0.25);
}

/* ─── Vue reel transitions ───────────────────────────────────── */
.reel-up-enter-from { transform: translateY(-100%); opacity: 0; }
.reel-up-leave-to   { transform: translateY(100%);  opacity: 0; }
.reel-up-enter-active { transition: transform 0.22s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.14s ease; }
.reel-up-leave-active {
    position: absolute; inset: 0;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    transition: transform 0.22s cubic-bezier(0.55, 0, 0.55, 0.2), opacity 0.14s ease;
}

.reel-down-enter-from { transform: translateY(100%);  opacity: 0; }
.reel-down-leave-to   { transform: translateY(-100%); opacity: 0; }
.reel-down-enter-active { transition: transform 0.22s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.14s ease; }
.reel-down-leave-active {
    position: absolute; inset: 0;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    transition: transform 0.22s cubic-bezier(0.55, 0, 0.55, 0.2), opacity 0.14s ease;
}
</style>
