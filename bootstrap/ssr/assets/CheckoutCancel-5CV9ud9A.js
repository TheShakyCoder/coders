import { Head, Link } from "@inertiajs/vue3";
import { createTextVNode, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Pages/CheckoutCancel.vue
var _sfc_main = {
	__name: "CheckoutCancel",
	__ssrInlineRender: true,
	props: { order: {
		type: Object,
		required: true
	} },
	setup(__props) {
		const itemSummary = (item) => `${item.product_name} x${item.quantity}`;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Checkout Canceled" }, null, _parent));
			_push(`<div class="site-shell"><div class="mesh-bg absolute inset-0 opacity-70"></div><div class="relative mx-auto flex min-h-screen max-w-4xl items-center px-6 py-16"><div class="glow-panel rounded-[2rem] w-full p-8 sm:p-12"><p class="section-label">Checkout paused</p><h1 class="mt-4 font-display text-6xl uppercase tracking-[0.08em] text-stone-50 sm:text-7xl"> Slice saved. Sauce still waiting. </h1><p class="mt-6 max-w-2xl text-lg leading-8 text-stone-300"> No charge was completed. Your order record is still in the system so you can head back and start a fresh Checkout session when you are ready. Standard UK delivery remains £4 unless Club Silver is active on your account. </p><div class="mt-10 grid gap-4 sm:grid-cols-2"><div class="rounded-[1.6rem] border border-white/10 bg-black/30 p-6"><p class="text-xs uppercase tracking-[0.24em] text-stone-500">Pending box</p><p class="mt-3 font-display text-4xl uppercase tracking-[0.08em] text-stone-50">${ssrInterpolate(__props.order.product_name)}</p><div class="mt-4 space-y-2 text-sm leading-6 text-stone-300"><!--[-->`);
			ssrRenderList(__props.order.items, (item) => {
				_push(`<p>${ssrInterpolate(itemSummary(item))}</p>`);
			});
			_push(`<!--]--></div></div><div class="rounded-[1.6rem] border border-white/10 bg-black/30 p-6"><p class="text-xs uppercase tracking-[0.24em] text-stone-500">Order reference</p><p class="mt-3 font-display text-4xl uppercase tracking-[0.08em] text-stone-50">${ssrInterpolate(__props.order.public_id)}</p><p class="mt-4 text-sm leading-6 text-stone-400">${ssrInterpolate(__props.order.quantity)} bottle${ssrInterpolate(__props.order.quantity === 1 ? "" : "s")} selected</p></div></div><div class="mt-10 flex flex-col gap-3 sm:flex-row">`);
			_push(ssrRenderComponent(unref(Link), {
				href: _ctx.route("home"),
				class: "fire-button text-center"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Back to storefront `);
					else return [createTextVNode(" Back to storefront ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(Link), {
				href: `${_ctx.route("home")}#sauces`,
				class: "ghost-button text-center"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Review the lineup `);
					else return [createTextVNode(" Review the lineup ")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></div></div><!--]-->`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/CheckoutCancel.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
