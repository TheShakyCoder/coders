import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-jrA-gPFe.js";
import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
//#region resources/js/Components/Logo.vue
var _sfc_main = {
	__name: "Logo",
	__ssrInlineRender: true,
	props: { class: String },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-0" }, _attrs))} data-v-78d142dc><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" class="w-20 h-20 drop-shadow-lg overflow-visible" fill="none" data-v-78d142dc><g class="flame-group" data-v-78d142dc><path d="M20 21C20 15 23 14 25 14C27 14 29 15 29 21C29 28 23 32 20 35C17 32 17 28 17 21" fill="#ef4444" opacity="0.4" class="flame-layer-1" data-v-78d142dc></path><path d="M20 23C20 18 22.5 17 24 17C25.5 17 27 18 27 23C27 28 22.5 30 20 32C17.5 30 17.5 28 17.5 23" fill="#f97316" class="flame-layer-2" data-v-78d142dc></path><path d="M20 25C20 21 21.5 21 22.5 21C23.5 21 25 21 25 25C25 28 22.5 29 20 31C17.5 29 17.5 28 17.5 25" fill="#fde047" class="flame-layer-3" data-v-78d142dc></path></g></svg></div>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Logo.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Logo_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main, [["__scopeId", "data-v-78d142dc"]]);
//#endregion
export { Logo_default as t };
