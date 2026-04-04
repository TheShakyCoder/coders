<script setup>
import { Link } from '@inertiajs/vue3';
import { numberToWord } from '@/Composables/formatting';
import SlotMachine from '@/Components/Sections/SlotMachine.vue';

const props = defineProps({
    products: {
        type: Array,
        required: true,
    },
    boxLimit: {
        type: Number,
        required: true,
    },
    checkoutLabel: {
        type: String,
        required: true,
    },
    loadingCheckout: {
        type: Boolean,
        required: true,
    },
    checkoutError: {
        type: String,
        default: '',
    },
    credibility: {
        type: Array,
        required: true,
    },
});

const emit = defineEmits(['start-checkout']);

const startCheckout = () => {
    emit('start-checkout');
};
</script>

<template>
    <section class="pb-10 pt-4 lg:pt-6">
        <div class="grid items-start gap-10 lg:grid-cols-2">
            <!-- Left: hero copy + credibility -->
            <div class="space-y-8">
                <div class="flex flex-col gap-4 px-5 lg:px-0">
                    <div class="w-full">
                        <p class="section-label">Boxed heat, no filler</p>
                        <h1
                            class="font-display text-5xl uppercase leading-[0.88] tracking-[0.06em] text-stone-50 sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl">
                            {{ numberToWord(products.length) }} sauces.<br>Three slots.<br>One great box.
                        </h1>
                    </div>

                    <div>
                        <p class="max-w-2xl text-lg leading-8 text-stone-300">
                            Build a box from {{ numberToWord(products.length) }} 125ml bottles including
                            <strong class="text-stone-100"> Coder's Hot Mango</strong>,
                            <strong class="text-stone-100"> Coder's Hot Honey</strong>,
                            and <strong class="text-stone-100">Coder's Hot Chocolate</strong>.
                            Delivered anywhere in the UK for a flat fee of £19.99.
                        </p>
                        <Link href="#builder" class="fire-button px-4 py-2 mt-4">
                        Buy a box
                        </Link>
                    </div>
                </div>

                <p v-if="checkoutError"
                    class="rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                    {{ checkoutError }}
                </p>

                <div class="grid gap-4 sm:grid-cols-3">
                    <article v-for="item in credibility" :key="item.title" class="stat-card">
                        <p class="text-xs uppercase tracking-[0.28em] text-orange-300">
                            {{ item.title }}
                        </p>
                        <p class="mt-3 text-sm leading-7 text-stone-300">
                            {{ item.copy }}
                        </p>
                    </article>
                </div>
            </div>

            <!-- Right: slot machine -->
            <SlotMachine :products="products" :box-limit="boxLimit" :checkout-label="checkoutLabel"
                :loading-checkout="loadingCheckout" @start-checkout="startCheckout" />
        </div>
    </section>
</template>