import { t as AdminLayout_default } from "./AdminLayout-BfLn1rHy.js";
import _sfc_main$1 from "./ProductForm-yHg6hj2D.js";
import { Head, Link } from "@inertiajs/vue3";
import { createBlock, createTextVNode, createVNode, openBlock, unref, useSSRContext, withCtx } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
//#region resources/js/Pages/Admin/Products/Create.vue
var _sfc_main = {
	__name: "Create",
	__ssrInlineRender: true,
	props: {},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Create Product" }, null, _parent));
			_push(ssrRenderComponent(AdminLayout_default, null, {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex items-center gap-4"${_scopeId}>`);
						_push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("admin.products.index"),
							class: "text-stone-400 hover:text-stone-200 transition-colors"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${_scopeId}><path d="m15 18-6-6 6-6"${_scopeId}></path></svg>`);
								else return [(openBlock(), createBlock("svg", {
									xmlns: "http://www.w3.org/2000/svg",
									width: "20",
									height: "20",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									"stroke-width": "2",
									"stroke-linecap": "round",
									"stroke-linejoin": "round"
								}, [createVNode("path", { d: "m15 18-6-6 6-6" })]))];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`<h2 class="font-bold text-2xl text-stone-100 uppercase tracking-tighter"${_scopeId}> Add <span class="text-orange-500"${_scopeId}>New Product</span></h2></div>`);
					} else return [createVNode("div", { class: "flex items-center gap-4" }, [createVNode(unref(Link), {
						href: _ctx.route("admin.products.index"),
						class: "text-stone-400 hover:text-stone-200 transition-colors"
					}, {
						default: withCtx(() => [(openBlock(), createBlock("svg", {
							xmlns: "http://www.w3.org/2000/svg",
							width: "20",
							height: "20",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							"stroke-width": "2",
							"stroke-linecap": "round",
							"stroke-linejoin": "round"
						}, [createVNode("path", { d: "m15 18-6-6 6-6" })]))]),
						_: 1
					}, 8, ["href"]), createVNode("h2", { class: "font-bold text-2xl text-stone-100 uppercase tracking-tighter" }, [createTextVNode(" Add "), createVNode("span", { class: "text-orange-500" }, "New Product")])])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="max-w-4xl mx-auto py-8"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$1, null, null, _parent, _scopeId));
						_push(`</div>`);
					} else return [createVNode("div", { class: "max-w-4xl mx-auto py-8" }, [createVNode(_sfc_main$1)])];
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Products/Create.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
