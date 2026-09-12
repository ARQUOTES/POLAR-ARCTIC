import { a as mediaQuery, n as activitiesQuery, o as repositoryQuery, r as expeditionsQuery } from "./archive-BAygvr60.js";
import { t as Route$8 } from "./outreach-CGQO2KKD.js";
import { t as Route$9 } from "./expeditions._slug-4YT2XdTW.js";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, useRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
//#region src/components/ui/sonner.tsx
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ jsx(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
//#endregion
//#region src/styles.css?url
var styles_default = "/assets/styles-B2Q2XC1u.css";
//#endregion
//#region src/routes/__root.tsx
function NotFoundComponent() {
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ jsx("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ jsx("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$7 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Polar Science Portal" },
			{
				name: "description",
				content: "Polar expedition archive, open scientific data, publications, media and outreach tools."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [children, /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$7.useRouteContext();
	return /* @__PURE__ */ jsxs(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ jsx(Outlet, {}), /* @__PURE__ */ jsx(Toaster$1, { position: "top-right" })]
	});
}
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter$6 = () => import("./routes-LcIco2iA.js");
var Route$6 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Polar Science Portal — Expeditions, Data & Outreach Archive" },
		{
			name: "description",
			content: "Archive of polar expedition reports, scientific datasets, publications, photos and videos, with an interactive expedition explorer and outreach content studio."
		},
		{
			property: "og:title",
			content: "Polar Science Portal"
		},
		{
			property: "og:description",
			content: "Explore polar expeditions, open datasets, publications and media from Antarctic, Arctic, Southern Ocean and Himalayan science campaigns."
		}
	] }),
	loader: async ({ context }) => {
		await Promise.all([
			context.queryClient.ensureQueryData(expeditionsQuery),
			context.queryClient.ensureQueryData(repositoryQuery),
			context.queryClient.ensureQueryData(mediaQuery),
			context.queryClient.ensureQueryData(activitiesQuery)
		]);
	},
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
//#endregion
//#region src/routes/about.tsx
var $$splitComponentImporter$5 = () => import("./about-BM9_5yQu.js");
var Route$5 = createFileRoute("/about")({
	head: () => ({ meta: [{ title: "About — Polar Science Portal" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
//#endregion
//#region src/routes/activities.tsx
var $$splitComponentImporter$4 = () => import("./activities-6un7_zD0.js");
var Route$4 = createFileRoute("/activities")({
	head: () => ({ meta: [
		{ title: "Institutional Activities — Polar Science Portal" },
		{
			name: "description",
			content: "Symposia, workshops, school outreach programmes, exhibitions and institutional meetings from the polar science community."
		},
		{
			property: "og:title",
			content: "Institutional Activities"
		},
		{
			property: "og:description",
			content: "Upcoming and past polar science outreach programmes, workshops and exhibitions."
		}
	] }),
	loader: ({ context }) => context.queryClient.ensureQueryData(activitiesQuery),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
//#endregion
//#region src/routes/login.tsx
var $$splitComponentImporter$3 = () => import("./login-CFRkxP2y.js");
var Route$3 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
//#endregion
//#region src/routes/media.tsx
var $$splitComponentImporter$2 = () => import("./media-C05shqdi.js");
var Route$2 = createFileRoute("/media")({
	head: () => ({ meta: [
		{ title: "Media Gallery — Polar Science Portal" },
		{
			name: "description",
			content: "Expedition photography and films from Antarctic, Arctic, Southern Ocean and Himalayan field campaigns, filterable by expedition and theme."
		},
		{
			property: "og:title",
			content: "Polar Media Gallery"
		},
		{
			property: "og:description",
			content: "Photographs and documentary films from polar science expeditions."
		}
	] }),
	loader: async ({ context }) => {
		await Promise.all([context.queryClient.ensureQueryData(mediaQuery), context.queryClient.ensureQueryData(expeditionsQuery)]);
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
//#endregion
//#region src/routes/repository.tsx
var $$splitComponentImporter$1 = () => import("./repository-DK-kDE4k.js");
var Route$1 = createFileRoute("/repository")({
	head: () => ({ meta: [
		{ title: "Knowledge Repository — Polar Science Portal" },
		{
			name: "description",
			content: "Searchable archive of polar expedition reports, open scientific datasets and peer-reviewed publications, filterable by type, year and theme."
		},
		{
			property: "og:title",
			content: "Knowledge Repository"
		},
		{
			property: "og:description",
			content: "Reports, datasets and publications from polar science campaigns."
		}
	] }),
	loader: ({ context }) => context.queryClient.ensureQueryData(repositoryQuery),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
//#endregion
//#region src/routes/expeditions.index.tsx
var $$splitComponentImporter = () => import("./expeditions.index-DV1G17M0.js");
var Route = createFileRoute("/expeditions/")({
	head: () => ({ meta: [
		{ title: "Expedition Explorer — Polar Science Portal" },
		{
			name: "description",
			content: "Filter and explore polar expeditions by region, year, platform and research theme, with full records of teams, routes, data and media."
		},
		{
			property: "og:title",
			content: "Expedition Explorer"
		},
		{
			property: "og:description",
			content: "Browse Antarctic, Arctic, Southern Ocean and Himalayan science expeditions."
		}
	] }),
	loader: ({ context }) => context.queryClient.ensureQueryData(expeditionsQuery),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
//#region src/routeTree.gen.ts
var IndexRoute = Route$6.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$7
});
var AboutRoute = Route$5.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$7
});
var ActivitiesRoute = Route$4.update({
	id: "/activities",
	path: "/activities",
	getParentRoute: () => Route$7
});
var LoginRoute = Route$3.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$7
});
var MediaRoute = Route$2.update({
	id: "/media",
	path: "/media",
	getParentRoute: () => Route$7
});
var OutreachRoute = Route$8.update({
	id: "/outreach",
	path: "/outreach",
	getParentRoute: () => Route$7
});
var RepositoryRoute = Route$1.update({
	id: "/repository",
	path: "/repository",
	getParentRoute: () => Route$7
});
var ExpeditionsIndexRoute = Route.update({
	id: "/expeditions/",
	path: "/expeditions/",
	getParentRoute: () => Route$7
});
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	ActivitiesRoute,
	LoginRoute,
	MediaRoute,
	OutreachRoute,
	RepositoryRoute,
	ExpeditionsSlugRoute: Route$9.update({
		id: "/expeditions/$slug",
		path: "/expeditions/$slug",
		getParentRoute: () => Route$7
	}),
	ExpeditionsIndexRoute
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
