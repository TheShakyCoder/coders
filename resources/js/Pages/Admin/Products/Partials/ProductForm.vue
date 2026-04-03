<script setup>
import { useForm } from '@inertiajs/vue3';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import TextArea from '@/Components/TextArea.vue';
import Checkbox from '@/Components/Checkbox.vue';

const props = defineProps({
    product: {
        type: Object,
        default: () => ({
            name: '',
            description: '',
            unit: '',
            price_amount: 0,
            can_sell: false,
            can_build_with: false,
            can_be_built: false,
            stripe_product_id: '',
            class: '',
        }),
    },
    isEditing: {
        type: Boolean,
        default: false,
    },
});

const form = useForm({
    name: props.product.name,
    description: props.product.description || '',
    unit: props.product.unit,
    price_amount: props.product.price_amount,
    can_sell: !!props.product.can_sell,
    can_build_with: !!props.product.can_build_with,
    can_be_built: !!props.product.can_be_built,
    stripe_product_id: props.product.stripe_product_id || '',
    class: props.product.class || '',
});

const submit = () => {
    if (props.isEditing) {
        form.put(route('admin.products.update', props.product.id));
    } else {
        form.post(route('admin.products.store'));
    }
};
</script>

<template>
    <form @submit.prevent="submit" class="space-y-6">
        <div class="glow-panel rounded-[2rem] p-6 space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Basic Info -->
                <div class="space-y-4">
                    <h3 class="text-lg font-medium text-stone-200">Basic Information</h3>
                    
                    <div>
                        <InputLabel for="name" value="Product Name" />
                        <TextInput
                            id="name"
                            type="text"
                            class="mt-1 block w-full"
                            v-model="form.name"
                            required
                            autofocus
                        />
                        <InputError class="mt-2" :message="form.errors.name" />
                    </div>

                    <div>
                        <InputLabel for="unit" value="Unit (e.g., kg, unit, liter)" />
                        <TextInput
                            id="unit"
                            type="text"
                            class="mt-1 block w-full"
                            v-model="form.unit"
                            required
                        />
                        <InputError class="mt-2" :message="form.errors.unit" />
                    </div>

                    <div>
                        <InputLabel for="class" value="Class / Category" />
                        <TextInput
                            id="class"
                            type="text"
                            class="mt-1 block w-full"
                            v-model="form.class"
                        />
                        <InputError class="mt-2" :message="form.errors.class" />
                    </div>
                </div>

                <!-- Capabilities & Pricing -->
                <div class="space-y-4">
                    <h3 class="text-lg font-medium text-stone-200">Pricing & Capabilities</h3>
                    
                    <div>
                        <InputLabel for="price_amount" value="Price Amount (in cents)" />
                        <TextInput
                            id="price_amount"
                            type="number"
                            class="mt-1 block w-full"
                            v-model="form.price_amount"
                            required
                        />
                        <InputError class="mt-2" :message="form.errors.price_amount" />
                    </div>

                    <div class="space-y-3 pt-2">
                        <label class="flex items-center cursor-pointer group">
                            <Checkbox name="can_sell" v-model:checked="form.can_sell" />
                            <span class="ms-2 text-sm text-stone-400 group-hover:text-stone-200 transition-colors">Available on Market</span>
                        </label>

                        <label class="flex items-center cursor-pointer group">
                            <Checkbox name="can_build_with" v-model:checked="form.can_build_with" />
                            <span class="ms-2 text-sm text-stone-400 group-hover:text-stone-200 transition-colors">Can be used as a resource</span>
                        </label>

                        <label class="flex items-center cursor-pointer group">
                            <Checkbox name="can_be_built" v-model:checked="form.can_be_built" />
                            <span class="ms-2 text-sm text-stone-400 group-hover:text-stone-200 transition-colors">Can be crafted/built</span>
                        </label>
                    </div>

                    <div class="mt-4">
                        <InputLabel for="stripe_product_id" value="Stripe Product ID" />
                        <TextInput
                            id="stripe_product_id"
                            type="text"
                            class="mt-1 block w-full"
                            v-model="form.stripe_product_id"
                        />
                        <InputError class="mt-2" :message="form.errors.stripe_product_id" />
                    </div>
                </div>
            </div>

            <div class="pt-4 border-t border-stone-800">
                <InputLabel for="description" value="Description" />
                <TextArea
                    id="description"
                    class="mt-1 block w-full h-32"
                    v-model="form.description"
                />
                <InputError class="mt-2" :message="form.errors.description" />
            </div>

            <div class="flex items-center justify-end gap-4">
                <Link
                    :href="route('admin.products.index')"
                    class="ghost-button"
                >
                    Cancel
                </Link>
                <button
                    type="submit"
                    class="fire-button px-8 py-2"
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                >
                    {{ isEditing ? 'Update Product' : 'Create Product' }}
                </button>
            </div>
        </div>
    </form>
</template>
