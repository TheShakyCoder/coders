<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { formatMoney } from '@/Composables/formatting';

const props = defineProps({
    products: { type: Array, default: () => [] },
    boxLimit: { type: Number, default: 3 },
    checkoutLabel: { type: String, default: 'Checkout' },
    loadingCheckout: { type: Boolean, default: false },
});

const emit = defineEmits(['change']);

// ─── Reel state ───────────────────────────────────────────────────────────────

const CELL_H = 120;
const STRIP_REPS = 14;

const reelItems = computed(() => props.products);

const stripItems = computed(() => {
    const out = [];
    for (let r = 0; r < STRIP_REPS; r++) out.push(...reelItems.value);
    return out;
});

const midStart = () => Math.floor(STRIP_REPS / 2) * reelItems.value.length;
const reelStripIdx = ref([midStart(), midStart(), midStart()]);
const reelTransStyle = ref(['none', 'none', 'none']);
const isSpinning = ref(false);
const jackpot = ref(false);

const trackY = (si) => `translateY(${(1 - si) * CELL_H}px)`;

const slotIndices = computed(() =>
    reelStripIdx.value.map(si => {
        const len = reelItems.value.length;
        return ((si % len) + len) % len;
    }),
);

const getReelItem = (reelI, offset = 0) => {
    const len = reelItems.value.length;
    const idx = ((slotIndices.value[reelI] + offset) % len + len) % len;
    return reelItems.value[idx];
};

// ─── Spin logic ───────────────────────────────────────────────────────────────

const spinUp = (i) => {
    if (isSpinning.value) return;
    reelTransStyle.value[i] = 'transform 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    reelStripIdx.value[i]--;
    setTimeout(() => { reelTransStyle.value[i] = 'none'; }, 220);
};

const spinDown = (i) => {
    if (isSpinning.value) return;
    reelTransStyle.value[i] = 'transform 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    reelStripIdx.value[i]++;
    setTimeout(() => { reelTransStyle.value[i] = 'none'; }, 220);
};

const spinReelToTarget = async (i, targetItemIdx) => {
    const len = reelItems.value.length;
    const current = reelStripIdx.value[i];
    const fastSpins = 14 + Math.floor(Math.random() * 8);

    reelTransStyle.value[i] = `transform ${fastSpins * 55}ms linear`;
    reelStripIdx.value[i] = current + fastSpins;
    await new Promise(r => setTimeout(r, fastSpins * 55 + 20));

    const mid = reelStripIdx.value[i];
    const currentItem = ((mid % len) + len) % len;
    const extra = ((targetItemIdx - currentItem) + len) % len;
    const targetStripIdx = mid + (extra === 0 ? len : extra);

    reelTransStyle.value[i] = 'transform 580ms cubic-bezier(0.17, 0.67, 0.12, 1.0)';
    reelStripIdx.value[i] = targetStripIdx;
    await new Promise(r => setTimeout(r, 640));

    const finalItem = ((targetStripIdx % len) + len) % len;
    reelTransStyle.value[i] = 'none';
    await nextTick();
    reelStripIdx.value[i] = midStart() + finalItem;
};

const spinRandom = async () => {
    if (isSpinning.value) return;
    isSpinning.value = true;

    const productCount = props.products.length;
    const targets = Array.from({ length: props.boxLimit }, () =>
        Math.floor(Math.random() * productCount),
    );

    await Promise.all(
        targets.map((target, i) =>
            new Promise(resolve =>
                setTimeout(() => spinReelToTarget(i, target).then(resolve), i * 200),
            ),
        ),
    );

    isSpinning.value = false;
};

const reset = () => {
    if (isSpinning.value) return;
    const base = midStart();
    reelTransStyle.value = ['none', 'none', 'none'];
    reelStripIdx.value = [base, base, base];
};

defineExpose({ reset, spinRandom });

onMounted(() => { setTimeout(spinRandom, 400); });

// ─── Derived selection ────────────────────────────────────────────────────────

