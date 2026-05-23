import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-jrA-gPFe.js";
import { Link, usePage } from "@inertiajs/vue3";
import { computed, createBlock, createCommentVNode, createTextVNode, createVNode, mergeProps, onMounted, onUnmounted, openBlock, ref, renderSlot, toDisplayString, unref, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderSlot, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/Components/ApplicationLogo.vue
var _sfc_main$3 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	_push(`<svg${ssrRenderAttrs(mergeProps({
		viewBox: "0 0 316 316",
		xmlns: "http://www.w3.org/2000/svg"
	}, _attrs))}><path d="M305.8 81.125C305.77 80.995 305.69 80.885 305.65 80.755C305.56 80.525 305.49 80.285 305.37 80.075C305.29 79.935 305.17 79.815 305.07 79.685C304.94 79.515 304.83 79.325 304.68 79.175C304.55 79.045 304.39 78.955 304.25 78.845C304.09 78.715 303.95 78.575 303.77 78.475L251.32 48.275C249.97 47.495 248.31 47.495 246.96 48.275L194.51 78.475C194.33 78.575 194.19 78.725 194.03 78.845C193.89 78.955 193.73 79.045 193.6 79.175C193.45 79.325 193.34 79.515 193.21 79.685C193.11 79.815 192.99 79.935 192.91 80.075C192.79 80.285 192.71 80.525 192.63 80.755C192.58 80.875 192.51 80.995 192.48 81.125C192.38 81.495 192.33 81.875 192.33 82.265V139.625L148.62 164.795V52.575C148.62 52.185 148.57 51.805 148.47 51.435C148.44 51.305 148.36 51.195 148.32 51.065C148.23 50.835 148.16 50.595 148.04 50.385C147.96 50.245 147.84 50.125 147.74 49.995C147.61 49.825 147.5 49.635 147.35 49.485C147.22 49.355 147.06 49.265 146.92 49.155C146.76 49.025 146.62 48.885 146.44 48.785L93.99 18.585C92.64 17.805 90.98 17.805 89.63 18.585L37.18 48.785C37 48.885 36.86 49.035 36.7 49.155C36.56 49.265 36.4 49.355 36.27 49.485C36.12 49.635 36.01 49.825 35.88 49.995C35.78 50.125 35.66 50.245 35.58 50.385C35.46 50.595 35.38 50.835 35.3 51.065C35.25 51.185 35.18 51.305 35.15 51.435C35.05 51.805 35 52.185 35 52.575V232.235C35 233.795 35.84 235.245 37.19 236.025L142.1 296.425C142.33 296.555 142.58 296.635 142.82 296.725C142.93 296.765 143.04 296.835 143.16 296.865C143.53 296.965 143.9 297.015 144.28 297.015C144.66 297.015 145.03 296.965 145.4 296.865C145.5 296.835 145.59 296.775 145.69 296.745C145.95 296.655 146.21 296.565 146.45 296.435L251.36 236.035C252.72 235.255 253.55 233.815 253.55 232.245V174.885L303.81 145.945C305.17 145.165 306 143.725 306 142.155V82.265C305.95 81.875 305.89 81.495 305.8 81.125ZM144.2 227.205L100.57 202.515L146.39 176.135L196.66 147.195L240.33 172.335L208.29 190.625L144.2 227.205ZM244.75 114.995V164.795L226.39 154.225L201.03 139.625V89.825L219.39 100.395L244.75 114.995ZM249.12 57.105L292.81 82.265L249.12 107.425L205.43 82.265L249.12 57.105ZM114.49 184.425L96.13 194.995V85.305L121.49 70.705L139.85 60.135V169.815L114.49 184.425ZM91.76 27.425L135.45 52.585L91.76 77.745L48.07 52.585L91.76 27.425ZM43.67 60.135L62.03 70.705L87.39 85.305V202.545V202.555V202.565C87.39 202.735 87.44 202.895 87.46 203.055C87.49 203.265 87.49 203.485 87.55 203.695V203.705C87.6 203.875 87.69 204.035 87.76 204.195C87.84 204.375 87.89 204.575 87.99 204.745C87.99 204.745 87.99 204.755 88 204.755C88.09 204.905 88.22 205.035 88.33 205.175C88.45 205.335 88.55 205.495 88.69 205.635L88.7 205.645C88.82 205.765 88.98 205.855 89.12 205.965C89.28 206.085 89.42 206.225 89.59 206.325C89.6 206.325 89.6 206.325 89.61 206.335C89.62 206.335 89.62 206.345 89.63 206.345L139.87 234.775V285.065L43.67 229.705V60.135ZM244.75 229.705L148.58 285.075V234.775L219.8 194.115L244.75 179.875V229.705ZM297.2 139.625L253.49 164.795V114.995L278.85 100.395L297.21 89.825V139.625H297.2Z"></path></svg>`);
}
var _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ApplicationLogo.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var ApplicationLogo_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main$3, [["ssrRender", _sfc_ssrRender]]);
//#endregion
//#region resources/js/Components/Dropdown.vue
var _sfc_main$2 = {
	__name: "Dropdown",
	__ssrInlineRender: true,
	props: {
		align: {
			type: String,
			default: "right"
		},
		width: {
			type: String,
			default: "48"
		},
		contentClasses: {
			type: String,
			default: "py-1 bg-white dark:bg-gray-700"
		}
	},
	setup(__props) {
		const props = __props;
		const closeOnEscape = (e) => {
			if (open.value && e.key === "Escape") open.value = false;
		};
		onMounted(() => document.addEventListener("keydown", closeOnEscape));
		onUnmounted(() => document.removeEventListener("keydown", closeOnEscape));
		const widthClass = computed(() => {
			return { 48: "w-48" }[props.width.toString()];
		});
		const alignmentClasses = computed(() => {
			if (props.align === "left") return "ltr:origin-top-left rtl:origin-top-right start-0";
			else if (props.align === "right") return "ltr:origin-top-right rtl:origin-top-left end-0";
			else return "origin-top";
		});
		const open = ref(false);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}><div>`);
			ssrRenderSlot(_ctx.$slots, "trigger", {}, null, _push, _parent);
			_push(`</div><div class="fixed inset-0 z-40" style="${ssrRenderStyle(open.value ? null : { display: "none" })}"></div><div class="${ssrRenderClass([[widthClass.value, alignmentClasses.value], "absolute z-50 mt-2 rounded-md shadow-lg"])}" style="${ssrRenderStyle([{ "display": "none" }, open.value ? null : { display: "none" }])}"><div class="${ssrRenderClass([__props.contentClasses, "rounded-md ring-1 ring-black ring-opacity-5"])}">`);
			ssrRenderSlot(_ctx.$slots, "content", {}, null, _push, _parent);
			_push(`</div></div></div>`);
		};
	}
};
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Dropdown.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/DropdownLink.vue
var _sfc_main$1 = {
	__name: "DropdownLink",
	__ssrInlineRender: true,
	props: { href: {
		type: String,
		required: true
	} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Link), mergeProps({
				href: __props.href,
				class: "block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DropdownLink.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Layouts/AdminLayout.vue
var _sfc_main = {
	__name: "AdminLayout",
	__ssrInlineRender: true,
	setup(__props) {
		ref(false);
		usePage();
		const navigation = [{
			name: "Dashboard",
			href: route("admin.dashboard"),
			icon: "dashboard",
			active: route().current("admin.dashboard")
		}, {
			name: "Products",
			href: route("admin.products.index"),
			icon: "products",
			active: route().current("admin.products.*")
		}];
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen site-shell" }, _attrs))} data-v-4ba90883><div class="fixed inset-0 mesh-bg opacity-30 pointer-events-none" data-v-4ba90883></div><aside class="fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300 lg:translate-x-0 border-r border-white/10 bg-white/[0.02] backdrop-blur-xl" data-v-4ba90883><div class="flex flex-col h-full" data-v-4ba90883><div class="flex items-center h-20 px-6 border-b border-white/10" data-v-4ba90883>`);
			_push(ssrRenderComponent(unref(Link), {
				href: _ctx.route("home"),
				class: "flex items-center gap-3"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(ApplicationLogo_default, { class: "w-8 h-8 fill-orange-500" }, null, _parent, _scopeId));
						_push(`<span class="text-xl font-bold tracking-wider uppercase text-stone-100" data-v-4ba90883${_scopeId}>Coders<span class="text-orange-500" data-v-4ba90883${_scopeId}>.</span></span>`);
					} else return [createVNode(ApplicationLogo_default, { class: "w-8 h-8 fill-orange-500" }), createVNode("span", { class: "text-xl font-bold tracking-wider uppercase text-stone-100" }, [createTextVNode("Coders"), createVNode("span", { class: "text-orange-500" }, ".")])];
				}),
				_: 1
			}, _parent));
			_push(`</div><nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto" data-v-4ba90883><!--[-->`);
			ssrRenderList(navigation, (item) => {
				_push(ssrRenderComponent(unref(Link), {
					href: item.href,
					class: [item.active ? "bg-orange-500/10 text-orange-400 border-orange-500/50" : "text-stone-400 hover:text-stone-100 hover:bg-white/5 border-transparent", "flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 border rounded-2xl group"]
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							if (item.icon === "dashboard") _push(`<span class="mr-3" data-v-4ba90883${_scopeId}><svg class="w-5 h-5 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-4ba90883${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" data-v-4ba90883${_scopeId}></path></svg></span>`);
							else _push(`<!---->`);
							if (item.icon === "products") _push(`<span class="mr-3" data-v-4ba90883${_scopeId}><svg class="w-5 h-5 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-4ba90883${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" data-v-4ba90883${_scopeId}></path></svg></span>`);
							else _push(`<!---->`);
							_push(` ${ssrInterpolate(item.name)}`);
						} else return [
							item.icon === "dashboard" ? (openBlock(), createBlock("span", {
								key: 0,
								class: "mr-3"
							}, [(openBlock(), createBlock("svg", {
								class: "w-5 h-5 transition-colors",
								fill: "none",
								viewBox: "0 0 24 24",
								stroke: "currentColor"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "2",
								d: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
							})]))])) : createCommentVNode("", true),
							item.icon === "products" ? (openBlock(), createBlock("span", {
								key: 1,
								class: "mr-3"
							}, [(openBlock(), createBlock("svg", {
								class: "w-5 h-5 transition-colors",
								fill: "none",
								viewBox: "0 0 24 24",
								stroke: "currentColor"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								"stroke-width": "2",
								d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
							})]))])) : createCommentVNode("", true),
							createTextVNode(" " + toDisplayString(item.name), 1)
						];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]--></nav><div class="p-4 border-t border-white/10" data-v-4ba90883><div class="relative" data-v-4ba90883>`);
			_push(ssrRenderComponent(_sfc_main$2, {
				align: "top",
				width: "48"
			}, {
				trigger: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<button class="flex items-center w-full gap-3 p-2 text-sm transition-colors rounded-2xl hover:bg-white/5 group" data-v-4ba90883${_scopeId}><div class="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500/20 text-orange-400 font-bold border border-orange-500/30" data-v-4ba90883${_scopeId}>${ssrInterpolate(_ctx.$page.props.auth.user.name.charAt(0))}</div><div class="flex-1 text-left" data-v-4ba90883${_scopeId}><div class="font-medium text-stone-100 truncate" data-v-4ba90883${_scopeId}>${ssrInterpolate(_ctx.$page.props.auth.user.name)}</div><div class="text-xs text-stone-500 truncate" data-v-4ba90883${_scopeId}>Administrator</div></div><svg class="w-4 h-4 text-stone-500 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-4ba90883${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-4ba90883${_scopeId}></path></svg></button>`);
					else return [createVNode("button", { class: "flex items-center w-full gap-3 p-2 text-sm transition-colors rounded-2xl hover:bg-white/5 group" }, [
						createVNode("div", { class: "flex items-center justify-center w-10 h-10 rounded-full bg-orange-500/20 text-orange-400 font-bold border border-orange-500/30" }, toDisplayString(_ctx.$page.props.auth.user.name.charAt(0)), 1),
						createVNode("div", { class: "flex-1 text-left" }, [createVNode("div", { class: "font-medium text-stone-100 truncate" }, toDisplayString(_ctx.$page.props.auth.user.name), 1), createVNode("div", { class: "text-xs text-stone-500 truncate" }, "Administrator")]),
						(openBlock(), createBlock("svg", {
							class: "w-4 h-4 text-stone-500 rotate-180",
							fill: "none",
							viewBox: "0 0 24 24",
							stroke: "currentColor"
						}, [createVNode("path", {
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							"stroke-width": "2",
							d: "M19 9l-7 7-7-7"
						})]))
					])];
				}),
				content: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="px-4 py-2 text-xs text-stone-500 border-b border-white/10" data-v-4ba90883${_scopeId}>Manage Account</div>`);
						_push(ssrRenderComponent(_sfc_main$1, { href: _ctx.route("profile.edit") }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Profile `);
								else return [createTextVNode(" Profile ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$1, {
							href: _ctx.route("logout"),
							method: "post",
							as: "button"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Log Out `);
								else return [createTextVNode(" Log Out ")];
							}),
							_: 1
						}, _parent, _scopeId));
					} else return [
						createVNode("div", { class: "px-4 py-2 text-xs text-stone-500 border-b border-white/10" }, "Manage Account"),
						createVNode(_sfc_main$1, { href: _ctx.route("profile.edit") }, {
							default: withCtx(() => [createTextVNode(" Profile ")]),
							_: 1
						}, 8, ["href"]),
						createVNode(_sfc_main$1, {
							href: _ctx.route("logout"),
							method: "post",
							as: "button"
						}, {
							default: withCtx(() => [createTextVNode(" Log Out ")]),
							_: 1
						}, 8, ["href"])
					];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></div></aside><main class="lg:pl-64 flex flex-col min-h-screen" data-v-4ba90883><header class="sticky top-0 z-40 flex items-center justify-between h-20 px-6 lg:px-10 bg-stone-950/50 backdrop-blur-md border-b border-white/10 lg:hidden" data-v-4ba90883>`);
			_push(ssrRenderComponent(unref(Link), {
				href: _ctx.route("home"),
				class: "flex items-center gap-3"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(ApplicationLogo_default, { class: "w-8 h-8 fill-orange-500" }, null, _parent, _scopeId));
					else return [createVNode(ApplicationLogo_default, { class: "w-8 h-8 fill-orange-500" })];
				}),
				_: 1
			}, _parent));
			_push(`<button class="p-2 text-stone-400 hover:text-stone-100" data-v-4ba90883><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-4ba90883><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-4ba90883></path></svg></button></header><div class="flex-1 py-10 px-6 lg:px-10 max-w-[1600px] mx-auto w-full" data-v-4ba90883>`);
			if (_ctx.$slots.header) {
				_push(`<div class="mb-10" data-v-4ba90883>`);
				ssrRenderSlot(_ctx.$slots, "header", {}, null, _push, _parent);
				_push(`</div>`);
			} else _push(`<!---->`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div><footer class="px-6 py-6 lg:px-10 border-t border-white/5 text-stone-500 text-sm text-center lg:text-left" data-v-4ba90883> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Coders Administration. All rights reserved. </footer></main></div>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AdminLayout.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var AdminLayout_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main, [["__scopeId", "data-v-4ba90883"]]);
//#endregion
export { AdminLayout_default as t };
