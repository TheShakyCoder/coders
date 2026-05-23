import { n as _sfc_main$1, r as _sfc_main$3, t as _sfc_main$2 } from "./TextInput-8hESjwRU.js";
import { t as _sfc_main$4 } from "./Checkbox-DbI-LCWg.js";
import { t as _sfc_main$5 } from "./GuestLayout-C7Xkmvf4.js";
import { Head, Link, useForm } from "@inertiajs/vue3";
import { createBlock, createCommentVNode, createTextVNode, createVNode, openBlock, toDisplayString, unref, useSSRContext, withCtx, withModifiers } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderClass, ssrRenderComponent } from "vue/server-renderer";
//#region resources/js/Pages/Auth/Login.vue
var _sfc_main = {
	__name: "Login",
	__ssrInlineRender: true,
	props: {
		canResetPassword: { type: Boolean },
		status: { type: String }
	},
	setup(__props) {
		const form = useForm({
			email: "",
			password: "",
			remember: false
		});
		const submit = () => {
			form.post(route("login"), { onFinish: () => form.reset("password") });
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$5, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(Head), { title: "Log in" }, null, _parent, _scopeId));
						if (__props.status) _push(`<div class="mb-4 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300"${_scopeId}>${ssrInterpolate(__props.status)}</div>`);
						else _push(`<!---->`);
						_push(`<form class="space-y-5"${_scopeId}><div${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$1, {
							for: "email",
							value: "Email",
							class: "text-stone-400 uppercase tracking-[0.18em] text-xs"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$2, {
							id: "email",
							type: "email",
							class: "mt-2 block w-full rounded-xl border-white/10 bg-white/5 text-stone-100 placeholder-stone-600 focus:border-orange-500/50 focus:ring-orange-500/30",
							modelValue: unref(form).email,
							"onUpdate:modelValue": ($event) => unref(form).email = $event,
							required: "",
							autofocus: "",
							autocomplete: "username"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$3, {
							class: "mt-2",
							message: unref(form).errors.email
						}, null, _parent, _scopeId));
						_push(`</div><div${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$1, {
							for: "password",
							value: "Password",
							class: "text-stone-400 uppercase tracking-[0.18em] text-xs"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$2, {
							id: "password",
							type: "password",
							class: "mt-2 block w-full rounded-xl border-white/10 bg-white/5 text-stone-100 placeholder-stone-600 focus:border-orange-500/50 focus:ring-orange-500/30",
							modelValue: unref(form).password,
							"onUpdate:modelValue": ($event) => unref(form).password = $event,
							required: "",
							autocomplete: "current-password"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$3, {
							class: "mt-2",
							message: unref(form).errors.password
						}, null, _parent, _scopeId));
						_push(`</div><div class="flex items-center justify-between"${_scopeId}><label class="flex items-center gap-2 cursor-pointer"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$4, {
							name: "remember",
							checked: unref(form).remember,
							"onUpdate:checked": ($event) => unref(form).remember = $event
						}, null, _parent, _scopeId));
						_push(`<span class="text-sm text-stone-400"${_scopeId}>Remember me</span></label>`);
						if (__props.canResetPassword) _push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("password.request"),
							class: "text-xs uppercase tracking-[0.18em] text-stone-500 hover:text-orange-300 transition-colors"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Forgot password? `);
								else return [createTextVNode(" Forgot password? ")];
							}),
							_: 1
						}, _parent, _scopeId));
						else _push(`<!---->`);
						_push(`</div><button type="submit" class="${ssrRenderClass([{ "opacity-50 cursor-not-allowed": unref(form).processing }, "fire-button w-full"])}"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(unref(form).processing ? "Signing in…" : "Sign in")}</button><p class="mt-6 text-center text-sm text-stone-500"${_scopeId}> Don&#39;t have an account? `);
						_push(ssrRenderComponent(unref(Link), {
							href: _ctx.route("register"),
							class: "text-orange-400 hover:text-orange-300 transition-colors"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Register `);
								else return [createTextVNode(" Register ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</p></form>`);
					} else return [
						createVNode(unref(Head), { title: "Log in" }),
						__props.status ? (openBlock(), createBlock("div", {
							key: 0,
							class: "mb-4 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300"
						}, toDisplayString(__props.status), 1)) : createCommentVNode("", true),
						createVNode("form", {
							onSubmit: withModifiers(submit, ["prevent"]),
							class: "space-y-5"
						}, [
							createVNode("div", null, [
								createVNode(_sfc_main$1, {
									for: "email",
									value: "Email",
									class: "text-stone-400 uppercase tracking-[0.18em] text-xs"
								}),
								createVNode(_sfc_main$2, {
									id: "email",
									type: "email",
									class: "mt-2 block w-full rounded-xl border-white/10 bg-white/5 text-stone-100 placeholder-stone-600 focus:border-orange-500/50 focus:ring-orange-500/30",
									modelValue: unref(form).email,
									"onUpdate:modelValue": ($event) => unref(form).email = $event,
									required: "",
									autofocus: "",
									autocomplete: "username"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]),
								createVNode(_sfc_main$3, {
									class: "mt-2",
									message: unref(form).errors.email
								}, null, 8, ["message"])
							]),
							createVNode("div", null, [
								createVNode(_sfc_main$1, {
									for: "password",
									value: "Password",
									class: "text-stone-400 uppercase tracking-[0.18em] text-xs"
								}),
								createVNode(_sfc_main$2, {
									id: "password",
									type: "password",
									class: "mt-2 block w-full rounded-xl border-white/10 bg-white/5 text-stone-100 placeholder-stone-600 focus:border-orange-500/50 focus:ring-orange-500/30",
									modelValue: unref(form).password,
									"onUpdate:modelValue": ($event) => unref(form).password = $event,
									required: "",
									autocomplete: "current-password"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]),
								createVNode(_sfc_main$3, {
									class: "mt-2",
									message: unref(form).errors.password
								}, null, 8, ["message"])
							]),
							createVNode("div", { class: "flex items-center justify-between" }, [createVNode("label", { class: "flex items-center gap-2 cursor-pointer" }, [createVNode(_sfc_main$4, {
								name: "remember",
								checked: unref(form).remember,
								"onUpdate:checked": ($event) => unref(form).remember = $event
							}, null, 8, ["checked", "onUpdate:checked"]), createVNode("span", { class: "text-sm text-stone-400" }, "Remember me")]), __props.canResetPassword ? (openBlock(), createBlock(unref(Link), {
								key: 0,
								href: _ctx.route("password.request"),
								class: "text-xs uppercase tracking-[0.18em] text-stone-500 hover:text-orange-300 transition-colors"
							}, {
								default: withCtx(() => [createTextVNode(" Forgot password? ")]),
								_: 1
							}, 8, ["href"])) : createCommentVNode("", true)]),
							createVNode("button", {
								type: "submit",
								class: ["fire-button w-full", { "opacity-50 cursor-not-allowed": unref(form).processing }],
								disabled: unref(form).processing
							}, toDisplayString(unref(form).processing ? "Signing in…" : "Sign in"), 11, ["disabled"]),
							createVNode("p", { class: "mt-6 text-center text-sm text-stone-500" }, [createTextVNode(" Don't have an account? "), createVNode(unref(Link), {
								href: _ctx.route("register"),
								class: "text-orange-400 hover:text-orange-300 transition-colors"
							}, {
								default: withCtx(() => [createTextVNode(" Register ")]),
								_: 1
							}, 8, ["href"])])
						], 32)
					];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