const selectedSlots = computed(() =>
    slotIndices.value.map(i => reelItems.value[i]),
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

// Emit change whenever selection or spinning state changes
watch(
    [selectedSlots, isSpinning],
    () => {
        emit('change', {
            selectedSlots: selectedSlots.value,
            counts: counts.value,
            totalBottles: totalBottles.value,
            isBoxFull: isBoxFull.value,
            isSpinning: isSpinning.value,
            selectedItemsPayload: selectedItemsPayload.value,
        });
    },
    { immediate: true },
);

const subtotal = computed(() => {
    if (totalBottles.value === props.boxLimit) return 1999;
    return props.products.reduce(
        (sum, p) => sum + (counts.value[p.slug] ?? 0) * Number(p.unit_amount ?? 0),
        0,
    );
});

const deliveryPreview = computed(() =>
    totalBottles.value === props.boxLimit
        ? 'UK delivery included in the price'
        : 'Build a full box to unlock',
);

const remainingSlots = computed(() => props.boxLimit - totalBottles.value);
</script>

<template>
    <div id="builder" class="hero-panel">
        <div class="flex items-start justify-between gap-4">
            <div>
                <h2 class="mb-4 font-display text-5xl uppercase tracking-[0.08em] text-stone-50 flex flex-col">
                    <span class="text-2xl">Coder's</span>
                    <span>Slot Machine</span>
                </h2>
            </div>
        </div>

        <div class="machine-shell" :class="{ 'jackpot-active': jackpot }">
            <!-- Top panel: marquee lights -->
            <div
                class="flex items-center justify-between gap-2 border-b border-white/[0.04] bg-gradient-to-b from-black/50 to-black/20 px-4 py-3">
                <div class="flex gap-[5px]">
                    <div v-for="j in 8" :key="j"
                        class="h-2 w-2 rounded-full border border-white/[0.08] bg-stone-900 transition-[background,box-shadow] duration-200"
                        :class="{ 'bulb-on': isBoxFull || (isSpinning && j % 2 === 0) }"
                        :style="{ animationDelay: `${j * 80}ms` }" />
                </div>
                <p class="font-display whitespace-nowrap text-[0.6rem] uppercase tracking-[0.28em] transition-colors duration-300"
                    :class="jackpot ? 'text-orange-300' : 'text-stone-300/40'">
                    {{ isBoxFull ? '★ JACKPOT ★' : '— CODERS HOT SAUCE —' }}
                </p>
                <div class="flex gap-[5px]">
                    <div v-for="j in 8" :key="j"
                        class="h-2 w-2 rounded-full border border-white/[0.08] bg-stone-900 transition-[background,box-shadow] duration-200"
                        :class="{ 'bulb-on': isBoxFull || (isSpinning && j % 2 !== 0) }"
                        :style="{ animationDelay: `${j * 80}ms` }" />
                </div>
            </div>

            <!-- Random spin button -->
            <div
                class="flex items-center justify-center border-t border-white/[0.04] bg-gradient-to-b from-black/20 to-black/50 px-4 py-3">
                <button type="button"
                    class="spin-random-btn h-12 text-xl flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-orange-500/35 bg-gradient-to-br from-orange-500/[0.18] to-red-600/[0.08] px-6 py-[0.65rem] font-display uppercase tracking-[0.22em] text-orange-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_0_16px_rgba(249,115,22,0.1)] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
                    :disabled="isSpinning" @click="spinRandom">
                    <span class="text-[0.9rem]">⚡</span>
                    {{ isSpinning ? 'Spinning…' : 'Spin Random' }}
                </button>
            </div>

            <!-- Slot progress dots -->
            <div class="flex items-center justify-center gap-2 border-b border-white/[0.03] bg-black/25 px-4 py-2">
                <div v-for="j in boxLimit" :key="j"
                    class="h-2.5 w-2.5 rounded-full border border-white/10 bg-white/[0.06] transition-[background,box-shadow] duration-300"
                    :style="selectedSlots[j - 1]
                        ? { backgroundColor: selectedSlots[j - 1].accent, boxShadow: `0 0 8px ${selectedSlots[j - 1].accent}80` }
                        : {}" />
            </div>

            <!-- Machine body: reels -->
            <div class="flex items-stretch px-2 py-4">
                <div
                    class="hidden sm:flex w-[10px] shrink-0 rounded-sm bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-black/20" />

                <div class="flex flex-1 items-start px-2">
                    <template v-for="(_, i) in slotIndices" :key="i">
                        <div v-if="i > 0"
                            class="w-px shrink-0 self-stretch bg-gradient-to-b from-transparent via-white/10 to-transparent" />

                        <!-- Reel column -->
                        <div class="flex flex-1 flex-col items-center gap-[0.4rem] px-1.5">
                            <button type="button"
                                class="reel-btn flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/[0.08] text-[0.55rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_2px_4px_rgba(0,0,0,0.4)] transition-transform duration-150 active:scale-90 disabled:cursor-not-allowed disabled:opacity-35"
                                :disabled="isSpinning" @click="spinUp(i)" aria-label="Previous sauce">▲</button>

                            <!-- Reel viewport -->
                            <div class="reel-viewport relative w-full overflow-hidden rounded-[14px] border bg-black/[0.82] shadow-[inset_0_2px_16px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(255,255,255,0.03)] transition-[border-color] duration-500"
                                :style="{
                                    height: `${3 * 120}px`,
                                    borderColor: getReelItem(i).accent + '60',
                                    '--reel-glow': getReelItem(i).accent,
                                }">
                                <!-- Scrolling strip -->
                                <div class="absolute left-0 top-0 w-full will-change-transform" :style="{
                                    transform: trackY(reelStripIdx[i]),
                                    transition: reelTransStyle[i],
                                }">
                                    <div v-for="(item, si) in stripItems" :key="si"
                                        class="flex items-center justify-center" style="height: 120px">
                                        <img :src="item.image"
                                            class="h-full w-full object-contain p-1 px-3"
                                            :style="{ filter: `drop-shadow(0 0 10px ${item.accent}80)` }"
                                            alt="" />
                                    </div>
                                </div>

                                <div
                                    class="pointer-events-none absolute inset-x-0 top-0 z-10 h-[120px] bg-gradient-to-b from-black/[0.85] via-black/50 to-transparent" />
                                <div
                                    class="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[120px] bg-gradient-to-t from-black/[0.85] via-black/50 to-transparent" />

                                <!-- Win-line -->
                                <div class="pointer-events-none absolute inset-x-0 z-[11] border-b border-t transition-[border-color,background] duration-500"
                                    :style="{
                                        top: '120px',
                                        height: '120px',
                                        borderTopColor: getReelItem(i).accent + '55',
                                        borderBottomColor: getReelItem(i).accent + '55',
                                        background: getReelItem(i).accent + '0d',
                                    }" />

                                <div
                                    class="pointer-events-none absolute inset-0 z-[15] rounded-[inherit] bg-gradient-to-b from-white/[0.05] via-transparent to-black/[0.15]" />
                                <div
                                    class="pointer-events-none absolute inset-0 z-20 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(0,0,0,0.08)_3px,rgba(0,0,0,0.08)_4px)]" />
                            </div>

                            <button type="button"
                                class="reel-btn flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/[0.08] text-[0.55rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_2px_4px_rgba(0,0,0,0.4)] transition-transform duration-150 active:scale-90 disabled:cursor-not-allowed disabled:opacity-35"
                                :disabled="isSpinning" @click="spinDown(i)" aria-label="Next sauce">▼</button>

                            <!-- Number plate + reel labels -->
                            <div class="flex h-20 flex-col items-center gap-1 w-20 overflow-hidden">
                                <div
                                    class="flex h-[22px] w-[22px] items-center justify-center rounded-full border border-white/[0.08] bg-black/50 font-display text-[0.6rem] tracking-[0.05em] text-white/50">
                                    {{ i + 1 }}
                                </div>
                                <Transition name="label-pop">
                                    <div v-if="!isSpinning" :key="slotIndices[i]"
                                        class="flex flex-col items-center gap-[2px] text-center">
                                        <span class="text-[1rem] uppercase tracking-[0.18em] text-stone-400">
                                            {{ getReelItem(i).heat_label }}
                                        </span>
                                        <span
                                            class="rounded-full px-2 py-[2px] font-display text-[1.1rem] uppercase tracking-wider sm:tracking-[0.2em]"
                                            :style="{
                                                color: getReelItem(i).accent,
                                                background: getReelItem(i).accent + '18',
                                                boxShadow: `0 0 8px ${getReelItem(i).accent}30`,
                                            }">{{ getReelItem(i).taste_label }}</span>
                                    </div>
                                </Transition>
                            </div>
                        </div>
                    </template>
                </div>

                <div
                    class="hidden sm:flex w-[10px] shrink-0 rounded-sm bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-black/20" />
            </div>


        </div>

        <!-- Summary -->
        <div class="mt-6 rounded-[1.8rem] border border-white/10 bg-black/25 p-5">
            <div class="flex items-center justify-between text-sm uppercase tracking-[0.2em] text-stone-400">
                <span>Box total</span>
                <span class="font-display text-4xl tracking-[0.08em] text-stone-50">
                    {{ formatMoney(subtotal) }}
                </span>
            </div>
            <p class="mt-3 text-sm leading-6 text-stone-400">
                {{ deliveryPreview }}.<br>
            </p>
        </div>

        <div class="mt-6 flex flex-col gap-3 sm:flex-row">
            <button type="button" class="fire-button" :disabled="loadingCheckout || !isBoxFull" @click="startCheckout">
                {{ checkoutLabel }}
            </button>
        </div>
    </div>
