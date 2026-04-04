<script setup>
const testimonials = [
    {
        quote: "Chocolate Hot on sausage pizza is serious enough that I stopped sharing the bottle.",
        role: 'Engineering Lead, Bristol',
    },
    {
        quote: "Hot Mango plus Hot Honey is the right two-bottle answer for every Friday deployment.",
        role: 'Product Designer, London',
    },
    {
        quote: "Pizza now has a 4th dimension.",
        role: 'Founder, Leeds',
    },
];
</script>

<template>
    <section id="proof" class="pb-16 px-10 md:px-0">
        <div class="mb-8 px-5 sm:px-0">
            <p class="section-label">Testimonials</p>
            <h2 class="mt-3 font-display text-5xl uppercase tracking-[0.08em] text-stone-50 sm:text-6xl">
                We would love to have.
            </h2>
        </div>

        <div class="grid gap-6 lg:grid-cols-3">
            <article v-for="testimonial in testimonials" :key="testimonial.role"
                class="glow-panel rounded-none sm:rounded-[2rem] p-8">
                <p class="text-lg leading-8 text-stone-200">
                    "{{ testimonial.quote }}"
                </p>
                <p class="mt-6 text-xs uppercase tracking-[0.28em] text-orange-300">
                    {{ testimonial.role }}
                </p>
            </article>
        </div>
    </section>
</template>