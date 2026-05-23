import { Head, Link } from "@inertiajs/vue3";
import { createTextVNode, unref, useSSRContext, withCtx } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
//#region resources/js/Pages/ClubSilverCancel.vue
var _sfc_main = {
	__name: "ClubSilverCancel",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Club Silver" }, null, _parent));
			_push(`<div class="site-shell"><div class="mesh-bg absolute inset-0 opacity-70"></div><div class="relative mx-auto flex min-h-screen max-w-4xl items-center px-6 py-16"><div class="glow-panel rounded-[2rem] w-full p-8 sm:p-12"><p class="section-label">Club Silver</p><h1 class="mt-4 font-display text-6xl uppercase tracking-[0.08em] text-stone-50 sm:text-7xl"> Membership not started. </h1><p class="mt-6 max-w-2xl text-lg leading-8 text-stone-300"> Club Silver checkout was canceled. Delivery will stay at the standard £4 UK rate until a membership is completed. </p><div class="mt-10 flex flex-col gap-3 sm:flex-row">`);
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
				href: `${_ctx.route("home")}#club-silver`,
				class: "ghost-button text-center"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` View Club Silver `);
					else return [createTextVNode(" View Club Silver ")];
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/ClubSilverCancel.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
