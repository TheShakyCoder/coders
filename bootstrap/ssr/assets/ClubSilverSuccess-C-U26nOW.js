import { t as formatDate } from "./formatting-DuoLLN1c.js";
import { Head, Link } from "@inertiajs/vue3";
import { createTextVNode, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
//#region resources/js/Pages/ClubSilverSuccess.vue
var _sfc_main = {
	__name: "ClubSilverSuccess",
	__ssrInlineRender: true,
	props: { member: {
		type: Object,
		default: null
	} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(Head), { title: "Club Silver" }, null, _parent));
			_push(`<div class="site-shell"><div class="mesh-bg absolute inset-0 opacity-70"></div><div class="relative mx-auto flex min-h-screen max-w-4xl items-center px-6 py-16"><div class="glow-panel rounded-[2rem] w-full p-8 sm:p-12"><p class="section-label">Club Silver</p><h1 class="mt-4 font-display text-6xl uppercase tracking-[0.08em] text-stone-50 sm:text-7xl"> UK delivery unlocked. </h1><p class="mt-6 max-w-2xl text-lg leading-8 text-stone-300"> Your Club Silver membership is on the way. While it is active, UK delivery drops to free at checkout. </p><div class="mt-10 grid gap-4 sm:grid-cols-2"><div class="rounded-[1.6rem] border border-white/10 bg-black/30 p-6"><p class="text-xs uppercase tracking-[0.24em] text-stone-500">Member</p><p class="mt-3 font-display text-4xl uppercase tracking-[0.08em] text-stone-50">${ssrInterpolate(__props.member?.name || "Signed-in user")}</p></div><div class="rounded-[1.6rem] border border-white/10 bg-black/30 p-6"><p class="text-xs uppercase tracking-[0.24em] text-stone-500">Free delivery until</p><p class="mt-3 text-3xl font-semibold text-stone-50">${ssrInterpolate(unref(formatDate)(__props.member?.club_silver_ends_at))}</p></div></div><div class="mt-10 flex flex-col gap-3 sm:flex-row">`);
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
					if (_push) _push(` Review benefits `);
					else return [createTextVNode(" Review benefits ")];
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/ClubSilverSuccess.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
