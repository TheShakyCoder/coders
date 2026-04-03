<script setup>
import { ref } from 'vue';
import Logo from '@/Components/Logo.vue';
import { Link, usePage } from '@inertiajs/vue3';

const showingNavigationDropdown = ref(false);
const page = usePage();
</script>

<template>
    <div class="site-shell min-h-screen">
        <div class="mesh-bg absolute inset-0 opacity-70" />
        <div class="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.2),transparent_55%)]" />

        <div class="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
            <!-- Nav -->
            <header class="glow-panel rounded-none sm:rounded-[2rem] flex items-center justify-between px-5 py-4 mt-0 sm:mt-6">
                <Link :href="route('dashboard')" class="flex items-center gap-4">
                    <div class="flex h-12 w-12 items-center justify-center rounded-2xl">
                        <Logo />
                    </div>
                    <div>
                        <p class="font-display text-2xl uppercase tracking-[0.16em] text-stone-50">Coder's Hot Sauce</p>
                        <p class="text-xs uppercase tracking-[0.28em] text-stone-400">Dashboard</p>
                    </div>
                </Link>

                <!-- Desktop nav -->
                <nav class="hidden items-center gap-6 text-sm uppercase tracking-[0.22em] text-stone-300 sm:flex">
                    <Link :href="route('dashboard')" class="transition hover:text-orange-300"
                        :class="route().current('dashboard') ? 'text-orange-300' : ''">
                        Overview
                    </Link>
                    <Link v-if="page.props.auth.user?.is_admin" :href="route('admin.dashboard')"
                        class="transition hover:text-orange-300"
                        :class="route().current('admin.*') ? 'text-orange-300' : ''">
                        Admin
                    </Link>
                    <Link :href="route('home')" class="transition hover:text-orange-300">
                        Store
                    </Link>

                    <!-- User dropdown -->
                    <div class="relative">
                        <button @click="showingNavigationDropdown = !showingNavigationDropdown"
                            class="ghost-button flex items-center gap-2 px-4 py-2">
                            {{ page.props.auth.user.name }}
                            <svg class="h-3 w-3 opacity-60" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                        <div v-if="showingNavigationDropdown"
                            class="absolute right-0 mt-2 w-48 rounded-2xl border border-white/10 bg-stone-900/95 py-2 shadow-xl backdrop-blur-sm z-50"
                            @click.away="showingNavigationDropdown = false">
                            <Link :href="route('profile.edit')"
                                class="block px-4 py-2 text-sm text-stone-300 hover:text-orange-300 transition-colors">
                                Profile
                            </Link>
                            <Link :href="route('logout')" method="post" as="button"
                                class="block w-full text-left px-4 py-2 text-sm text-stone-300 hover:text-orange-300 transition-colors">
                                Log Out
                            </Link>
                        </div>
                    </div>
                </nav>

                <!-- Mobile hamburger -->
                <button @click="showingNavigationDropdown = !showingNavigationDropdown"
                    class="sm:hidden p-2 text-stone-400 hover:text-stone-200">
                    <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path v-if="!showingNavigationDropdown" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </header>

            <!-- Mobile menu -->
            <div v-if="showingNavigationDropdown"
                class="sm:hidden mt-2 rounded-2xl border border-white/10 bg-stone-900/95 px-4 py-4 space-y-3 backdrop-blur-sm">
                <p class="text-xs uppercase tracking-[0.22em] text-stone-500 pb-2 border-b border-white/5">
                    {{ page.props.auth.user.name }} · {{ page.props.auth.user.email }}
                </p>
                <Link :href="route('dashboard')" class="block text-sm uppercase tracking-[0.18em] text-stone-300 hover:text-orange-300 transition-colors">Overview</Link>
                <Link v-if="page.props.auth.user?.is_admin" :href="route('admin.dashboard')" class="block text-sm uppercase tracking-[0.18em] text-stone-300 hover:text-orange-300 transition-colors">Admin</Link>
                <Link :href="route('home')" class="block text-sm uppercase tracking-[0.18em] text-stone-300 hover:text-orange-300 transition-colors">Store</Link>
                <Link :href="route('profile.edit')" class="block text-sm uppercase tracking-[0.18em] text-stone-300 hover:text-orange-300 transition-colors">Profile</Link>
                <Link :href="route('logout')" method="post" as="button" class="block text-sm uppercase tracking-[0.18em] text-stone-300 hover:text-orange-300 transition-colors">Log Out</Link>
            </div>

            <!-- Page heading slot -->
            <div v-if="$slots.header" class="mt-8 px-1">
                <slot name="header" />
            </div>

            <!-- Page content -->
            <main class="mt-6">
                <slot />
            </main>
        </div>
    </div>
</template>
