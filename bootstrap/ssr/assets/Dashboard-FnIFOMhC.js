import { t as AdminLayout_default } from "./AdminLayout-BfLn1rHy.js";
import { Head } from "@inertiajs/vue3";
import { Fragment, createBlock, createTextVNode, createVNode, openBlock, renderList, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderClass, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Pages/Admin/Dashboard.vue
var _sfc_main = {
	__name: "Dashboard",
	__ssrInlineRender: true,
	setup(__props) {
		const stats = [
			{
				name: "Total Products",
				value: "71",
				change: "+2.1%",
				changeType: "increase"
			},
			{
				name: "Active Subscriptions",
				value: "1,289",
				change: "+12.5%",
				changeType: "increase"
			},
			{
				name: "Monthly Revenue",
				value: "$45,231",
				change: "+5.4%",
				changeType: "increase"
			},
			{
				name: "New Customers",
				value: "124",
				change: "-1.2%",
				changeType: "decrease"
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Admin Dashboard" }, null, _parent));
			_push(ssrRenderComponent(AdminLayout_default, null, {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold tracking-tight text-stone-100"${_scopeId}>Dashboard Overview</h1><p class="mt-2 text-stone-400"${_scopeId}>Welcome back. Here&#39;s what&#39;s happening with your projects today.</p></div><div class="flex gap-4"${_scopeId}><button class="ghost-button !px-4 !py-2 text-xs"${_scopeId}>Download Reports</button><button class="fire-button !px-4 !py-2 text-xs font-bold"${_scopeId}>New Action</button></div></div>`);
					else return [createVNode("div", { class: "flex items-center justify-between" }, [createVNode("div", null, [createVNode("h1", { class: "text-3xl font-bold tracking-tight text-stone-100" }, "Dashboard Overview"), createVNode("p", { class: "mt-2 text-stone-400" }, "Welcome back. Here's what's happening with your projects today.")]), createVNode("div", { class: "flex gap-4" }, [createVNode("button", { class: "ghost-button !px-4 !py-2 text-xs" }, "Download Reports"), createVNode("button", { class: "fire-button !px-4 !py-2 text-xs font-bold" }, "New Action")])])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="space-y-10"${_scopeId}><div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"${_scopeId}><!--[-->`);
						ssrRenderList(stats, (stat) => {
							_push(`<div class="stat-card group hover:border-orange-500/30 transition-colors"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><span class="section-label !lowercase"${_scopeId}>${ssrInterpolate(stat.name)}</span><span class="${ssrRenderClass([stat.changeType === "increase" ? "text-green-500" : "text-red-500", "text-xs font-medium"])}"${_scopeId}>${ssrInterpolate(stat.change)}</span></div><div class="text-3xl font-bold text-stone-100 group-hover:text-orange-400 transition-colors"${_scopeId}>${ssrInterpolate(stat.value)}</div></div>`);
						});
						_push(`<!--]--></div><div class="glow-panel rounded-[2rem] p-8"${_scopeId}><div class="flex items-center justify-between mb-8"${_scopeId}><h2 class="text-xl font-bold text-stone-100 tracking-wide"${_scopeId}>Recent Activity</h2><button class="text-orange-400 text-sm hover:text-orange-300 transition-colors uppercase tracking-widest font-bold"${_scopeId}>View All</button></div><div class="space-y-6"${_scopeId}><!--[-->`);
						ssrRenderList(5, (i) => {
							_push(`<div class="flex items-center gap-4 py-4 border-b border-white/5 last:border-0 group"${_scopeId}><div class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-orange-500/20 transition-colors"${_scopeId}><svg class="w-5 h-5 text-stone-400 group-hover:text-orange-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"${_scopeId}></path></svg></div><div class="flex-1"${_scopeId}><div class="text-stone-200 font-medium"${_scopeId}>New product &quot;<span class="text-orange-400"${_scopeId}>Quantum Core</span>&quot; was added</div><div class="text-stone-500 text-xs"${_scopeId}>2 hours ago • by Alex Harrison</div></div><button class="text-stone-400 hover:text-stone-100 transition-colors"${_scopeId}><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"${_scopeId}></path></svg></button></div>`);
						});
						_push(`<!--]--></div></div></div>`);
					} else return [createVNode("div", { class: "space-y-10" }, [createVNode("div", { class: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" }, [(openBlock(), createBlock(Fragment, null, renderList(stats, (stat) => {
						return createVNode("div", {
							key: stat.name,
							class: "stat-card group hover:border-orange-500/30 transition-colors"
						}, [createVNode("div", { class: "flex items-center justify-between mb-4" }, [createVNode("span", { class: "section-label !lowercase" }, toDisplayString(stat.name), 1), createVNode("span", { class: [stat.changeType === "increase" ? "text-green-500" : "text-red-500", "text-xs font-medium"] }, toDisplayString(stat.change), 3)]), createVNode("div", { class: "text-3xl font-bold text-stone-100 group-hover:text-orange-400 transition-colors" }, toDisplayString(stat.value), 1)]);
					}), 64))]), createVNode("div", { class: "glow-panel rounded-[2rem] p-8" }, [createVNode("div", { class: "flex items-center justify-between mb-8" }, [createVNode("h2", { class: "text-xl font-bold text-stone-100 tracking-wide" }, "Recent Activity"), createVNode("button", { class: "text-orange-400 text-sm hover:text-orange-300 transition-colors uppercase tracking-widest font-bold" }, "View All")]), createVNode("div", { class: "space-y-6" }, [(openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
						return createVNode("div", {
							key: i,
							class: "flex items-center gap-4 py-4 border-b border-white/5 last:border-0 group"
						}, [
							createVNode("div", { class: "w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-orange-500/20 transition-colors" }, [(openBlock(), createBlock("svg", {
								class: "w-5 h-5 text-stone-400 group-hover:text-orange-400 transition-colors",
								fill: "none",
								viewBox: "0 0 24 24",
								stroke: "currentColor"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "2",
								d: "M12 4v16m8-8H4"
							})]))]),
							createVNode("div", { class: "flex-1" }, [createVNode("div", { class: "text-stone-200 font-medium" }, [
								createTextVNode("New product \""),
								createVNode("span", { class: "text-orange-400" }, "Quantum Core"),
								createTextVNode("\" was added")
							]), createVNode("div", { class: "text-stone-500 text-xs" }, "2 hours ago • by Alex Harrison")]),
							createVNode("button", { class: "text-stone-400 hover:text-stone-100 transition-colors" }, [(openBlock(), createBlock("svg", {
								class: "w-5 h-5",
								fill: "none",
								viewBox: "0 0 24 24",
								stroke: "currentColor"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "2",
								d: "M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
							})]))])
						]);
					}), 64))])])])];
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Dashboard.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
