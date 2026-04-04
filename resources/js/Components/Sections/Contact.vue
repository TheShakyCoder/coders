<script setup>

</script>

<template>
    <section id="contact" class="pb-16">
        <div class="glow-panel rounded-none sm:rounded-[2rem] p-8 sm:p-10">
            <p class="section-label">Get in touch</p>
            <h2 class="mt-4 font-display text-5xl uppercase tracking-[0.08em] text-stone-50">
                Contact Us.
            </h2>

            <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <!-- Email -->
                <a href="mailto:support@fig.limited"
                    class="stat-card group flex items-start gap-4 hover:border-orange-500/30 transition-colors">
                    <div
                        class="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-orange-500/10 text-orange-300">
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                    </div>
                    <div>
                        <p class="text-xs uppercase tracking-[0.28em] text-orange-300">Email</p>
                        <p class="mt-2 text-sm text-stone-200 group-hover:text-orange-300 transition-colors break-all">
                            support@fig.limited
                        </p>
                    </div>
                </a>

                <!-- Phone & WhatsApp -->
                <a href="https://wa.me/447515382159"
                    class="stat-card group flex items-start gap-4 hover:border-orange-500/30 transition-colors">
                    <div
                        class="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-orange-500/10 text-orange-300">
                        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                            <path
                                d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.532 5.845L.057 23.885l6.212-1.448A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.013-1.378l-.36-.213-3.686.859.875-3.593-.235-.369A9.797 9.797 0 012.182 12c0-5.42 4.398-9.818 9.818-9.818 5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z" />
                        </svg>
                    </div>
                    <div>
                        <p class="text-xs uppercase tracking-[0.28em] text-orange-300">Mobile & WhatsApp</p>
                        <p class="mt-2 text-sm text-stone-200 group-hover:text-orange-300 transition-colors">
                            07515 382159
                        </p>
                    </div>
                </a>

                <!-- Facebook -->
                <a href="https://www.facebook.com/coders.hot.sauce" target="_blank" rel="noopener"
                    class="stat-card group flex items-start gap-4 hover:border-orange-500/30 transition-colors">
                    <div
                        class="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-orange-500/10 text-orange-300">
                        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                    </div>
                    <div>
                        <p class="text-xs uppercase tracking-[0.28em] text-orange-300">Facebook</p>
                        <p class="mt-2 text-sm text-stone-200 group-hover:text-orange-300 transition-colors">
                            Coder's Hot Sauce
                        </p>
                    </div>
                </a>
            </div>
        </div>
    </section>
</template>