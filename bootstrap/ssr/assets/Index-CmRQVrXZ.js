import { t as AdminLayout_default } from "./AdminLayout-BfLn1rHy.js";
import "./SecondaryButton-DIEjjGVj.js";
import { Head, Link, router } from "@inertiajs/vue3";
import { Fragment, createBlock, createCommentVNode, createTextVNode, createVNode, openBlock, renderList, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region resources/js/Pages/Admin/Products/Index.vue
var _sfc_main = {
	__name: "Index",
	__ssrInlineRender: true,
	props: { products: {
		type: Array,
		required: true
	} },
	setup(__props) {
		const deleteProduct = (product) => {
			if (confirm(`Are you sure you want to delete ${product.name}?`)) router.delete(route("admin.products.destroy", product.id), {
				preserveState: true,
				preserveScroll: true
			});
		};
		const formatCurrency = (amount) => {
			return new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD"
			}).format(amount / 100);
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Products Management" }, null, _parent));
			_push(ssrRenderComponent(AdminLayout_default, null, {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"${_scopeId}><div${_scopeId}><h1 class="text-3xl font-bold tracking-tight text-stone-100 uppercase tracking-widest"${_scopeId}>Product Catalog</h1><p class="mt-2 text-stone-400"${_scopeId}>Manage your inventory, pricing and builds</p></div>`);
						_push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("admin.products.create"),
							class: "fire-button group"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<svg class="w-5 h-5 mr-2 transition-transform group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"${_scopeId}></path></svg> Add Product `);
								else return [(openBlock(), createBlock("svg", {
									class: "w-5 h-5 mr-2 transition-transform group-hover:rotate-90",
									fill: "none",
									viewBox: "0 0 24 24",
									stroke: "currentColor"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M12 4v16m8-8H4"
								})])), createTextVNode(" Add Product ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
					} else return [createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6" }, [createVNode("div", null, [createVNode("h1", { class: "text-3xl font-bold tracking-tight text-stone-100 uppercase tracking-widest" }, "Product Catalog"), createVNode("p", { class: "mt-2 text-stone-400" }, "Manage your inventory, pricing and builds")]), createVNode(unref(Link), {
						href: _ctx.route("admin.products.create"),
						class: "fire-button group"
					}, {
						default: withCtx(() => [(openBlock(), createBlock("svg", {
							class: "w-5 h-5 mr-2 transition-transform group-hover:rotate-90",
							fill: "none",
							viewBox: "0 0 24 24",
							stroke: "currentColor"
						}, [createVNode("path", {
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							"stroke-width": "2",
							d: "M12 4v16m8-8H4"
						})])), createTextVNode(" Add Product ")]),
						_: 1
					}, 8, ["href"])])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="space-y-8"${_scopeId}><div class="glow-panel rounded-[2rem] p-4 flex flex-wrap items-center gap-4"${_scopeId}><div class="relative flex-1 min-w-[300px]"${_scopeId}><span class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"${_scopeId}><svg class="w-5 h-5 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"${_scopeId}></path></svg></span><input type="text" placeholder="Search products by name or SKU..." class="w-full bg-black/20 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-stone-200 placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all"${_scopeId}></div><div class="flex gap-2"${_scopeId}><button class="ghost-button !py-3 !px-5 text-xs font-bold border-white/5 bg-white/[0.02]"${_scopeId}>Filter</button><button class="ghost-button !py-3 !px-5 text-xs font-bold border-white/5 bg-white/[0.02]"${_scopeId}>Sort</button></div></div><div class="glow-panel rounded-[2rem] overflow-hidden border-white/5"${_scopeId}><div class="overflow-x-auto"${_scopeId}><table class="w-full text-left border-collapse"${_scopeId}><thead${_scopeId}><tr class="bg-white/[0.02] border-b border-white/5"${_scopeId}><th class="px-6 py-5 text-xs font-bold uppercase tracking-widest text-stone-500"${_scopeId}>Product</th><th class="px-6 py-5 text-xs font-bold uppercase tracking-widest text-stone-500"${_scopeId}>Class &amp; Unit</th><th class="px-6 py-5 text-xs font-bold uppercase tracking-widest text-stone-500"${_scopeId}>Price</th><th class="px-6 py-5 text-xs font-bold uppercase tracking-widest text-stone-500"${_scopeId}>Capabilities</th><th class="px-6 py-5 text-xs font-bold uppercase tracking-widest text-stone-500 text-right"${_scopeId}>Actions</th></tr></thead><tbody class="divide-y divide-white/5"${_scopeId}><!--[-->`);
						ssrRenderList(__props.products, (product) => {
							_push(`<tr class="hover:bg-white/[0.02] transition-colors group"${_scopeId}><td class="px-6 py-6"${_scopeId}><div class="flex items-center gap-4"${_scopeId}><div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-stone-800 to-stone-900 border border-white/10 flex items-center justify-center p-2"${_scopeId}><svg class="w-6 h-6 text-orange-400 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"${_scopeId}></path></svg></div><div${_scopeId}><div class="font-bold text-stone-100 group-hover:text-orange-400 transition-colors"${_scopeId}>${ssrInterpolate(product.name)}</div><div class="text-xs text-stone-500 max-w-xs truncate"${_scopeId}>${ssrInterpolate(product.description || "No description provided.")}</div></div></div></td><td class="px-6 py-6"${_scopeId}><div class="flex flex-col"${_scopeId}><span class="chip mb-1 !lowercase !py-0 !tracking-normal !px-2 border-orange-500/10 text-orange-200/70"${_scopeId}>${ssrInterpolate(product.class || "Standard")}</span><span class="text-xs text-stone-400 font-medium ml-1"${_scopeId}>per ${ssrInterpolate(product.unit)}</span></div></td><td class="px-6 py-6"${_scopeId}>`);
							if (product.can_sell) _push(`<div class="text-lg font-bold text-stone-100 tracking-tight"${_scopeId}>${ssrInterpolate(formatCurrency(product.price_amount))}</div>`);
							else _push(`<div class="text-stone-600 text-sm italic"${_scopeId}> Not for sale </div>`);
							_push(`</td><td class="px-6 py-6"${_scopeId}><div class="flex flex-wrap gap-2"${_scopeId}>`);
							if (product.can_sell) _push(`<span class="chip !bg-blue-500/5 !border-blue-500/20 !text-blue-400 !px-2 !py-0.5 !text-[10px]"${_scopeId}>Market</span>`);
							else _push(`<!---->`);
							if (product.can_be_built) _push(`<span class="chip !bg-green-500/5 !border-green-500/20 !text-green-400 !px-2 !py-0.5 !text-[10px]"${_scopeId}>Craftable</span>`);
							else _push(`<!---->`);
							if (product.can_build_with) _push(`<span class="chip !bg-purple-500/5 !border-purple-500/20 !text-purple-400 !px-2 !py-0.5 !text-[10px]"${_scopeId}>Resource</span>`);
							else _push(`<!---->`);
							_push(`</div></td><td class="px-6 py-6 text-right"${_scopeId}><div class="flex items-center justify-end gap-3 opacity-40 group-hover:opacity-100 transition-opacity"${_scopeId}>`);
							_push(ssrRenderComponent(unref(Link), {
								href: _ctx.route("admin.products.edit", product.id),
								class: "w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-stone-400 hover:text-orange-400 hover:border-orange-500/20 transition-all shadow-sm",
								title: "Edit Product"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"${_scopeId}></path></svg>`);
									else return [(openBlock(), createBlock("svg", {
										class: "w-4 h-4",
										fill: "none",
										viewBox: "0 0 24 24",
										stroke: "currentColor"
									}, [createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "2",
										d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
									})]))];
								}),
								_: 2
							}, _parent, _scopeId));
							_push(`<button class="w-10 h-10 rounded-full border border-white/10 bg-red-500/5 flex items-center justify-center text-stone-400 hover:text-red-400 hover:border-red-500/20 transition-all shadow-sm" title="Delete Product"${_scopeId}><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"${_scopeId}></path></svg></button></div></td></tr>`);
						});
						_push(`<!--]-->`);
						if (__props.products.length === 0) {
							_push(`<tr${_scopeId}><td colspan="5" class="px-6 py-20 text-center"${_scopeId}><div class="flex flex-col items-center"${_scopeId}><div class="w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-4 flex items-center justify-center"${_scopeId}><svg class="w-8 h-8 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"${_scopeId}></path></svg></div><h3 class="text-lg font-bold text-stone-100"${_scopeId}>Zero products found</h3><p class="text-stone-500 mt-1 max-w-[200px]"${_scopeId}>Begin your catalog by adding your first item.</p>`);
							_push(ssrRenderComponent(unref(Link), {
								href: _ctx.route("admin.products.create"),
								class: "fire-button !px-6 !py-2 text-xs mt-6"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`Initialize Catalog`);
									else return [createTextVNode("Initialize Catalog")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div></td></tr>`);
						} else _push(`<!---->`);
						_push(`</tbody></table></div></div><div class="flex items-center justify-between px-2"${_scopeId}><div class="text-xs text-stone-500 font-medium"${_scopeId}>Showing <span class="text-stone-200"${_scopeId}>${ssrInterpolate(__props.products.length)}</span> results</div><div class="flex gap-2"${_scopeId}><button disabled class="ghost-button !px-3 !py-2 !text-[10px] opacity-30 cursor-not-allowed"${_scopeId}>Previous</button><button class="ghost-button !px-3 !py-2 !text-[10px]"${_scopeId}>Next</button></div></div></div>`);
					} else return [createVNode("div", { class: "space-y-8" }, [
						createVNode("div", { class: "glow-panel rounded-[2rem] p-4 flex flex-wrap items-center gap-4" }, [createVNode("div", { class: "relative flex-1 min-w-[300px]" }, [createVNode("span", { class: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none" }, [(openBlock(), createBlock("svg", {
							class: "w-5 h-5 text-stone-500",
							fill: "none",
							viewBox: "0 0 24 24",
							stroke: "currentColor"
						}, [createVNode("path", {
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							"stroke-width": "2",
							d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						})]))]), createVNode("input", {
							type: "text",
							placeholder: "Search products by name or SKU...",
							class: "w-full bg-black/20 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-stone-200 placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all"
						})]), createVNode("div", { class: "flex gap-2" }, [createVNode("button", { class: "ghost-button !py-3 !px-5 text-xs font-bold border-white/5 bg-white/[0.02]" }, "Filter"), createVNode("button", { class: "ghost-button !py-3 !px-5 text-xs font-bold border-white/5 bg-white/[0.02]" }, "Sort")])]),
						createVNode("div", { class: "glow-panel rounded-[2rem] overflow-hidden border-white/5" }, [createVNode("div", { class: "overflow-x-auto" }, [createVNode("table", { class: "w-full text-left border-collapse" }, [createVNode("thead", null, [createVNode("tr", { class: "bg-white/[0.02] border-b border-white/5" }, [
							createVNode("th", { class: "px-6 py-5 text-xs font-bold uppercase tracking-widest text-stone-500" }, "Product"),
							createVNode("th", { class: "px-6 py-5 text-xs font-bold uppercase tracking-widest text-stone-500" }, "Class & Unit"),
							createVNode("th", { class: "px-6 py-5 text-xs font-bold uppercase tracking-widest text-stone-500" }, "Price"),
							createVNode("th", { class: "px-6 py-5 text-xs font-bold uppercase tracking-widest text-stone-500" }, "Capabilities"),
							createVNode("th", { class: "px-6 py-5 text-xs font-bold uppercase tracking-widest text-stone-500 text-right" }, "Actions")
						])]), createVNode("tbody", { class: "divide-y divide-white/5" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.products, (product) => {
							return openBlock(), createBlock("tr", {
								key: product.id,
								class: "hover:bg-white/[0.02] transition-colors group"
							}, [
								createVNode("td", { class: "px-6 py-6" }, [createVNode("div", { class: "flex items-center gap-4" }, [createVNode("div", { class: "w-12 h-12 rounded-2xl bg-gradient-to-br from-stone-800 to-stone-900 border border-white/10 flex items-center justify-center p-2" }, [(openBlock(), createBlock("svg", {
									class: "w-6 h-6 text-orange-400 opacity-60",
									fill: "none",
									viewBox: "0 0 24 24",
									stroke: "currentColor"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
								})]))]), createVNode("div", null, [createVNode("div", { class: "font-bold text-stone-100 group-hover:text-orange-400 transition-colors" }, toDisplayString(product.name), 1), createVNode("div", { class: "text-xs text-stone-500 max-w-xs truncate" }, toDisplayString(product.description || "No description provided."), 1)])])]),
								createVNode("td", { class: "px-6 py-6" }, [createVNode("div", { class: "flex flex-col" }, [createVNode("span", { class: "chip mb-1 !lowercase !py-0 !tracking-normal !px-2 border-orange-500/10 text-orange-200/70" }, toDisplayString(product.class || "Standard"), 1), createVNode("span", { class: "text-xs text-stone-400 font-medium ml-1" }, "per " + toDisplayString(product.unit), 1)])]),
								createVNode("td", { class: "px-6 py-6" }, [product.can_sell ? (openBlock(), createBlock("div", {
									key: 0,
									class: "text-lg font-bold text-stone-100 tracking-tight"
								}, toDisplayString(formatCurrency(product.price_amount)), 1)) : (openBlock(), createBlock("div", {
									key: 1,
									class: "text-stone-600 text-sm italic"
								}, " Not for sale "))]),
								createVNode("td", { class: "px-6 py-6" }, [createVNode("div", { class: "flex flex-wrap gap-2" }, [
									product.can_sell ? (openBlock(), createBlock("span", {
										key: 0,
										class: "chip !bg-blue-500/5 !border-blue-500/20 !text-blue-400 !px-2 !py-0.5 !text-[10px]"
									}, "Market")) : createCommentVNode("", true),
									product.can_be_built ? (openBlock(), createBlock("span", {
										key: 1,
										class: "chip !bg-green-500/5 !border-green-500/20 !text-green-400 !px-2 !py-0.5 !text-[10px]"
									}, "Craftable")) : createCommentVNode("", true),
									product.can_build_with ? (openBlock(), createBlock("span", {
										key: 2,
										class: "chip !bg-purple-500/5 !border-purple-500/20 !text-purple-400 !px-2 !py-0.5 !text-[10px]"
									}, "Resource")) : createCommentVNode("", true)
								])]),
								createVNode("td", { class: "px-6 py-6 text-right" }, [createVNode("div", { class: "flex items-center justify-end gap-3 opacity-40 group-hover:opacity-100 transition-opacity" }, [createVNode(unref(Link), {
									href: _ctx.route("admin.products.edit", product.id),
									class: "w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-stone-400 hover:text-orange-400 hover:border-orange-500/20 transition-all shadow-sm",
									title: "Edit Product"
								}, {
									default: withCtx(() => [(openBlock(), createBlock("svg", {
										class: "w-4 h-4",
										fill: "none",
										viewBox: "0 0 24 24",
										stroke: "currentColor"
									}, [createVNode("path", {
										"stroke-linecap": "round",
										"stroke-linejoin": "round",
										"stroke-width": "2",
										d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
									})]))]),
									_: 1
								}, 8, ["href"]), createVNode("button", {
									onClick: ($event) => deleteProduct(product),
									class: "w-10 h-10 rounded-full border border-white/10 bg-red-500/5 flex items-center justify-center text-stone-400 hover:text-red-400 hover:border-red-500/20 transition-all shadow-sm",
									title: "Delete Product"
								}, [(openBlock(), createBlock("svg", {
									class: "w-4 h-4",
									fill: "none",
									viewBox: "0 0 24 24",
									stroke: "currentColor"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									"stroke-width": "2",
									d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
								})]))], 8, ["onClick"])])])
							]);
						}), 128)), __props.products.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [createVNode("td", {
							colspan: "5",
							class: "px-6 py-20 text-center"
						}, [createVNode("div", { class: "flex flex-col items-center" }, [
							createVNode("div", { class: "w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-4 flex items-center justify-center" }, [(openBlock(), createBlock("svg", {
								class: "w-8 h-8 text-stone-600",
								fill: "none",
								viewBox: "0 0 24 24",
								stroke: "currentColor"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "2",
								d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
							})]))]),
							createVNode("h3", { class: "text-lg font-bold text-stone-100" }, "Zero products found"),
							createVNode("p", { class: "text-stone-500 mt-1 max-w-[200px]" }, "Begin your catalog by adding your first item."),
							createVNode(unref(Link), {
								href: _ctx.route("admin.products.create"),
								class: "fire-button !px-6 !py-2 text-xs mt-6"
							}, {
								default: withCtx(() => [createTextVNode("Initialize Catalog")]),
								_: 1
							}, 8, ["href"])
						])])])) : createCommentVNode("", true)])])])]),
						createVNode("div", { class: "flex items-center justify-between px-2" }, [createVNode("div", { class: "text-xs text-stone-500 font-medium" }, [
							createTextVNode("Showing "),
							createVNode("span", { class: "text-stone-200" }, toDisplayString(__props.products.length), 1),
							createTextVNode(" results")
						]), createVNode("div", { class: "flex gap-2" }, [createVNode("button", {
							disabled: "",
							class: "ghost-button !px-3 !py-2 !text-[10px] opacity-30 cursor-not-allowed"
						}, "Previous"), createVNode("button", { class: "ghost-button !px-3 !py-2 !text-[10px]" }, "Next")])])
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Products/Index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
