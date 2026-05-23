import "./PrimaryButton-BOYYCJ_Z.js";
import { n as _sfc_main$2, r as _sfc_main$4, t as _sfc_main$3 } from "./TextInput-8hESjwRU.js";
import { t as _sfc_main$5 } from "./Checkbox-DbI-LCWg.js";
import { useForm } from "@inertiajs/vue3";
import { createTextVNode, mergeProps, onMounted, ref, resolveComponent, unref, useModel, useSSRContext, withCtx } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent } from "vue/server-renderer";
//#region resources/js/Components/TextArea.vue
var _sfc_main$1 = {
	__name: "TextArea",
	__ssrInlineRender: true,
	props: {
		"modelValue": {
			type: String,
			required: true
		},
		"modelModifiers": {}
	},
	emits: ["update:modelValue"],
	setup(__props, { expose: __expose }) {
		const model = useModel(__props, "modelValue");
		const input = ref(null);
		onMounted(() => {
			if (input.value.hasAttribute("autofocus")) input.value.focus();
		});
		__expose({ focus: () => input.value.focus() });
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<textarea${ssrRenderAttrs(mergeProps({
				class: "rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600",
				ref_key: "input",
				ref: input
			}, _attrs), "textarea")}>${ssrInterpolate(model.value)}</textarea>`);
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/TextArea.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Admin/Products/Partials/ProductForm.vue
var _sfc_main = {
	__name: "ProductForm",
	__ssrInlineRender: true,
	props: {
		product: {
			type: Object,
			default: () => ({
				name: "",
				description: "",
				unit: "",
				price_amount: 0,
				can_sell: false,
				can_build_with: false,
				can_be_built: false,
				stripe_product_id: "",
				class: ""
			})
		},
		isEditing: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		const props = __props;
		const form = useForm({
			name: props.product.name,
			description: props.product.description || "",
			unit: props.product.unit,
			price_amount: props.product.price_amount,
			can_sell: !!props.product.can_sell,
			can_build_with: !!props.product.can_build_with,
			can_be_built: !!props.product.can_be_built,
			stripe_product_id: props.product.stripe_product_id || "",
			class: props.product.class || ""
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Link = resolveComponent("Link");
			_push(`<form${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="glow-panel rounded-[2rem] p-6 space-y-6"><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="space-y-4"><h3 class="text-lg font-medium text-stone-200">Basic Information</h3><div>`);
			_push(ssrRenderComponent(_sfc_main$2, {
				for: "name",
				value: "Product Name"
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$3, {
				id: "name",
				type: "text",
				class: "mt-1 block w-full",
				modelValue: unref(form).name,
				"onUpdate:modelValue": ($event) => unref(form).name = $event,
				required: "",
				autofocus: ""
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$4, {
				class: "mt-2",
				message: unref(form).errors.name
			}, null, _parent));
			_push(`</div><div>`);
			_push(ssrRenderComponent(_sfc_main$2, {
				for: "unit",
				value: "Unit (e.g., kg, unit, liter)"
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$3, {
				id: "unit",
				type: "text",
				class: "mt-1 block w-full",
				modelValue: unref(form).unit,
				"onUpdate:modelValue": ($event) => unref(form).unit = $event,
				required: ""
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$4, {
				class: "mt-2",
				message: unref(form).errors.unit
			}, null, _parent));
			_push(`</div><div>`);
			_push(ssrRenderComponent(_sfc_main$2, {
				for: "class",
				value: "Class / Category"
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$3, {
				id: "class",
				type: "text",
				class: "mt-1 block w-full",
				modelValue: unref(form).class,
				"onUpdate:modelValue": ($event) => unref(form).class = $event
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$4, {
				class: "mt-2",
				message: unref(form).errors.class
			}, null, _parent));
			_push(`</div></div><div class="space-y-4"><h3 class="text-lg font-medium text-stone-200">Pricing &amp; Capabilities</h3><div>`);
			_push(ssrRenderComponent(_sfc_main$2, {
				for: "price_amount",
				value: "Price Amount (in cents)"
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$3, {
				id: "price_amount",
				type: "number",
				class: "mt-1 block w-full",
				modelValue: unref(form).price_amount,
				"onUpdate:modelValue": ($event) => unref(form).price_amount = $event,
				required: ""
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$4, {
				class: "mt-2",
				message: unref(form).errors.price_amount
			}, null, _parent));
			_push(`</div><div class="space-y-3 pt-2"><label class="flex items-center cursor-pointer group">`);
			_push(ssrRenderComponent(_sfc_main$5, {
				name: "can_sell",
				checked: unref(form).can_sell,
				"onUpdate:checked": ($event) => unref(form).can_sell = $event
			}, null, _parent));
			_push(`<span class="ms-2 text-sm text-stone-400 group-hover:text-stone-200 transition-colors">Available on Market</span></label><label class="flex items-center cursor-pointer group">`);
			_push(ssrRenderComponent(_sfc_main$5, {
				name: "can_build_with",
				checked: unref(form).can_build_with,
				"onUpdate:checked": ($event) => unref(form).can_build_with = $event
			}, null, _parent));
			_push(`<span class="ms-2 text-sm text-stone-400 group-hover:text-stone-200 transition-colors">Can be used as a resource</span></label><label class="flex items-center cursor-pointer group">`);
			_push(ssrRenderComponent(_sfc_main$5, {
				name: "can_be_built",
				checked: unref(form).can_be_built,
				"onUpdate:checked": ($event) => unref(form).can_be_built = $event
			}, null, _parent));
			_push(`<span class="ms-2 text-sm text-stone-400 group-hover:text-stone-200 transition-colors">Can be crafted/built</span></label></div><div class="mt-4">`);
			_push(ssrRenderComponent(_sfc_main$2, {
				for: "stripe_product_id",
				value: "Stripe Product ID"
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$3, {
				id: "stripe_product_id",
				type: "text",
				class: "mt-1 block w-full",
				modelValue: unref(form).stripe_product_id,
				"onUpdate:modelValue": ($event) => unref(form).stripe_product_id = $event
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$4, {
				class: "mt-2",
				message: unref(form).errors.stripe_product_id
			}, null, _parent));
			_push(`</div></div></div><div class="pt-4 border-t border-stone-800">`);
			_push(ssrRenderComponent(_sfc_main$2, {
				for: "description",
				value: "Description"
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$1, {
				id: "description",
				class: "mt-1 block w-full h-32",
				modelValue: unref(form).description,
				"onUpdate:modelValue": ($event) => unref(form).description = $event
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$4, {
				class: "mt-2",
				message: unref(form).errors.description
			}, null, _parent));
			_push(`</div><div class="flex items-center justify-end gap-4">`);
			_push(ssrRenderComponent(_component_Link, {
				href: _ctx.route("admin.products.index"),
				class: "ghost-button"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Cancel `);
					else return [createTextVNode(" Cancel ")];
				}),
				_: 1
			}, _parent));
			_push(`<button type="submit" class="${ssrRenderClass([{ "opacity-25": unref(form).processing }, "fire-button px-8 py-2"])}"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}>${ssrInterpolate(__props.isEditing ? "Update Product" : "Create Product")}</button></div></div></form>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Products/Partials/ProductForm.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
