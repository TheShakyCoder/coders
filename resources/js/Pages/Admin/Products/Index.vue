<script setup>
import { Head, Link, router } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import DangerButton from '@/Components/DangerButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';

const props = defineProps({
    products: {
        type: Array,
        required: true,
    },
});

const deleteProduct = (product) => {
    if (confirm(`Are you sure you want to delete ${product.name}?`)) {
        router.delete(route('admin.products.destroy', product.id), {
            preserveState: true,
            preserveScroll: true,
        });
    }
};

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount / 100);
};

const getStatusColor = (product) => {
    if (product.can_sell && product.can_be_built) return 'text-green-400 bg-green-500/10 border-green-500/20';
    if (product.can_sell) return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
    if (product.can_be_built) return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    return 'text-stone-500 bg-white/5 border-white/10';
};
</script>

<template>
    <Head title="Products Management" />

    <AdminLayout>
        <template #header>
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight text-stone-100 uppercase tracking-widest">Product Catalog</h1>
                    <p class="mt-2 text-stone-400">Manage your inventory, pricing and builds</p>
                </div>
                <Link :href="route('admin.products.create')" class="fire-button group">
                    <svg class="w-5 h-5 mr-2 transition-transform group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Product
                </Link>
            </div>
        </template>

        <div class="space-y-8">
            <!-- Search & Filters (Placeholder for now) -->
            <div class="glow-panel rounded-[2rem] p-4 flex flex-wrap items-center gap-4">
                <div class="relative flex-1 min-w-[300px]">
                    <span class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg class="w-5 h-5 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                    <input 
                        type="text" 
                        placeholder="Search products by name or SKU..." 
                        class="w-full bg-black/20 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-stone-200 placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all"
                    />
                </div>
                <div class="flex gap-2">
                    <button class="ghost-button !py-3 !px-5 text-xs font-bold border-white/5 bg-white/[0.02]">Filter</button>
                    <button class="ghost-button !py-3 !px-5 text-xs font-bold border-white/5 bg-white/[0.02]">Sort</button>
                </div>
            </div>

            <!-- Products Table -->
            <div class="glow-panel rounded-[2rem] overflow-hidden border-white/5">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-white/[0.02] border-b border-white/5">
                                <th class="px-6 py-5 text-xs font-bold uppercase tracking-widest text-stone-500">Product</th>
                                <th class="px-6 py-5 text-xs font-bold uppercase tracking-widest text-stone-500">Class & Unit</th>
                                <th class="px-6 py-5 text-xs font-bold uppercase tracking-widest text-stone-500">Price</th>
                                <th class="px-6 py-5 text-xs font-bold uppercase tracking-widest text-stone-500">Capabilities</th>
                                <th class="px-6 py-5 text-xs font-bold uppercase tracking-widest text-stone-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-white/5">
                            <tr v-for="product in products" :key="product.id" class="hover:bg-white/[0.02] transition-colors group">
                                <td class="px-6 py-6">
                                    <div class="flex items-center gap-4">
                                        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-stone-800 to-stone-900 border border-white/10 flex items-center justify-center p-2">
                                            <svg class="w-6 h-6 text-orange-400 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div class="font-bold text-stone-100 group-hover:text-orange-400 transition-colors">{{ product.name }}</div>
                                            <div class="text-xs text-stone-500 max-w-xs truncate">{{ product.description || 'No description provided.' }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-6">
                                    <div class="flex flex-col">
                                        <span class="chip mb-1 !lowercase !py-0 !tracking-normal !px-2 border-orange-500/10 text-orange-200/70">{{ product.class || 'Standard' }}</span>
                                        <span class="text-xs text-stone-400 font-medium ml-1">per {{ product.unit }}</span>
                                    </div>
                                </td>
                                <td class="px-6 py-6">
                                    <div class="text-lg font-bold text-stone-100 tracking-tight" v-if="product.can_sell">
                                        {{ formatCurrency(product.price_amount) }}
                                    </div>
                                    <div class="text-stone-600 text-sm italic" v-else>
                                        Not for sale
                                    </div>
                                </td>
                                <td class="px-6 py-6">
                                    <div class="flex flex-wrap gap-2">
                                        <span v-if="product.can_sell" class="chip !bg-blue-500/5 !border-blue-500/20 !text-blue-400 !px-2 !py-0.5 !text-[10px]">Market</span>
                                        <span v-if="product.can_be_built" class="chip !bg-green-500/5 !border-green-500/20 !text-green-400 !px-2 !py-0.5 !text-[10px]">Craftable</span>
                                        <span v-if="product.can_build_with" class="chip !bg-purple-500/5 !border-purple-500/20 !text-purple-400 !px-2 !py-0.5 !text-[10px]">Resource</span>
                                    </div>
                                </td>
                                <td class="px-6 py-6 text-right">
                                    <div class="flex items-center justify-end gap-3 opacity-40 group-hover:opacity-100 transition-opacity">
                                        <Link 
                                            :href="route('admin.products.edit', product.id)" 
                                            class="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-stone-400 hover:text-orange-400 hover:border-orange-500/20 transition-all shadow-sm"
                                            title="Edit Product"
                                        >
                                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </Link>
                                        <button 
                                            @click="deleteProduct(product)"
                                            class="w-10 h-10 rounded-full border border-white/10 bg-red-500/5 flex items-center justify-center text-stone-400 hover:text-red-400 hover:border-red-500/20 transition-all shadow-sm"
                                            title="Delete Product"
                                        >
                                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="products.length === 0">
                                <td colspan="5" class="px-6 py-20 text-center">
                                    <div class="flex flex-col items-center">
                                        <div class="w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-4 flex items-center justify-center">
                                            <svg class="w-8 h-8 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                        </div>
                                        <h3 class="text-lg font-bold text-stone-100">Zero products found</h3>
                                        <p class="text-stone-500 mt-1 max-w-[200px]">Begin your catalog by adding your first item.</p>
                                        <Link :href="route('admin.products.create')" class="fire-button !px-6 !py-2 text-xs mt-6">Initialize Catalog</Link>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <!-- Pagination Placeholder -->
            <div class="flex items-center justify-between px-2">
                <div class="text-xs text-stone-500 font-medium">Showing <span class="text-stone-200">{{ products.length }}</span> results</div>
                <div class="flex gap-2">
                    <button disabled class="ghost-button !px-3 !py-2 !text-[10px] opacity-30 cursor-not-allowed">Previous</button>
                    <button class="ghost-button !px-3 !py-2 !text-[10px]">Next</button>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
