<script setup>
import { Head } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';

const stats = [
    { name: 'Total Products', value: '71', change: '+2.1%', changeType: 'increase' },
    { name: 'Active Subscriptions', value: '1,289', change: '+12.5%', changeType: 'increase' },
    { name: 'Monthly Revenue', value: '$45,231', change: '+5.4%', changeType: 'increase' },
    { name: 'New Customers', value: '124', change: '-1.2%', changeType: 'decrease' },
];
</script>

<template>
    <Head title="Admin Dashboard" />

    <AdminLayout>
        <template #header>
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight text-stone-100">Dashboard Overview</h1>
                    <p class="mt-2 text-stone-400">Welcome back. Here's what's happening with your projects today.</p>
                </div>
                <div class="flex gap-4">
                    <button class="ghost-button !px-4 !py-2 text-xs">Download Reports</button>
                    <button class="fire-button !px-4 !py-2 text-xs font-bold">New Action</button>
                </div>
            </div>
        </template>

        <div class="space-y-10">
            <!-- Stats Grid -->
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div v-for="stat in stats" :key="stat.name" class="stat-card group hover:border-orange-500/30 transition-colors">
                    <div class="flex items-center justify-between mb-4">
                        <span class="section-label !lowercase">{{ stat.name }}</span>
                        <span :class="[
                            stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500',
                            'text-xs font-medium'
                        ]">
                            {{ stat.change }}
                        </span>
                    </div>
                    <div class="text-3xl font-bold text-stone-100 group-hover:text-orange-400 transition-colors">{{ stat.value }}</div>
                </div>
            </div>

            <!-- Recent Activity Placeholder -->
            <div class="glow-panel p-8">
                <div class="flex items-center justify-between mb-8">
                    <h2 class="text-xl font-bold text-stone-100 tracking-wide">Recent Activity</h2>
                    <button class="text-orange-400 text-sm hover:text-orange-300 transition-colors uppercase tracking-widest font-bold">View All</button>
                </div>
                
                <div class="space-y-6">
                    <div v-for="i in 5" :key="i" class="flex items-center gap-4 py-4 border-b border-white/5 last:border-0 group">
                        <div class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-orange-500/20 transition-colors">
                            <svg class="w-5 h-5 text-stone-400 group-hover:text-orange-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <div class="flex-1">
                            <div class="text-stone-200 font-medium">New product "<span class="text-orange-400">Quantum Core</span>" was added</div>
                            <div class="text-stone-500 text-xs">2 hours ago • by Alex Harrison</div>
                        </div>
                        <button class="text-stone-400 hover:text-stone-100 transition-colors">
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
