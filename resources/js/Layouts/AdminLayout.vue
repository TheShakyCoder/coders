<script setup>
import { ref } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';

const showingNavigationDropdown = ref(false);
const page = usePage();

const navigation = [
    { name: 'Dashboard', href: route('admin.dashboard'), icon: 'dashboard', active: route().current('admin.dashboard') },
    { name: 'Products', href: route('admin.products.index'), icon: 'products', active: route().current('admin.products.*') },
];
</script>

<template>
    <div class="min-h-screen site-shell">
        <!-- Mesh Background -->
        <div class="fixed inset-0 mesh-bg opacity-30 pointer-events-none"></div>

        <!-- Sidebar -->
        <aside class="fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300 lg:translate-x-0 border-r border-white/10 bg-white/[0.02] backdrop-blur-xl">
            <div class="flex flex-col h-full">
                <!-- Sidebar Header -->
                <div class="flex items-center h-20 px-6 border-b border-white/10">
                    <Link :href="route('home')" class="flex items-center gap-3">
                        <ApplicationLogo class="w-8 h-8 fill-orange-500" />
                        <span class="text-xl font-bold tracking-wider uppercase text-stone-100">Coders<span class="text-orange-500">.</span></span>
                    </Link>
                </div>

                <!-- Navigation -->
                <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    <template v-for="item in navigation" :key="item.name">
                        <Link
                            :href="item.href"
                            :class="[
                                item.active
                                    ? 'bg-orange-500/10 text-orange-400 border-orange-500/50'
                                    : 'text-stone-400 hover:text-stone-100 hover:bg-white/5 border-transparent',
                                'flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 border rounded-2xl group'
                            ]"
                        >
                            <span v-if="item.icon === 'dashboard'" class="mr-3">
                                <svg class="w-5 h-5 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </span>
                            <span v-if="item.icon === 'products'" class="mr-3">
                                <svg class="w-5 h-5 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </span>
                            {{ item.name }}
                        </Link>
                    </template>
                </nav>

                <!-- Sidebar Footer -->
                <div class="p-4 border-t border-white/10">
                    <div class="relative">
                        <Dropdown align="top" width="48">
                            <template #trigger>
                                <button class="flex items-center w-full gap-3 p-2 text-sm transition-colors rounded-2xl hover:bg-white/5 group">
                                    <div class="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500/20 text-orange-400 font-bold border border-orange-500/30">
                                        {{ $page.props.auth.user.name.charAt(0) }}
                                    </div>
                                    <div class="flex-1 text-left">
                                        <div class="font-medium text-stone-100 truncate">{{ $page.props.auth.user.name }}</div>
                                        <div class="text-xs text-stone-500 truncate">Administrator</div>
                                    </div>
                                    <svg class="w-4 h-4 text-stone-500 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </template>

                            <template #content>
                                <div class="px-4 py-2 text-xs text-stone-500 border-b border-white/10">Manage Account</div>
                                <DropdownLink :href="route('profile.edit')"> Profile </DropdownLink>
                                <DropdownLink :href="route('logout')" method="post" as="button"> Log Out </DropdownLink>
                            </template>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="lg:pl-64 flex flex-col min-h-screen">
            <!-- Topbar (Mobile only or extra tools) -->
            <header class="sticky top-0 z-40 flex items-center justify-between h-20 px-6 lg:px-10 bg-stone-950/50 backdrop-blur-md border-b border-white/10 lg:hidden">
                <Link :href="route('home')" class="flex items-center gap-3">
                    <ApplicationLogo class="w-8 h-8 fill-orange-500" />
                </Link>
                <button @click="showingNavigationDropdown = !showingNavigationDropdown" class="p-2 text-stone-400 hover:text-stone-100">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </header>

            <div class="flex-1 py-10 px-6 lg:px-10 max-w-[1600px] mx-auto w-full">
                <!-- Page Header -->
                <div v-if="$slots.header" class="mb-10">
                    <slot name="header" />
                </div>

                <!-- Page Content -->
                <slot />
            </div>

            <!-- Footer -->
            <footer class="px-6 py-6 lg:px-10 border-t border-white/5 text-stone-500 text-sm text-center lg:text-left">
                &copy; {{ new Date().getFullYear() }} Coders Administration. All rights reserved.
            </footer>
        </main>
    </div>
</template>

<style scoped>
/* Custom scrollbar for sidebar */
nav::-webkit-scrollbar {
    width: 4px;
}
nav::-webkit-scrollbar-track {
    background: transparent;
}
nav::-webkit-scrollbar-thumb {
    @apply bg-white/5 rounded-full;
}
nav:hover::-webkit-scrollbar-thumb {
    @apply bg-white/10;
}
</style>
