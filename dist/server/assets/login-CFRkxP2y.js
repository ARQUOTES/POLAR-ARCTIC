import { n as SiteShell } from "./site-shell-B7diJaeh.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { LockKeyhole, Snowflake } from "lucide-react";
//#region src/routes/login.tsx?tsr-split=component
function LoginPage() {
	return /* @__PURE__ */ jsx(SiteShell, { children: /* @__PURE__ */ jsx("section", {
		className: "grid min-h-[calc(100vh-16rem)] place-items-center bg-ice/30 px-5 py-16",
		children: /* @__PURE__ */ jsxs("div", {
			className: "w-full max-w-md border border-border bg-card p-7 shadow-sm sm:p-9",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "flex size-12 items-center justify-center rounded-sm bg-deep text-accent",
					children: /* @__PURE__ */ jsx(Snowflake, { className: "size-6" })
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-7 label-caps text-accent",
					children: "Portal access"
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "mt-2 text-3xl font-semibold",
					children: "Welcome back"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-3 text-sm leading-relaxed text-muted-foreground",
					children: "Sign in to manage archive records and outreach drafts."
				}),
				/* @__PURE__ */ jsxs("form", {
					className: "mt-8 space-y-5",
					onSubmit: (event) => event.preventDefault(),
					children: [
						/* @__PURE__ */ jsxs("label", {
							className: "block text-sm font-medium",
							children: ["Email address", /* @__PURE__ */ jsx("input", {
								type: "email",
								autoComplete: "email",
								placeholder: "you@example.org",
								className: "mt-2 w-full border border-input bg-background px-3 py-2.5 outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
							})]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "block text-sm font-medium",
							children: ["Password", /* @__PURE__ */ jsx("input", {
								type: "password",
								autoComplete: "current-password",
								placeholder: "••••••••",
								className: "mt-2 w-full border border-input bg-background px-3 py-2.5 outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
							})]
						}),
						/* @__PURE__ */ jsxs("button", {
							type: "submit",
							className: "inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90",
							children: [/* @__PURE__ */ jsx(LockKeyhole, { className: "size-4" }), "Sign in"]
						})
					]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-5 text-center text-xs text-muted-foreground",
					children: "Authentication will be connected to your portal account service."
				})
			]
		})
	}) });
}
//#endregion
export { LoginPage as component };