</template>

<style scoped>
/* ─── Machine shell ──────────────────────────────────────────── */
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

    0%,
    100% {
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

/* ─── Marquee bulbs ──────────────────────────────────────────── */
@keyframes bulb-flicker {
    from {
        opacity: 1;
    }

    to {
        opacity: 0.75;
    }
}

.bulb-on {
    background: #f97316 !important;
    border-color: #fb923c !important;
    box-shadow: 0 0 6px #f97316, 0 0 12px rgba(249, 115, 22, 0.4);
    animation: bulb-flicker 0.8s ease-in-out infinite alternate;
}

/* ─── Reel viewport outer glow ───────────────────────────────── */
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

/* ─── Reel buttons (green pulse) ─────────────────────────────── */
@keyframes reel-btn-pulse {

    0%,
    100% {
        background: linear-gradient(135deg, rgba(34, 197, 94, 0.18), rgba(22, 163, 74, 0.08));
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 0 8px rgba(34, 197, 94, 0.3);
        border-color: rgba(34, 197, 94, 0.35);
    }

    50% {
        background: linear-gradient(135deg, rgba(34, 197, 94, 0.35), rgba(22, 163, 74, 0.18));
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 0 18px rgba(34, 197, 94, 0.6), 0 0 32px rgba(34, 197, 94, 0.2);
        border-color: rgba(34, 197, 94, 0.65);
    }
}

.reel-btn {
    animation: reel-btn-pulse 2s ease-in-out infinite;
    color: #86efac;
}

.reel-btn:disabled {
    animation: none;
}

.reel-btn:hover:not(:disabled) {
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.45), rgba(22, 163, 74, 0.25));
    border-color: rgba(34, 197, 94, 0.8);
    color: #bbf7d0;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 0 24px rgba(34, 197, 94, 0.5);
    animation: none;
}

