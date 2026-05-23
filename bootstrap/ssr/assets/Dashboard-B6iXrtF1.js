import { n as formatMoney, t as formatDate } from "./formatting-DuoLLN1c.js";
import { t as _sfc_main$1 } from "./AuthenticatedLayout-xBunxJNF.js";
import { Head, Link, usePage } from "@inertiajs/vue3";
import { Fragment, computed, createBlock, createCommentVNode, createTextVNode, createVNode, openBlock, renderList, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderClass, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Pages/Dashboard.vue
var _sfc_main = {
	__name: "Dashboard",
	__ssrInlineRender: true,
	props: { orders: {
		type: Array,
		default: () => []
	} },
	setup(__props) {
		const page = usePage();
		const user = computed(() => page.props.auth.user);
		const statusStyles = {
			paid: "bg-green-500/15 text-green-300 border-green-500/30",
			initiated: "bg-stone-500/15 text-stone-400 border-stone-500/30",
			checkout_created: "bg-orange-500/15 text-orange-300 border-orange-500/30",
			checkout_failed: "bg-red-500/15 text-red-300 border-red-500/30",
			canceled: "bg-stone-500/15 text-stone-400 border-stone-500/30",
			expired: "bg-stone-500/15 text-stone-400 border-stone-500/30",
			payment_failed: "bg-red-500/15 text-red-300 border-red-500/30"
		};
		const statusLabel = {
			paid: "Paid",
			initiated: "Pending",
			checkout_created: "Awaiting Payment",
			checkout_failed: "Checkout Failed",
			canceled: "Canceled",
			expired: "Expired",
			payment_failed: "Payment Failed"
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Dashboard" }, null, _parent));
			_push(ssrRenderComponent(_sfc_main$1, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="space-y-6"${_scopeId}><div class="glow-panel rounded-none sm:rounded-[2rem] px-6 py-8 sm:px-10"${_scopeId}><p class="section-label"${_scopeId}>Welcome back</p><h1 class="mt-3 font-display text-4xl uppercase tracking-[0.08em] text-stone-50 sm:text-5xl"${_scopeId}>${ssrInterpolate(user.value.name)}</h1><p class="mt-2 text-sm uppercase tracking-[0.2em] text-stone-400"${_scopeId}>${ssrInterpolate(user.value.email)}</p></div><section${_scopeId}><div class="mb-4 flex items-end justify-between px-1"${_scopeId}><div${_scopeId}><p class="section-label"${_scopeId}>History</p><h2 class="mt-2 font-display text-3xl uppercase tracking-[0.08em] text-stone-50"${_scopeId}>Your Orders</h2></div>`);
						_push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("home"),
							class: "ghost-button px-4 py-2"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`Build a box`);
								else return [createTextVNode("Build a box")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
						if (__props.orders.length === 0) {
							_push(`<div class="glow-panel rounded-none sm:rounded-[2rem] px-8 py-12 text-center"${_scopeId}><p class="font-display text-2xl uppercase tracking-[0.08em] text-stone-400"${_scopeId}>No orders yet</p><p class="mt-3 text-sm text-stone-500"${_scopeId}> Head to the store and build your first box. </p>`);
							_push(ssrRenderComponent(unref(Link), {
								href: _ctx.route("home"),
								class: "fire-button mt-6 inline-block"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`Build a box`);
									else return [createTextVNode("Build a box")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div>`);
						} else {
							_push(`<div class="rounded-none sm:rounded-[2rem] border border-white/10 overflow-hidden"${_scopeId}><table class="w-full text-sm"${_scopeId}><thead${_scopeId}><tr class="border-b border-white/10 bg-black/30"${_scopeId}><th class="px-6 py-4 text-left text-xs uppercase tracking-[0.2em] text-stone-500 font-normal"${_scopeId}>Reference</th><th class="px-6 py-4 text-left text-xs uppercase tracking-[0.2em] text-stone-500 font-normal"${_scopeId}>Date</th><th class="px-6 py-4 text-left text-xs uppercase tracking-[0.2em] text-stone-500 font-normal"${_scopeId}>Status</th><th class="px-6 py-4 text-right text-xs uppercase tracking-[0.2em] text-stone-500 font-normal"${_scopeId}>Total</th></tr></thead><tbody class="divide-y divide-white/[0.04]"${_scopeId}><!--[-->`);
							ssrRenderList(__props.orders, (order) => {
								_push(`<tr class="bg-black/20 hover:bg-black/30 transition-colors"${_scopeId}><td class="px-6 py-4 font-display tracking-[0.08em] text-stone-300 text-xs"${_scopeId}>${ssrInterpolate(order.public_id)}</td><td class="px-6 py-4 text-stone-400"${_scopeId}>${ssrInterpolate(unref(formatDate)(order.paid_at ?? order.created_at))}</td><td class="px-6 py-4"${_scopeId}><span class="${ssrRenderClass([statusStyles[order.status] ?? "bg-stone-500/15 text-stone-400 border-stone-500/30", "chip border"])}"${_scopeId}>${ssrInterpolate(statusLabel[order.status] ?? order.status)}</span></td><td class="px-6 py-4 text-right font-display text-lg tracking-[0.08em] text-stone-200"${_scopeId}>${ssrInterpolate(order.total_amount ? unref(formatMoney)(order.total_amount) : "—")}</td></tr>`);
							});
							_push(`<!--]--></tbody></table></div>`);
						}
						_push(`</section><div class="${ssrRenderClass([user.value.is_admin ? "sm:grid-cols-3" : "sm:grid-cols-2", "grid gap-4"])}"${_scopeId}>`);
						_push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("home"),
							class: "stat-card group block"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<p class="text-xs uppercase tracking-[0.28em] text-orange-300"${_scopeId}>Storefront</p><p class="mt-3 font-display text-xl uppercase tracking-[0.08em] text-stone-50 group-hover:text-orange-300 transition-colors"${_scopeId}>Build a Box</p>`);
								else return [createVNode("p", { class: "text-xs uppercase tracking-[0.28em] text-orange-300" }, "Storefront"), createVNode("p", { class: "mt-3 font-display text-xl uppercase tracking-[0.08em] text-stone-50 group-hover:text-orange-300 transition-colors" }, "Build a Box")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("profile.edit"),
							class: "stat-card group block"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<p class="text-xs uppercase tracking-[0.28em] text-orange-300"${_scopeId}>Account</p><p class="mt-3 font-display text-xl uppercase tracking-[0.08em] text-stone-50 group-hover:text-orange-300 transition-colors"${_scopeId}>Profile</p>`);
								else return [createVNode("p", { class: "text-xs uppercase tracking-[0.28em] text-orange-300" }, "Account"), createVNode("p", { class: "mt-3 font-display text-xl uppercase tracking-[0.08em] text-stone-50 group-hover:text-orange-300 transition-colors" }, "Profile")];
							}),
							_: 1
						}, _parent, _scopeId));
						if (user.value.is_admin) _push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("admin.dashboard"),
							class: "stat-card group block"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<p class="text-xs uppercase tracking-[0.28em] text-orange-300"${_scopeId}>Admin</p><p class="mt-3 font-display text-xl uppercase tracking-[0.08em] text-stone-50 group-hover:text-orange-300 transition-colors"${_scopeId}>Admin Panel</p>`);
								else return [createVNode("p", { class: "text-xs uppercase tracking-[0.28em] text-orange-300" }, "Admin"), createVNode("p", { class: "mt-3 font-display text-xl uppercase tracking-[0.08em] text-stone-50 group-hover:text-orange-300 transition-colors" }, "Admin Panel")];
							}),
							_: 1
						}, _parent, _scopeId));
						else _push(`<!---->`);
						_push(`</div></div>`);
					} else return [createVNode("div", { class: "space-y-6" }, [
						createVNode("div", { class: "glow-panel rounded-none sm:rounded-[2rem] px-6 py-8 sm:px-10" }, [
							createVNode("p", { class: "section-label" }, "Welcome back"),
							createVNode("h1", { class: "mt-3 font-display text-4xl uppercase tracking-[0.08em] text-stone-50 sm:text-5xl" }, toDisplayString(user.value.name), 1),
							createVNode("p", { class: "mt-2 text-sm uppercase tracking-[0.2em] text-stone-400" }, toDisplayString(user.value.email), 1)
						]),
						createVNode("section", null, [createVNode("div", { class: "mb-4 flex items-end justify-between px-1" }, [createVNode("div", null, [createVNode("p", { class: "section-label" }, "History"), createVNode("h2", { class: "mt-2 font-display text-3xl uppercase tracking-[0.08em] text-stone-50" }, "Your Orders")]), createVNode(unref(Link), {
							href: _ctx.route("home"),
							class: "ghost-button px-4 py-2"
						}, {
							default: withCtx(() => [createTextVNode("Build a box")]),
							_: 1
						}, 8, ["href"])]), __props.orders.length === 0 ? (openBlock(), createBlock("div", {
							key: 0,
							class: "glow-panel rounded-none sm:rounded-[2rem] px-8 py-12 text-center"
						}, [
							createVNode("p", { class: "font-display text-2xl uppercase tracking-[0.08em] text-stone-400" }, "No orders yet"),
							createVNode("p", { class: "mt-3 text-sm text-stone-500" }, " Head to the store and build your first box. "),
							createVNode(unref(Link), {
								href: _ctx.route("home"),
								class: "fire-button mt-6 inline-block"
							}, {
								default: withCtx(() => [createTextVNode("Build a box")]),
								_: 1
							}, 8, ["href"])
						])) : (openBlock(), createBlock("div", {
							key: 1,
							class: "rounded-none sm:rounded-[2rem] border border-white/10 overflow-hidden"
						}, [createVNode("table", { class: "w-full text-sm" }, [createVNode("thead", null, [createVNode("tr", { class: "border-b border-white/10 bg-black/30" }, [
							createVNode("th", { class: "px-6 py-4 text-left text-xs uppercase tracking-[0.2em] text-stone-500 font-normal" }, "Reference"),
							createVNode("th", { class: "px-6 py-4 text-left text-xs uppercase tracking-[0.2em] text-stone-500 font-normal" }, "Date"),
							createVNode("th", { class: "px-6 py-4 text-left text-xs uppercase tracking-[0.2em] text-stone-500 font-normal" }, "Status"),
							createVNode("th", { class: "px-6 py-4 text-right text-xs uppercase tracking-[0.2em] text-stone-500 font-normal" }, "Total")
						])]), createVNode("tbody", { class: "divide-y divide-white/[0.04]" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.orders, (order) => {
							return openBlock(), createBlock("tr", {
								key: order.public_id,
								class: "bg-black/20 hover:bg-black/30 transition-colors"
							}, [
								createVNode("td", { class: "px-6 py-4 font-display tracking-[0.08em] text-stone-300 text-xs" }, toDisplayString(order.public_id), 1),
								createVNode("td", { class: "px-6 py-4 text-stone-400" }, toDisplayString(unref(formatDate)(order.paid_at ?? order.created_at)), 1),
								createVNode("td", { class: "px-6 py-4" }, [createVNode("span", { class: ["chip border", statusStyles[order.status] ?? "bg-stone-500/15 text-stone-400 border-stone-500/30"] }, toDisplayString(statusLabel[order.status] ?? order.status), 3)]),
								createVNode("td", { class: "px-6 py-4 text-right font-display text-lg tracking-[0.08em] text-stone-200" }, toDisplayString(order.total_amount ? unref(formatMoney)(order.total_amount) : "—"), 1)
							]);
						}), 128))])])]))]),
						createVNode("div", { class: ["grid gap-4", user.value.is_admin ? "sm:grid-cols-3" : "sm:grid-cols-2"] }, [
							createVNode(unref(Link), {
								href: _ctx.route("home"),
								class: "stat-card group block"
							}, {
								default: withCtx(() => [createVNode("p", { class: "text-xs uppercase tracking-[0.28em] text-orange-300" }, "Storefront"), createVNode("p", { class: "mt-3 font-display text-xl uppercase tracking-[0.08em] text-stone-50 group-hover:text-orange-300 transition-colors" }, "Build a Box")]),
								_: 1
							}, 8, ["href"]),
							createVNode(unref(Link), {
								href: _ctx.route("profile.edit"),
								class: "stat-card group block"
							}, {
								default: withCtx(() => [createVNode("p", { class: "text-xs uppercase tracking-[0.28em] text-orange-300" }, "Account"), createVNode("p", { class: "mt-3 font-display text-xl uppercase tracking-[0.08em] text-stone-50 group-hover:text-orange-300 transition-colors" }, "Profile")]),
								_: 1
							}, 8, ["href"]),
							user.value.is_admin ? (openBlock(), createBlock(unref(Link), {
								key: 0,
								href: _ctx.route("admin.dashboard"),
								class: "stat-card group block"
							}, {
								default: withCtx(() => [createVNode("p", { class: "text-xs uppercase tracking-[0.28em] text-orange-300" }, "Admin"), createVNode("p", { class: "mt-3 font-display text-xl uppercase tracking-[0.08em] text-stone-50 group-hover:text-orange-300 transition-colors" }, "Admin Panel")]),
								_: 1
							}, 8, ["href"])) : createCommentVNode("", true)
						], 2)
					])];
				}),
				_: 1
			}, _parent));
			_push(`<!--]-->`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
