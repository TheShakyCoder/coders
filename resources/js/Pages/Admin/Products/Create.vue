<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import ProductForm from './Partials/ProductForm.vue';

defineProps({
    // Add any props from parent if needed
});
</script>

<template>
    <Head title="Create Product" />

    <AdminLayout>
        <template #header>
            <div class="flex items-center gap-4">
                <Link
                    :href="route('admin.products.index')"
                    class="text-stone-400 hover:text-stone-200 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </Link>
                <h2 class="font-bold text-2xl text-stone-100 uppercase tracking-tighter">
                    Add <span class="text-orange-500">New Product</span>
                </h2>
            </div>
        </template>

        <div class="max-w-4xl mx-auto py-8">
            <ProductForm />
        </div>
    </AdminLayout>
</template>