/* ─── Reel label pop-in ──────────────────────────────────────── */
.label-pop-enter-active {
    transition: opacity 0.3s ease 0.1s, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s;
}

.label-pop-leave-active {
    transition: opacity 0.15s ease;
}

.label-pop-enter-from {
    opacity: 0;
    transform: translateY(4px) scale(0.9);
}

.label-pop-leave-to {
    opacity: 0;
}

/* ─── Spin random button glow pulse + hover ──────────────────── */
@keyframes spin-btn-glow {
    0%, 100% {
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07), 0 0 12px rgba(249, 115, 22, 0.2), 0 0 24px rgba(249, 115, 22, 0.08);
        border-color: rgba(249, 115, 22, 0.35);
    }
    50% {
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07), 0 0 28px rgba(249, 115, 22, 0.55), 0 0 52px rgba(249, 115, 22, 0.2);
        border-color: rgba(249, 115, 22, 0.7);
    }
}
.spin-random-btn:not(:disabled) {
    animation: spin-btn-glow 2.2s ease-in-out infinite;
}
.spin-random-btn:hover:not(:disabled) {
    background: linear-gradient(135deg, rgba(249, 115, 22, 0.3) 0%, rgba(234, 88, 12, 0.16) 100%);
    border-color: rgba(249, 115, 22, 0.8);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07), 0 0 36px rgba(249, 115, 22, 0.65), 0 0 64px rgba(249, 115, 22, 0.25);
    animation: none;
}
</style>
