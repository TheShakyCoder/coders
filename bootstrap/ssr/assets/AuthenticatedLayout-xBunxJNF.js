import { t as Logo_default } from "./Logo-CXM_9hti.js";
import { Link, usePage } from "@inertiajs/vue3";
import { createTextVNode, createVNode, mergeProps, ref, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
//#region resources/js/Layouts/AuthenticatedLayout.vue
var _sfc_main = {
	__name: "AuthenticatedLayout",
	__ssrInlineRender: true,
	setup(__props) {
		const showingNavigationDropdown = ref(false);
		const page = usePage();
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "site-shell min-h-screen" }, _attrs))}><div class="mesh-bg absolute inset-0 opacity-70"></div><div class="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.2),transparent_55%)]"></div><div class="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"><header class="glow-panel rounded-none sm:rounded-[2rem] flex items-center justify-between px-5 py-4 mt-0 sm:mt-6">`);
			_push(ssrRenderComponent(unref(Link), {
				href: _ctx.route("dashboard"),
				class: "flex items-center gap-4"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex h-12 w-12 items-center justify-center rounded-2xl"${_scopeId}>`);
						_push(ssrRenderComponent(Logo_default, null, null, _parent, _scopeId));
						_push(`</div><div${_scopeId}><p class="font-display text-2xl uppercase tracking-[0.16em] text-stone-50"${_scopeId}>Coder&#39;s Hot Sauce</p><p class="text-xs uppercase tracking-[0.28em] text-stone-400"${_scopeId}>Dashboard</p></div>`);
					} else return [createVNode("div", { class: "flex h-12 w-12 items-center justify-center rounded-2xl" }, [createVNode(Logo_default)]), createVNode("div", null, [createVNode("p", { class: "font-display text-2xl uppercase tracking-[0.16em] text-stone-50" }, "Coder's Hot Sauce"), createVNode("p", { class: "text-xs uppercase tracking-[0.28em] text-stone-400" }, "Dashboard")])];
				}),
				_: 1
			}, _parent));
			_push(`<nav class="hidden items-center gap-6 text-sm uppercase tracking-[0.22em] text-stone-300 sm:flex">`);
			_push(ssrRenderComponent(unref(Link), {
				href: _ctx.route("dashboard"),
				class: ["transition hover:text-orange-300", _ctx.route().current("dashboard") ? "text-orange-300" : ""]
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Overview `);
					else return [createTextVNode(" Overview ")];
				}),
				_: 1
			}, _parent));
			if (unref(page).props.auth.user?.is_admin) _push(ssrRenderComponent(unref(Link), {
				href: _ctx.route("admin.dashboard"),
				class: ["transition hover:text-orange-300", _ctx.route().current("admin.*") ? "text-orange-300" : ""]
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Admin `);
					else return [createTextVNode(" Admin ")];
				}),
				_: 1
			}, _parent));
			else _push(`<!---->`);
			_push(ssrRenderComponent(unref(Link), {
				href: _ctx.route("home"),
				class: "transition hover:text-orange-300"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Store `);
					else return [createTextVNode(" Store ")];
				}),
				_: 1
			}, _parent));
			_push(`<div class="relative"><button class="ghost-button flex items-center gap-2 px-4 py-2">${ssrInterpolate(unref(page).props.auth.user.name)} <svg class="h-3 w-3 opacity-60" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>`);
			if (showingNavigationDropdown.value) {
				_push(`<div class="absolute right-0 mt-2 w-48 rounded-2xl border border-white/10 bg-stone-900/95 py-2 shadow-xl backdrop-blur-sm z-50">`);
				_push(ssrRenderComponent(unref(Link), {
					href: _ctx.route("profile.edit"),
					class: "block px-4 py-2 text-sm text-stone-300 hover:text-orange-300 transition-colors"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` Profile `);
						else return [createTextVNode(" Profile ")];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(unref(Link), {
					href: _ctx.route("logout"),
					method: "post",
					as: "button",
					class: "block w-full text-left px-4 py-2 text-sm text-stone-300 hover:text-orange-300 transition-colors"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` Log Out `);
						else return [createTextVNode(" Log Out ")];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`</div></nav><button class="sm:hidden p-2 text-stone-400 hover:text-stone-200"><svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">`);
			if (!showingNavigationDropdown.value) _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>`);
			else _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>`);
			_push(`</svg></button></header>`);
			if (showingNavigationDropdown.value) {
				_push(`<div class="sm:hidden mt-2 rounded-2xl border border-white/10 bg-stone-900/95 px-4 py-4 space-y-3 backdrop-blur-sm"><p class="text-xs uppercase tracking-[0.22em] text-stone-500 pb-2 border-b border-white/5">${ssrInterpolate(unref(page).props.auth.user.name)} · ${ssrInterpolate(unref(page).props.auth.user.email)}</p>`);
				_push(ssrRenderComponent(unref(Link), {
					href: _ctx.route("dashboard"),
					class: "block text-sm uppercase tracking-[0.18em] text-stone-300 hover:text-orange-300 transition-colors"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Overview`);
						else return [createTextVNode("Overview")];
					}),
					_: 1
				}, _parent));
				if (unref(page).props.auth.user?.is_admin) _push(ssrRenderComponent(unref(Link), {
					href: _ctx.route("admin.dashboard"),
					class: "block text-sm uppercase tracking-[0.18em] text-stone-300 hover:text-orange-300 transition-colors"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Admin`);
						else return [createTextVNode("Admin")];
					}),
					_: 1
				}, _parent));
				else _push(`<!---->`);
				_push(ssrRenderComponent(unref(Link), {
					href: _ctx.route("home"),
					class: "block text-sm uppercase tracking-[0.18em] text-stone-300 hover:text-orange-300 transition-colors"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Store`);
						else return [createTextVNode("Store")];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(unref(Link), {
					href: _ctx.route("profile.edit"),
					class: "block text-sm uppercase tracking-[0.18em] text-stone-300 hover:text-orange-300 transition-colors"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Profile`);
						else return [createTextVNode("Profile")];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(unref(Link), {
					href: _ctx.route("logout"),
					method: "post",
					as: "button",
					class: "block text-sm uppercase tracking-[0.18em] text-stone-300 hover:text-orange-300 transition-colors"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Log Out`);
						else return [createTextVNode("Log Out")];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else _push(`<!---->`);
			if (_ctx.$slots.header) {
				_push(`<div class="mt-8 px-1">`);
				ssrRenderSlot(_ctx.$slots, "header", {}, null, _push, _parent);
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`<main class="mt-6">`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</main></div></div>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AuthenticatedLayout.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as t };
