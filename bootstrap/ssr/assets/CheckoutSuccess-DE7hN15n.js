import { n as formatMoney } from "./formatting-DuoLLN1c.js";
import { Head, Link } from "@inertiajs/vue3";
import { createTextVNode, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Pages/CheckoutSuccess.vue
var _sfc_main = {
	__name: "CheckoutSuccess",
	__ssrInlineRender: true,
	props: { order: {
		type: Object,
		required: true
	} },
	setup(__props) {
		const itemSummary = (item) => `${item.product_name} x${item.quantity}`;
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Checkout Success" }, null, _parent));
			_push(`<div class="site-shell"><div class="mesh-bg absolute inset-0 opacity-70"></div><div class="relative mx-auto flex min-h-screen max-w-4xl items-center px-6 py-16"><div class="glow-panel rounded-[2rem] w-full p-8 sm:p-12"><p class="section-label">${ssrInterpolate(__props.order.status === "paid" ? "Payment confirmed" : "Checkout received")}</p><h1 class="mt-4 font-display text-6xl uppercase tracking-[0.08em] text-stone-50 sm:text-7xl">${ssrInterpolate(__props.order.status === "paid" ? "Receipt secured." : "Order processing.")}</h1><p class="mt-6 max-w-2xl text-lg leading-8 text-stone-300">${ssrInterpolate(__props.order.status === "paid" ? "Your box is locked in. Stripe has the payment and the order is ready for fulfillment review." : "Stripe redirected successfully. If the webhook has not landed yet, this order will update automatically.")}</p><div class="mt-10 grid gap-4 sm:grid-cols-2"><div class="rounded-[1.6rem] border border-white/10 bg-black/30 p-6"><p class="text-xs uppercase tracking-[0.24em] text-stone-500">Order</p><p class="mt-3 font-display text-4xl uppercase tracking-[0.08em] text-stone-50">${ssrInterpolate(__props.order.public_id)}</p><p class="mt-3 text-sm leading-7 text-stone-400">${ssrInterpolate(__props.order.product_name)}</p></div><div class="rounded-[1.6rem] border border-white/10 bg-black/30 p-6"><p class="text-xs uppercase tracking-[0.24em] text-stone-500">Total</p><p class="mt-3 text-3xl font-semibold text-stone-50">${ssrInterpolate(unref(formatMoney)(__props.order.total_amount, __props.order.currency))}</p><p class="mt-3 text-sm leading-7 text-stone-400">${ssrInterpolate(__props.order.customer_email || "Email will appear after Checkout confirms details.")}</p></div></div><div class="mt-10 flex flex-col gap-3 sm:flex-row">`);
			_push(ssrRenderComponent(unref(Link), {
				href: _ctx.route("home"),
				class: "ghost-button text-center"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Back to storefront `);
					else return [createTextVNode(" Back to storefront ")];
				}),
				_: 1
			}, _parent));
			_push(`<a href="#details" class="fire-button text-center"> Review order </a></div><div id="details" class="mt-10 rounded-[1.8rem] border border-white/10 bg-white/5 p-6"><p class="section-label">Order details</p><dl class="mt-5 grid gap-4 text-sm text-stone-300 sm:grid-cols-2"><div><dt class="text-xs uppercase tracking-[0.24em] text-stone-500">Status</dt><dd class="mt-2 text-base text-stone-100">${ssrInterpolate(__props.order.status)}</dd></div><div><dt class="text-xs uppercase tracking-[0.24em] text-stone-500">Checkout session</dt><dd class="mt-2 break-all text-base text-stone-100">${ssrInterpolate(__props.order.stripe_checkout_session_id || "Pending")}</dd></div><div><dt class="text-xs uppercase tracking-[0.24em] text-stone-500">Shipping</dt><dd class="mt-2 text-base text-stone-100">${ssrInterpolate(__props.order.shipping_address?.city ? `${__props.order.shipping_address.city}, ${__props.order.shipping_address.state || __props.order.shipping_address.country}` : "Captured during checkout")}</dd></div><div><dt class="text-xs uppercase tracking-[0.24em] text-stone-500">Bottle count</dt><dd class="mt-2 text-base text-stone-100">${ssrInterpolate(__props.order.quantity)}</dd></div><div class="sm:col-span-2"><dt class="text-xs uppercase tracking-[0.24em] text-stone-500">Box contents</dt><dd class="mt-2 space-y-2 text-base text-stone-100"><!--[-->`);
			ssrRenderList(__props.order.items, (item) => {
				_push(`<p>${ssrInterpolate(itemSummary(item))}</p>`);
			});
			_push(`<!--]--></dd></div></dl></div></div></div></div><!--]-->`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/CheckoutSuccess.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
