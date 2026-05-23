import { t as Logo_default } from "./Logo-CXM_9hti.js";
import { Link } from "@inertiajs/vue3";
import { createVNode, mergeProps, unref, useSSRContext, withCtx } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
//#region resources/js/Layouts/GuestLayout.vue
var _sfc_main = {
	__name: "GuestLayout",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "site-shell min-h-screen flex flex-col items-center justify-center px-4" }, _attrs))}><div class="mesh-bg absolute inset-0 opacity-70"></div><div class="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.28),transparent_55%)]"></div><div class="relative w-full max-w-md">`);
			_push(ssrRenderComponent(unref(Link), {
				href: "/",
				class: "flex flex-col items-center gap-2 mb-8"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(Logo_default, null, null, _parent, _scopeId));
						_push(`<p class="font-display text-2xl uppercase tracking-[0.18em] text-stone-50"${_scopeId}> Coder&#39;s Hot Sauce </p><p class="text-xs uppercase tracking-[0.28em] text-stone-400"${_scopeId}>User Access</p>`);
					} else return [
						createVNode(Logo_default),
						createVNode("p", { class: "font-display text-2xl uppercase tracking-[0.18em] text-stone-50" }, " Coder's Hot Sauce "),
						createVNode("p", { class: "text-xs uppercase tracking-[0.28em] text-stone-400" }, "User Access")
					];
				}),
				_: 1
			}, _parent));
			_push(`<div class="rounded-[1.8rem] border border-white/10 bg-black/40 px-8 py-8 shadow-[0_8px_40px_rgba(0,0,0,0.6)] backdrop-blur-sm">`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div></div></div>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/GuestLayout.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as t };
