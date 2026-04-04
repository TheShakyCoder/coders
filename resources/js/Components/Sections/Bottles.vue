<script setup>
import { numberToWord } from '@/Composables/formatting';

defineProps({
    products: Array,
    counts: Object,
    heatScale: Function,
});
</script>

<template>
    <section id="bottles" class="pb-12">
        <div class="mb-8 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between px-5 md:px-0">
            <div>
                <p class="section-label">Choose from</p>
                <h2 class="mt-3 font-display text-4xl sm:text-5xl uppercase tracking-[0.08em] text-stone-50 ">
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
                        <span v-if="counts[product.slug] > 0" class="chip border-white/10 bg-white/5 text-stone-300">
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
                        <span class="font-display text-2xl tracking-[0.16em]" :style="{ color: product.accent }">
                            {{ heatScale(product.heat_level) }}
                        </span>
                    </div>
                </div>
            </article>
        </div>
    </section>
</template>