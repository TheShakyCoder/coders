import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-jrA-gPFe.js";
import { t as Logo_default } from "./Logo-CXM_9hti.js";
import { n as formatMoney, r as numberToWord } from "./formatting-DuoLLN1c.js";
import { Head, Link } from "@inertiajs/vue3";
import { computed, createTextVNode, mergeProps, nextTick, onMounted, ref, unref, useSSRContext, watch, withCtx } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import axios from "axios";
//#region resources/js/Components/Sections/Bottles.vue
var _sfc_main$6 = {
	__name: "Bottles",
	__ssrInlineRender: true,
	props: {
		products: Array,
		counts: Object,
		heatScale: Function
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: "bottles",
				class: "pb-12"
			}, _attrs))}><div class="mb-8 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between px-5 md:px-0"><div><p class="section-label">Choose from</p><h2 class="mt-3 font-display text-4xl sm:text-5xl uppercase tracking-[0.08em] text-stone-50">${ssrInterpolate(unref(numberToWord)(__props.products.length))} 125ml bottles.<br>Buy One £19.99 Box. </h2></div><p class="max-w-xl text-base leading-7 text-stone-400"> Build a safe office box, a sweet-and-hot split, or a heavier late-night mix with Chocolate in the rotation. </p></div><div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4"><!--[-->`);
			ssrRenderList(__props.products, (product) => {
				_push(`<article class="product-card" style="${ssrRenderStyle({
					"--card-accent": product.accent,
					"--card-glow": product.glow
				})}"><div class="relative z-10 flex h-full flex-col"><div class="flex items-start justify-between gap-4"><p class="section-label">${ssrInterpolate(product.size_label)}</p>`);
				if (__props.counts[product.slug] > 0) _push(`<span class="chip border-white/10 bg-white/5 text-stone-300"> ×${ssrInterpolate(__props.counts[product.slug])} in box </span>`);
				else _push(`<span class="chip border-white/10 bg-white/5 text-stone-300"> Box Item </span>`);
				_push(`</div><div class="mt-8 rounded-[1.8rem] border border-white/10 bg-black/25 p-5"><p class="text-xs uppercase tracking-[0.32em] text-stone-500">Bottle</p><h3 class="mt-3 font-display text-4xl uppercase tracking-[0.08em] text-stone-50">${ssrInterpolate(product.name)}</h3><p class="mt-3 text-sm leading-7 text-stone-300">${ssrInterpolate(product.tagline)}</p></div><p class="mt-6 flex-1 text-sm leading-7 text-stone-400">${ssrInterpolate(product.description)}</p><div class="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-stone-500"><span>Heat</span><span class="font-display text-2xl tracking-[0.16em]" style="${ssrRenderStyle({ color: product.accent })}">${ssrInterpolate(__props.heatScale(product.heat_level))}</span></div></div></article>`);
			});
			_push(`<!--]--></div></section>`);
		};
	}
};
var _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Sections/Bottles.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/Sections/Contact.vue
var _sfc_main$5 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
	_push(`<section${ssrRenderAttrs(mergeProps({
		id: "contact",
		class: "pb-16"
	}, _attrs))}><div class="glow-panel rounded-none sm:rounded-[2rem] p-8 sm:p-10"><p class="section-label">Get in touch</p><h2 class="mt-4 font-display text-5xl uppercase tracking-[0.08em] text-stone-50"> Contact Us. </h2><div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><a href="mailto:support@fig.limited" class="stat-card group flex items-start gap-4 hover:border-orange-500/30 transition-colors"><div class="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-orange-500/10 text-orange-300"><svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"></path></svg></div><div><p class="text-xs uppercase tracking-[0.28em] text-orange-300">Email</p><p class="mt-2 text-sm text-stone-200 group-hover:text-orange-300 transition-colors break-all"> support@fig.limited </p></div></a><a href="https://wa.me/447515382159" class="stat-card group flex items-start gap-4 hover:border-orange-500/30 transition-colors"><div class="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-orange-500/10 text-orange-300"><svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"></path><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.532 5.845L.057 23.885l6.212-1.448A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.013-1.378l-.36-.213-3.686.859.875-3.593-.235-.369A9.797 9.797 0 012.182 12c0-5.42 4.398-9.818 9.818-9.818 5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z"></path></svg></div><div><p class="text-xs uppercase tracking-[0.28em] text-orange-300">Mobile &amp; WhatsApp</p><p class="mt-2 text-sm text-stone-200 group-hover:text-orange-300 transition-colors"> 07515 382159 </p></div></a><a href="https://www.facebook.com/coders.hot.sauce" target="_blank" rel="noopener" class="stat-card group flex items-start gap-4 hover:border-orange-500/30 transition-colors"><div class="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-orange-500/10 text-orange-300"><svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg></div><div><p class="text-xs uppercase tracking-[0.28em] text-orange-300">Facebook</p><p class="mt-2 text-sm text-stone-200 group-hover:text-orange-300 transition-colors"> Coder&#39;s Hot Sauce </p></div></a></div></div></section>`);
}
var _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Sections/Contact.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var Contact_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main$5, [["ssrRender", _sfc_ssrRender$1]]);
//#endregion
//#region resources/js/Components/Sections/FinalCta.vue
var _sfc_main$4 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	_push(`<section${ssrRenderAttrs(mergeProps({ class: "glow-panel rounded-none sm:rounded-[2rem] flex flex-col gap-6 px-6 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between" }, _attrs))}><div><p class="section-label">Final CTA</p><h2 class="mt-3 font-display text-4xl uppercase tracking-[0.08em] text-stone-50"> Fill the box before the next pizza lands. </h2></div><div class="flex flex-col gap-3 sm:flex-row"><a href="#builder" class="ghost-button text-center">Open the builder</a></div></section>`);
}
var _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Sections/FinalCta.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var FinalCta_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main$4, [["ssrRender", _sfc_ssrRender]]);
//#endregion
//#region resources/js/Components/Sections/Testimonials.vue
var _sfc_main$3 = {
	__name: "Testimonials",
	__ssrInlineRender: true,
	setup(__props) {
		const testimonials = [
			{
				quote: "Chocolate Hot on sausage pizza is serious enough that I stopped sharing the bottle.",
				role: "Engineering Lead, Bristol"
			},
			{
				quote: "Hot Mango plus Hot Honey is the right two-bottle answer for every Friday deployment.",
				role: "Product Designer, London"
			},
			{
				quote: "Pizza now has a 4th dimension.",
				role: "Founder, Leeds"
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: "proof",
				class: "pb-16 px-10 md:px-0"
			}, _attrs))}><div class="mb-8 px-5 sm:px-0"><p class="section-label">Testimonials</p><h2 class="mt-3 font-display text-5xl uppercase tracking-[0.08em] text-stone-50 sm:text-6xl"> We would love to have. </h2></div><div class="grid gap-6 lg:grid-cols-3"><!--[-->`);
			ssrRenderList(testimonials, (testimonial) => {
				_push(`<article class="glow-panel rounded-none sm:rounded-[2rem] p-8"><p class="text-lg leading-8 text-stone-200"> &quot;${ssrInterpolate(testimonial.quote)}&quot; </p><p class="mt-6 text-xs uppercase tracking-[0.28em] text-orange-300">${ssrInterpolate(testimonial.role)}</p></article>`);
			});
			_push(`<!--]--></div></section>`);
		};
	}
};
var _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Sections/Testimonials.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/Sections/SlotMachine.vue
var CELL_H = 120;
var STRIP_REPS = 14;
var _sfc_main$2 = {
	__name: "SlotMachine",
	__ssrInlineRender: true,
	props: {
		products: {
			type: Array,
			default: () => []
		},
		boxLimit: {
			type: Number,
			default: 3
		},
		checkoutLabel: {
			type: String,
			default: "Checkout"
		},
		loadingCheckout: {
			type: Boolean,
			default: false
		}
	},
	emits: ["change", "start-checkout"],
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const reelItems = computed(() => props.products);
		const stripItems = computed(() => {
			const out = [];
			for (let r = 0; r < STRIP_REPS; r++) out.push(...reelItems.value);
			return out;
		});
		const midStart = () => Math.floor(STRIP_REPS / 2) * reelItems.value.length;
		const reelStripIdx = ref([
			midStart(),
			midStart(),
			midStart()
		]);
		const reelTransStyle = ref([
			"none",
			"none",
			"none"
		]);
		const isSpinning = ref(false);
		const jackpot = ref(false);
		const trackY = (si) => `translateY(${(1 - si) * CELL_H}px)`;
		const slotIndices = computed(() => reelStripIdx.value.map((si) => {
			const len = reelItems.value.length;
			return (si % len + len) % len;
		}));
		const getReelItem = (reelI, offset = 0) => {
			const len = reelItems.value.length;
			const idx = ((slotIndices.value[reelI] + offset) % len + len) % len;
			return reelItems.value[idx];
		};
		const spinReelToTarget = async (i, targetItemIdx) => {
			const len = reelItems.value.length;
			const current = reelStripIdx.value[i];
			const fastSpins = 14 + Math.floor(Math.random() * 8);
			reelTransStyle.value[i] = `transform ${fastSpins * 55}ms linear`;
			reelStripIdx.value[i] = current + fastSpins;
			await new Promise((r) => setTimeout(r, fastSpins * 55 + 20));
			const mid = reelStripIdx.value[i];
			const extra = (targetItemIdx - (mid % len + len) % len + len) % len;
			const targetStripIdx = mid + (extra === 0 ? len : extra);
			reelTransStyle.value[i] = "transform 580ms cubic-bezier(0.17, 0.67, 0.12, 1.0)";
			reelStripIdx.value[i] = targetStripIdx;
			await new Promise((r) => setTimeout(r, 640));
			const finalItem = (targetStripIdx % len + len) % len;
			reelTransStyle.value[i] = "none";
			await nextTick();
			reelStripIdx.value[i] = midStart() + finalItem;
		};
		const spinRandom = async () => {
			if (isSpinning.value) return;
			isSpinning.value = true;
			const productCount = props.products.length;
			const targets = Array.from({ length: props.boxLimit }, () => Math.floor(Math.random() * productCount));
			await Promise.all(targets.map((target, i) => new Promise((resolve) => setTimeout(() => spinReelToTarget(i, target).then(resolve), i * 200))));
			isSpinning.value = false;
		};
		const reset = () => {
			if (isSpinning.value) return;
			const base = midStart();
			reelTransStyle.value = [
				"none",
				"none",
				"none"
			];
			reelStripIdx.value = [
				base,
				base,
				base
			];
		};
		__expose({
			reset,
			spinRandom
		});
		onMounted(() => {
			setTimeout(spinRandom, 400);
		});
		const selectedSlots = computed(() => slotIndices.value.map((i) => reelItems.value[i]));
		const totalBottles = computed(() => selectedSlots.value.filter(Boolean).length);
		const isBoxFull = computed(() => totalBottles.value === props.boxLimit);
		watch(isBoxFull, (full) => {
			if (full) {
				jackpot.value = true;
				setTimeout(() => {
					jackpot.value = false;
				}, 2600);
			}
		});
		const counts = computed(() => props.products.reduce((acc, p) => {
			acc[p.slug] = selectedSlots.value.filter((s) => s?.slug === p.slug).length;
			return acc;
		}, {}));
		const selectedItemsPayload = computed(() => props.products.filter((p) => (counts.value[p.slug] ?? 0) > 0).map((p) => ({
			product: p.slug,
			quantity: counts.value[p.slug]
		})));
		watch([selectedSlots, isSpinning], () => {
			emit("change", {
				selectedSlots: selectedSlots.value,
				counts: counts.value,
				totalBottles: totalBottles.value,
				isBoxFull: isBoxFull.value,
				isSpinning: isSpinning.value,
				selectedItemsPayload: selectedItemsPayload.value
			});
		}, { immediate: true });
		const subtotal = computed(() => {
			if (totalBottles.value === props.boxLimit) return 1999;
			return props.products.reduce((sum, p) => sum + (counts.value[p.slug] ?? 0) * Number(p.unit_amount ?? 0), 0);
		});
		const deliveryPreview = computed(() => totalBottles.value === props.boxLimit ? "UK delivery included in the price" : "Build a full box to unlock");
		const hasOutOfStock = computed(() => selectedSlots.value.some((s) => s && s.in_stock === false));
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				id: "builder",
				class: "hero-panel"
			}, _attrs))} data-v-d117d5fb><div class="flex items-start justify-between gap-4" data-v-d117d5fb><div data-v-d117d5fb><h2 class="mb-4 font-display text-5xl uppercase tracking-[0.08em] text-stone-50 flex flex-col" data-v-d117d5fb><span class="text-2xl" data-v-d117d5fb>Coder&#39;s</span><span data-v-d117d5fb>Slot Machine</span></h2></div></div><div class="${ssrRenderClass([{ "jackpot-active": jackpot.value }, "machine-shell"])}" data-v-d117d5fb><div class="flex items-center justify-between gap-2 border-b border-white/[0.04] bg-gradient-to-b from-black/50 to-black/20 px-4 py-3" data-v-d117d5fb><div class="flex gap-[5px]" data-v-d117d5fb><!--[-->`);
			ssrRenderList(8, (j) => {
				_push(`<div class="${ssrRenderClass([{ "bulb-on": isBoxFull.value || isSpinning.value && j % 2 === 0 }, "h-2 w-2 rounded-full border border-white/[0.08] bg-stone-900 transition-[background,box-shadow] duration-200"])}" style="${ssrRenderStyle({ animationDelay: `${j * 80}ms` })}" data-v-d117d5fb></div>`);
			});
			_push(`<!--]--></div><p class="${ssrRenderClass([jackpot.value ? "text-orange-300" : "text-stone-300/40", "font-display whitespace-nowrap text-[0.6rem] uppercase tracking-[0.28em] transition-colors duration-300"])}" data-v-d117d5fb>${ssrInterpolate(isBoxFull.value ? "★ JACKPOT ★" : "— CODERS HOT SAUCE —")}</p><div class="flex gap-[5px]" data-v-d117d5fb><!--[-->`);
			ssrRenderList(8, (j) => {
				_push(`<div class="${ssrRenderClass([{ "bulb-on": isBoxFull.value || isSpinning.value && j % 2 !== 0 }, "h-2 w-2 rounded-full border border-white/[0.08] bg-stone-900 transition-[background,box-shadow] duration-200"])}" style="${ssrRenderStyle({ animationDelay: `${j * 80}ms` })}" data-v-d117d5fb></div>`);
			});
			_push(`<!--]--></div></div><div class="flex items-center justify-center border-t border-white/[0.04] bg-gradient-to-b from-black/20 to-black/50 px-4 py-3" data-v-d117d5fb><button type="button" class="spin-random-btn h-12 text-xl flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-orange-500/35 bg-gradient-to-br from-orange-500/[0.18] to-red-600/[0.08] px-6 py-[0.65rem] font-display uppercase tracking-[0.22em] text-orange-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_0_16px_rgba(249,115,22,0.1)] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"${ssrIncludeBooleanAttr(isSpinning.value) ? " disabled" : ""} data-v-d117d5fb><span class="text-[0.9rem]" data-v-d117d5fb>⚡</span> ${ssrInterpolate(isSpinning.value ? "Spinning…" : "Spin Random")}</button></div><div class="flex items-center justify-center gap-2 border-b border-white/[0.03] bg-black/25 px-4 py-2" data-v-d117d5fb><!--[-->`);
			ssrRenderList(__props.boxLimit, (j) => {
				_push(`<div class="h-2.5 w-2.5 rounded-full border border-white/10 bg-white/[0.06] transition-[background,box-shadow] duration-300" style="${ssrRenderStyle(selectedSlots.value[j - 1] ? {
					backgroundColor: selectedSlots.value[j - 1].accent,
					boxShadow: `0 0 8px ${selectedSlots.value[j - 1].accent}80`
				} : {})}" data-v-d117d5fb></div>`);
			});
			_push(`<!--]--></div><div class="flex items-stretch px-2 py-4" data-v-d117d5fb><div class="hidden sm:flex w-[10px] shrink-0 rounded-sm bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-black/20" data-v-d117d5fb></div><div class="flex flex-1 items-start px-2" data-v-d117d5fb><!--[-->`);
			ssrRenderList(slotIndices.value, (_, i) => {
				_push(`<!--[-->`);
				if (i > 0) _push(`<div class="w-px shrink-0 self-stretch bg-gradient-to-b from-transparent via-white/10 to-transparent" data-v-d117d5fb></div>`);
				else _push(`<!---->`);
				_push(`<div class="flex flex-1 flex-col items-center gap-[0.4rem] px-1.5" data-v-d117d5fb><button type="button" class="reel-btn flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/[0.08] text-[0.55rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_2px_4px_rgba(0,0,0,0.4)] transition-transform duration-150 active:scale-90 disabled:cursor-not-allowed disabled:opacity-35"${ssrIncludeBooleanAttr(isSpinning.value) ? " disabled" : ""} aria-label="Previous sauce" data-v-d117d5fb> ▲ </button><div class="reel-viewport relative w-full overflow-hidden rounded-[14px] border bg-black/[0.82] shadow-[inset_0_2px_16px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(255,255,255,0.03)] transition-[border-color] duration-500" style="${ssrRenderStyle(getReelItem(i).in_stock === false ? {
					height: `360px`,
					borderColor: "rgba(239,68,68,0.3)",
					"--reel-glow": "rgba(239,68,68,0.5)"
				} : {
					height: `360px`,
					borderColor: getReelItem(i).accent + "60",
					"--reel-glow": getReelItem(i).accent
				})}" data-v-d117d5fb><div class="absolute left-0 top-0 w-full will-change-transform" style="${ssrRenderStyle({
					transform: trackY(reelStripIdx.value[i]),
					transition: reelTransStyle.value[i]
				})}" data-v-d117d5fb><!--[-->`);
				ssrRenderList(stripItems.value, (item, si) => {
					_push(`<div class="flex items-center justify-center" style="${ssrRenderStyle({ "height": "120px" })}" data-v-d117d5fb><img${ssrRenderAttr("src", item.image)} class="h-full w-full object-contain p-1 px-3 transition-[filter] duration-300" style="${ssrRenderStyle(item.in_stock === false ? { filter: "grayscale(1) opacity(0.4)" } : { filter: `drop-shadow(0 0 10px ${item.accent}80)` })}" alt="" data-v-d117d5fb></div>`);
				});
				_push(`<!--]--></div><div class="pointer-events-none absolute inset-x-0 top-0 z-10 h-[120px] bg-gradient-to-b from-black/[0.85] via-black/50 to-transparent" data-v-d117d5fb></div><div class="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[120px] bg-gradient-to-t from-black/[0.85] via-black/50 to-transparent" data-v-d117d5fb></div><div class="pointer-events-none absolute inset-x-0 z-[11] border-b border-t transition-[border-color,background] duration-500" style="${ssrRenderStyle({
					top: "120px",
					height: "120px",
					borderTopColor: getReelItem(i).in_stock === false ? "rgba(239,68,68,0.4)" : getReelItem(i).accent + "55",
					borderBottomColor: getReelItem(i).in_stock === false ? "rgba(239,68,68,0.4)" : getReelItem(i).accent + "55",
					background: getReelItem(i).in_stock === false ? "rgba(239,68,68,0.08)" : getReelItem(i).accent + "0d"
				})}" data-v-d117d5fb></div>`);
				if (!isSpinning.value && getReelItem(i).in_stock === false) _push(`<div class="pointer-events-none absolute inset-x-0 z-[12] flex items-center justify-center" style="${ssrRenderStyle({
					"top": "120px",
					"height": "120px"
				})}" data-v-d117d5fb><span class="rounded-full border border-red-500/40 bg-black/70 px-2 py-0.5 font-display text-[0.55rem] uppercase tracking-[0.2em] text-red-400 backdrop-blur-sm" data-v-d117d5fb> Out of Stock </span></div>`);
				else _push(`<!---->`);
				_push(`<div class="pointer-events-none absolute inset-0 z-[15] rounded-[inherit] bg-gradient-to-b from-white/[0.05] via-transparent to-black/[0.15]" data-v-d117d5fb></div><div class="pointer-events-none absolute inset-0 z-20 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(0,0,0,0.08)_3px,rgba(0,0,0,0.08)_4px)]" data-v-d117d5fb></div></div><button type="button" class="reel-btn flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/[0.08] text-[0.55rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_2px_4px_rgba(0,0,0,0.4)] transition-transform duration-150 active:scale-90 disabled:cursor-not-allowed disabled:opacity-35"${ssrIncludeBooleanAttr(isSpinning.value) ? " disabled" : ""} aria-label="Next sauce" data-v-d117d5fb> ▼ </button><div class="flex h-20 flex-col items-center gap-1 w-24 overflow-hidden" data-v-d117d5fb><div class="flex h-[22px] w-[22px] items-center justify-center rounded-full border border-white/[0.08] bg-black/50 font-display text-[0.6rem] tracking-[0.05em] text-white/50" data-v-d117d5fb>${ssrInterpolate(i + 1)}</div>`);
				if (!isSpinning.value) _push(`<div class="flex flex-col items-center gap-[2px] text-center" data-v-d117d5fb><span class="text-[1rem] uppercase tracking-[0.18em] text-stone-400" data-v-d117d5fb>${ssrInterpolate(getReelItem(i).heat_label)}</span><span class="rounded-full px-2 py-[2px] font-display text-[1.1rem] uppercase tracking-wider sm:tracking-[0.2em]" style="${ssrRenderStyle({
					color: getReelItem(i).accent,
					background: getReelItem(i).accent + "18",
					boxShadow: `0 0 8px ${getReelItem(i).accent}30`
				})}" data-v-d117d5fb>${ssrInterpolate(getReelItem(i).taste_label)}</span></div>`);
				else _push(`<!---->`);
				_push(`</div></div><!--]-->`);
			});
			_push(`<!--]--></div><div class="hidden sm:flex w-[10px] shrink-0 rounded-sm bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-black/20" data-v-d117d5fb></div></div></div><div class="mt-6 rounded-[1.8rem] border border-white/10 bg-black/25 p-5" data-v-d117d5fb><div class="flex items-center justify-between text-sm uppercase tracking-[0.2em] text-stone-400" data-v-d117d5fb><span data-v-d117d5fb>Box total</span><span class="font-display text-4xl tracking-[0.08em] text-stone-50" data-v-d117d5fb>${ssrInterpolate(unref(formatMoney)(subtotal.value))}</span></div><p class="mt-3 text-sm leading-6 text-stone-400" data-v-d117d5fb>${ssrInterpolate(deliveryPreview.value)}.<br data-v-d117d5fb></p></div>`);
			if (hasOutOfStock.value) _push(`<div class="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300" data-v-d117d5fb> One or more selected sauces are out of stock. Spin to swap them out. </div>`);
			else _push(`<!---->`);
			_push(`<div class="mt-6 flex flex-col gap-3 sm:flex-row" data-v-d117d5fb><button type="button" class="fire-button"${ssrIncludeBooleanAttr(__props.loadingCheckout || !isBoxFull.value || hasOutOfStock.value) ? " disabled" : ""} data-v-d117d5fb>${ssrInterpolate(__props.checkoutLabel)}</button></div></div>`);
		};
	}
};
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Sections/SlotMachine.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var SlotMachine_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main$2, [["__scopeId", "data-v-d117d5fb"]]);
//#endregion
//#region resources/js/Components/Sections/Hero.vue
var _sfc_main$1 = {
	__name: "Hero",
	__ssrInlineRender: true,
	props: {
		products: {
			type: Array,
			required: true
		},
		boxLimit: {
			type: Number,
			required: true
		},
		checkoutLabel: {
			type: String,
			required: true
		},
		loadingCheckout: {
			type: Boolean,
			required: true
		},
		checkoutError: {
			type: String,
			default: ""
		},
		credibility: {
			type: Array,
			required: true
		}
	},
	emits: ["start-checkout", "change"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const startCheckout = () => {
			emit("start-checkout");
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({ class: "pb-10 pt-4 lg:pt-6" }, _attrs))}><div class="grid items-start gap-10 lg:grid-cols-2"><div class="space-y-8"><div class="flex flex-col gap-4 px-5 lg:px-0"><div class="w-full"><p class="section-label">Boxed heat, no filler</p><h1 class="font-display text-5xl uppercase leading-[0.88] tracking-[0.06em] text-stone-50 sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl">${ssrInterpolate(unref(numberToWord)(__props.products.length))} sauces.<br>Three slots.<br>One great box. </h1></div><div><p class="max-w-2xl text-lg leading-8 text-stone-300"> Build a box from ${ssrInterpolate(unref(numberToWord)(__props.products.length))} 125ml bottles including <strong class="text-stone-100"> Coder&#39;s Hot Mango</strong>, <strong class="text-stone-100"> Coder&#39;s Hot Honey</strong>, and <strong class="text-stone-100">Coder&#39;s Hot Chocolate</strong>. Delivered anywhere in the UK for a flat fee of £19.99. </p>`);
			_push(ssrRenderComponent(unref(Link), {
				href: "#builder",
				class: "fire-button px-4 py-2 mt-4"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Buy a box `);
					else return [createTextVNode(" Buy a box ")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div>`);
			if (__props.checkoutError) _push(`<p class="rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">${ssrInterpolate(__props.checkoutError)}</p>`);
			else _push(`<!---->`);
			_push(`<div class="grid gap-4 sm:grid-cols-3"><!--[-->`);
			ssrRenderList(__props.credibility, (item) => {
				_push(`<article class="stat-card"><p class="text-xs uppercase tracking-[0.28em] text-orange-300">${ssrInterpolate(item.title)}</p><p class="mt-3 text-sm leading-7 text-stone-300">${ssrInterpolate(item.copy)}</p></article>`);
			});
			_push(`<!--]--></div></div>`);
			_push(ssrRenderComponent(SlotMachine_default, {
				products: __props.products,
				"box-limit": __props.boxLimit,
				"checkout-label": __props.checkoutLabel,
				"loading-checkout": __props.loadingCheckout,
				onStartCheckout: startCheckout,
				onChange: (payload) => emit("change", payload)
			}, null, _parent));
			_push(`</div></section>`);
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Sections/Hero.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Welcome.vue
var _sfc_main = {
	__name: "Welcome",
	__ssrInlineRender: true,
	props: {
		canLogin: {
			type: Boolean,
			default: false
		},
		canRegister: {
			type: Boolean,
			default: false
		},
		products: {
			type: Array,
			default: () => []
		},
		boxLimit: {
			type: Number,
			default: 3
		}
	},
	setup(__props) {
		const props = __props;
		const checkoutError = ref("");
		const loadingCheckout = ref(false);
		const slotState = ref({
			counts: {},
			totalBottles: 0,
			selectedItemsPayload: []
		});
		const onSlotChange = (payload) => {
			slotState.value = payload;
		};
		const counts = computed(() => slotState.value.counts);
		const totalBottles = computed(() => slotState.value.totalBottles);
		const selectedItemsPayload = computed(() => slotState.value.selectedItemsPayload);
		const credibility = [
			{
				title: numberToWord(props.products.length) + " Bottle Range",
				copy: "Classic, Mango, Hot Honey, and the darker Chocolate bottle. All 125ml, all built for pizza."
			},
			{
				title: "£19.99 Delivered",
				copy: "One flat price for the full box, delivered anywhere in the UK. No extra shipping math."
			},
			{
				title: "Branded Merch",
				copy: "Coming soon. Wear the heat while you shop the box. Provisions are being made."
			}
		];
		const ourSauces = [
			"soya free",
			"gluten free",
			"palm oil free",
			"no artificial colours",
			"no artificial flavours",
			"no artificial sweeteners",
			"no artificial preservatives"
		];
		const checkoutLabel = computed(() => {
			if (loadingCheckout.value) return "Opening Checkout...";
			if (totalBottles.value === 0) return "Checkout the Box";
			return `Checkout ${totalBottles.value} Bottle${totalBottles.value === 1 ? "" : "s"}`;
		});
		const heatScale = (level) => `${"●".repeat(level)}${"○".repeat(Math.max(0, 5 - level))}`;
		const startCheckout = async () => {
			if (selectedItemsPayload.value.length === 0) {
				checkoutError.value = "Pick at least one bottle before checkout.";
				return;
			}
			checkoutError.value = "";
			loadingCheckout.value = true;
			try {
				const response = await axios.post(route("checkout.store"), { items: selectedItemsPayload.value });
				window.location.href = response.data.checkout_url;
			} catch (error) {
				checkoutError.value = error.response?.data?.message ?? error.response?.data?.errors?.items?.[0] ?? "Checkout failed. Confirm Stripe is configured and try again.";
				loadingCheckout.value = false;
			}
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Coder's Hot Sauce" }, null, _parent));
			_push(`<div class="site-shell"><div class="mesh-bg absolute inset-0 opacity-70"></div><div class="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.32),transparent_55%)]"></div><div class="absolute right-0 top-24 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl"></div><div class="absolute left-0 top-[30rem] h-96 w-96 rounded-full bg-red-500/10 blur-3xl"></div><div class="relative mx-auto flex min-h-screen max-w-7xl flex-col px-0 pb-16 lg:pt-6 lg:px-8"><header class="glow-panel rounded-none lg:rounded-[2rem] flex items-center justify-between px-5 py-4"><a href="#" class="flex items-center gap-4"><div class="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl font-display tracking-[0.18em] text-orange-300">`);
			_push(ssrRenderComponent(Logo_default, null, null, _parent));
			_push(`</div><div><p class="font-display text-2xl lg:text-3xl uppercase tracking-[0.16em] text-stone-50"> Coder&#39;s Hot Sauce </p><p class="text-xs uppercase tracking-none lg:tracking-[0.28em] text-stone-400"> Fuel for working techies </p></div></a><nav class="hidden items-center gap-6 text-sm uppercase tracking-[0.22em] text-stone-300 md:flex"><a href="#bottles" class="transition hover:text-orange-300">Bottles</a><a href="#builder" class="transition hover:text-orange-300">Build a Box</a><a href="#merchandise" class="transition hover:text-orange-300">Merchandise</a><a href="#contact" class="transition hover:text-orange-300">Contact</a>`);
			if (_ctx.$page.props.auth.user) _push(ssrRenderComponent(unref(Link), {
				href: _ctx.route("dashboard"),
				class: "ghost-button px-4 py-2"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Dashboard `);
					else return [createTextVNode(" Dashboard ")];
				}),
				_: 1
			}, _parent));
			else if (__props.canLogin) _push(ssrRenderComponent(unref(Link), {
				href: _ctx.route("login"),
				class: "ghost-button px-4 py-2"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Sign In `);
					else return [createTextVNode(" Sign In ")];
				}),
				_: 1
			}, _parent));
			else _push(`<!---->`);
			_push(`</nav></header><main class="flex-1">`);
			_push(ssrRenderComponent(_sfc_main$1, {
				products: __props.products,
				"box-limit": __props.boxLimit,
				"checkout-label": checkoutLabel.value,
				"loading-checkout": loadingCheckout.value,
				credibility,
				onStartCheckout: startCheckout,
				onChange: onSlotChange
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$6, {
				products: __props.products,
				counts: counts.value,
				"heat-scale": heatScale
			}, null, _parent));
			_push(`<section id="merchandise" class="pb-20"><div class="flex flex-col md:flex-row items-start md:items-center"><div class="w-full sm:w-2/3 glow-panel rounded-none sm:rounded-[2rem] p-8 sm:p-10 border-dashed border-2 border-orange-500/20"><p class="section-label">Provision</p><h2 class="mt-4 font-display text-5xl uppercase tracking-[0.08em] text-stone-50"> Branded Merch. </h2><p class="mt-6 text-base leading-8 text-stone-300"> Provisions are being made to sell branded apparel and gear. Details are currently being finalized to ensure every thread meets the same standard as the sauce. </p><div class="mt-8 flex items-center gap-4 text-orange-300/50"><span class="text-sm uppercase tracking-[0.2em]">Coming Soon</span><div class="h-px flex-1 bg-gradient-to-r from-orange-500/20 to-transparent"></div></div></div><div class="px-10 mt-10 md:mt-0"><ul class="list-disc list-inside span-2 text-lg"><!--[-->`);
			ssrRenderList(ourSauces, (sauce) => {
				_push(`<li>${ssrInterpolate(sauce)}</li>`);
			});
			_push(`<!--]--></ul></div></div></section>`);
			_push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
			_push(ssrRenderComponent(Contact_default, null, null, _parent));
			_push(ssrRenderComponent(FinalCta_default, null, null, _parent));
			_push(`</main></div></div><!--]-->`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Welcome.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
