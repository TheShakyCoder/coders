<script setup>
defineProps({
    class: String
});
</script>

<template>
    <div class="flex items-center gap-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" class="w-20 h-20 drop-shadow-lg overflow-visible" fill="none">
            <!-- Layered Dynamic Flame -->
            <g class="flame-group">
                <!-- Large outer glow (Centered at x=20) -->
                <path d="M20 21C20 15 23 14 25 14C27 14 29 15 29 21C29 28 23 32 20 35C17 32 17 28 17 21" 
                fill="#ef4444" opacity="0.4" class="flame-layer-1" />
                <!-- Mid orange flame -->
                <path d="M20 23C20 18 22.5 17 24 17C25.5 17 27 18 27 23C27 28 22.5 30 20 32C17.5 30 17.5 28 17.5 23" 
                fill="#f97316" class="flame-layer-2" />
                <!-- Bright white/yellow core -->
                <path d="M20 25C20 21 21.5 21 22.5 21C23.5 21 25 21 25 25C25 28 22.5 29 20 31C17.5 29 17.5 28 17.5 25" 
                fill="#fde047" class="flame-layer-3" />
            </g>
            <!-- Icon Background Square -->
            <!-- <rect width="40" height="40" rx="4" fill="#111" /> -->
            <!-- <rect width="38" height="38" x="1" y="1" rx="3" stroke="#ea580c" stroke-width="2" /> -->
            
            <!-- Monospace 'C' with a prominent fiery flame -->
            <!-- <path d="M28 12V10H10V30H28V28" stroke="#ea580c" stroke-width="4" stroke-linecap="square" /> -->
            <!-- <path d="M18 16L22 20L18 24" stroke="white" stroke-width="3" stroke-linecap="square" /> -->
            
        </svg>
    </div>
</template>

<style scoped>
.flame-group {
    filter: blur(0.5px);
}

.flame-layer-1 {
    animation: flicker-1 0.4s infinite alternate ease-in-out;
    transform-origin: center bottom;
}
.flame-layer-2 {
    animation: flicker-2 0.3s infinite alternate-reverse ease-in-out;
    transform-origin: center bottom;
}
.flame-layer-3 {
    animation: flicker-1 0.2s infinite alternate ease-in-out;
    transform-origin: center bottom;
}

@keyframes flicker-1 {
    0% { transform: scaleY(1) scaleX(1); opacity: 0.6; }
    100% { transform: scaleY(1.15) scaleX(1.1); opacity: 0.9; }
}
@keyframes flicker-2 {
    0% { transform: scaleY(1) scaleX(1); }
    100% { transform: scaleY(1.3) scaleX(0.9) translateX(1px); }
}
</style>
