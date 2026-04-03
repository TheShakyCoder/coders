<script setup>
import Checkbox from '@/Components/Checkbox.vue';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

defineProps({
    canResetPassword: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <GuestLayout>
        <Head title="Log in" />

        <div v-if="status" class="mb-4 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
            {{ status }}
        </div>

        <form @submit.prevent="submit" class="space-y-5">
            <div>
                <InputLabel for="email" value="Email" class="text-stone-400 uppercase tracking-[0.18em] text-xs" />
                <TextInput
                    id="email"
                    type="email"
                    class="mt-2 block w-full rounded-xl border-white/10 bg-white/5 text-stone-100 placeholder-stone-600 focus:border-orange-500/50 focus:ring-orange-500/30"
                    v-model="form.email"
                    required
                    autofocus
                    autocomplete="username"
                />
                <InputError class="mt-2" :message="form.errors.email" />
            </div>

            <div>
                <InputLabel for="password" value="Password" class="text-stone-400 uppercase tracking-[0.18em] text-xs" />
                <TextInput
                    id="password"
                    type="password"
                    class="mt-2 block w-full rounded-xl border-white/10 bg-white/5 text-stone-100 placeholder-stone-600 focus:border-orange-500/50 focus:ring-orange-500/30"
                    v-model="form.password"
                    required
                    autocomplete="current-password"
                />
                <InputError class="mt-2" :message="form.errors.password" />
            </div>

            <div class="flex items-center justify-between">
                <label class="flex items-center gap-2 cursor-pointer">
                    <Checkbox name="remember" v-model:checked="form.remember" />
                    <span class="text-sm text-stone-400">Remember me</span>
                </label>

                <Link
                    v-if="canResetPassword"
                    :href="route('password.request')"
                    class="text-xs uppercase tracking-[0.18em] text-stone-500 hover:text-orange-300 transition-colors"
                >
                    Forgot password?
                </Link>
            </div>

            <button
                type="submit"
                class="fire-button w-full"
                :class="{ 'opacity-50 cursor-not-allowed': form.processing }"
                :disabled="form.processing"
            >
                {{ form.processing ? 'Signing in…' : 'Sign in' }}
            </button>

            <p class="mt-6 text-center text-sm text-stone-500">
                Don't have an account?
                <Link :href="route('register')" class="text-orange-400 hover:text-orange-300 transition-colors">
                    Register
                </Link>
            </p>
        </form>
    </GuestLayout>
</template>
