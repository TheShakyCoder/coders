<script setup>
import Logo from '@/Components/Logo.vue';
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <div class="site-shell min-h-screen flex flex-col items-center justify-center px-4">
        <div class="mesh-bg absolute inset-0 opacity-70" />
        <div class="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.28),transparent_55%)]" />

        <div class="relative w-full max-w-md">
            <!-- Brand header -->
            <Link href="/" class="flex flex-col items-center gap-2 mb-8">
                <Logo />
                <p class="font-display text-2xl uppercase tracking-[0.18em] text-stone-50">
                    Coder's Hot Sauce
                </p>
                <p class="text-xs uppercase tracking-[0.28em] text-stone-400">User Access</p>
            </Link>

            <!-- Card -->
            <div class="rounded-[1.8rem] border border-white/10 bg-black/40 px-8 py-8 shadow-[0_8px_40px_rgba(0,0,0,0.6)] backdrop-blur-sm">
                <slot />
            </div>
        </div>
    </div>
</template>
