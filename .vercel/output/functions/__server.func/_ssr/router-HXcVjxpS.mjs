import { i as __toESM, n as __exportAll$1 } from "../_runtime.mjs";
import { t as supabase } from "./client-ChYpccUq.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as createRootRouteWithContext, b as useRouter, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-HXcVjxpS.js
var router_HXcVjxpS_exports = /* @__PURE__ */ __exportAll$1({
	getRouter: () => getRouter,
	i: () => useAuth,
	n: () => Route,
	r: () => initials,
	t: () => router_exports
});
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
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
var AuthContext = (0, import_react.createContext)(void 0);
async function resolveAvatar(path) {
	if (!path) return null;
	if (path.startsWith("http")) return path;
	const { data } = await supabase.storage.from("avatars").createSignedUrl(path, 43200);
	return data?.signedUrl ?? null;
}
function AuthProvider({ children }) {
	const [session, setSession] = (0, import_react.useState)(null);
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [avatarSrc, setAvatarSrc] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const loadProfile = (0, import_react.useCallback)(async (userId) => {
		const { data } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
		if (data) {
			setProfile(data);
			setAvatarSrc(await resolveAvatar(data.avatar_url));
		}
	}, []);
	(0, import_react.useEffect)(() => {
		let active = true;
		const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
			if (!active) return;
			setSession(newSession);
			if (newSession?.user) loadProfile(newSession.user.id);
			else {
				setProfile(null);
				setAvatarSrc(null);
			}
		});
		supabase.auth.getSession().then(async ({ data }) => {
			if (!active) return;
			setSession(data.session);
			if (data.session?.user) await loadProfile(data.session.user.id);
			setLoading(false);
		});
		return () => {
			active = false;
			sub.subscription.unsubscribe();
		};
	}, [loadProfile]);
	const refreshProfile = (0, import_react.useCallback)(async () => {
		if (session?.user) await loadProfile(session.user.id);
	}, [session, loadProfile]);
	const signOut = (0, import_react.useCallback)(async () => {
		await supabase.auth.signOut();
		setSession(null);
		setProfile(null);
		setAvatarSrc(null);
	}, []);
	const value = (0, import_react.useMemo)(() => ({
		session,
		user: session?.user ?? null,
		profile,
		avatarSrc,
		loading,
		refreshProfile,
		signOut
	}), [
		session,
		profile,
		avatarSrc,
		loading,
		refreshProfile,
		signOut
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value,
		children
	});
}
function useAuth() {
	const ctx = (0, import_react.useContext)(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
}
function initials(name, email) {
	const parts = (name ?? email ?? "AceHub").trim().split(/[\s@._-]+/).filter(Boolean);
	return ((parts[0]?.[0] ?? "A") + (parts[1]?.[0] ?? "")).toUpperCase();
}
var styles_default = "/assets/styles-Bj_wDUNF.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
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
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$13 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "AceHub — Study smarter with AI" },
			{
				name: "description",
				content: "AceHub turns your notes and PDFs into AI summaries, flashcards and quizzes, with streaks and study groups."
			},
			{
				name: "author",
				content: "AceHub"
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
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$13.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, { position: "top-right" })] })
	});
}
var $$splitComponentImporter$12 = () => import("./routes-H45VQYCy.mjs");
var Route$12 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "AceHub — Study smarter, not longer" },
		{
			name: "description",
			content: "Turn your notes and PDFs into AI summaries, flashcards and quizzes. Track streaks, hit study goals and revise with your group on AceHub."
		},
		{
			property: "og:title",
			content: "AceHub — Study smarter, not longer"
		},
		{
			property: "og:description",
			content: "AI summaries, flashcards and quizzes generated from your own course material."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./app-BB__ovu5.mjs");
var Route$11 = createFileRoute("/app")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./auth-G5__dUDp.mjs");
var Route$10 = createFileRoute("/auth")({
	ssr: false,
	validateSearch: (search) => ({ mode: typeof search["mode"] === "string" ? search["mode"] : void 0 }),
	head: () => ({ meta: [
		{ title: "Sign in or sign up — AceHub" },
		{
			name: "description",
			content: "Create your AceHub account or sign in to your AI-powered study workspace."
		},
		{
			property: "og:title",
			content: "Sign in or sign up — AceHub"
		},
		{
			property: "og:description",
			content: "Access your courses, notes, flashcards and quizzes."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./onboarding-2H7or4Mt.mjs");
var Route$9 = createFileRoute("/onboarding")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Set up your study space — AceHub" },
		{
			name: "description",
			content: "Pick your department, level and nine courses to personalise your AceHub dashboard."
		},
		{
			property: "og:title",
			content: "Set up your study space — AceHub"
		},
		{
			property: "og:description",
			content: "A quick five-step setup that tailors AceHub to your department and level."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./app.index-DMlvblbs.mjs");
var Route$8 = createFileRoute("/app/")({
	head: () => ({ meta: [
		{ title: "Dashboard — AceHub" },
		{
			name: "description",
			content: "Your streak, study goal, recent courses and weekly progress."
		},
		{
			property: "og:title",
			content: "Dashboard — AceHub"
		},
		{
			property: "og:description",
			content: "Your streak, study goal and weekly study progress."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./app.flashcards-C7x0VUII.mjs");
var Route$7 = createFileRoute("/app/flashcards")({
	head: () => ({ meta: [
		{ title: "Flashcards — AceHub" },
		{
			name: "description",
			content: "Generate decks from your notes and review them with spaced repetition."
		},
		{
			property: "og:title",
			content: "Flashcards — AceHub"
		},
		{
			property: "og:description",
			content: "Spaced-repetition decks generated from your own notes."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./app.groups-CoZxyBp2.mjs");
var Route$6 = createFileRoute("/app/groups")({
	head: () => ({ meta: [
		{ title: "Study Groups — AceHub" },
		{
			name: "description",
			content: "Shared notes, group goals and a discussion feed for your study crew."
		},
		{
			property: "og:title",
			content: "Study Groups — AceHub"
		},
		{
			property: "og:description",
			content: "Revise together with shared notes, goals and chat."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./app.notes-CD48dluU.mjs");
var Route$5 = createFileRoute("/app/notes")({
	head: () => ({ meta: [
		{ title: "Notes & PDFs — AceHub" },
		{
			name: "description",
			content: "Write notes, upload lecture PDFs and generate AI summaries."
		},
		{
			property: "og:title",
			content: "Notes & PDFs — AceHub"
		},
		{
			property: "og:description",
			content: "Write notes, upload PDFs and summarise them with AI."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./app.progress-B9Dt-Nr5.mjs");
var Route$4 = createFileRoute("/app/progress")({
	head: () => ({ meta: [
		{ title: "Progress & Streaks — AceHub" },
		{
			name: "description",
			content: "Study heatmap, streaks, total hours and per-course progress."
		},
		{
			property: "og:title",
			content: "Progress & Streaks — AceHub"
		},
		{
			property: "og:description",
			content: "See your study activity heatmap and streak stats."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./app.quizzes-CGHxLpz9.mjs");
var Route$3 = createFileRoute("/app/quizzes")({
	head: () => ({ meta: [
		{ title: "Quizzes — AceHub" },
		{
			name: "description",
			content: "Generate practice quizzes from your notes and review your mistakes."
		},
		{
			property: "og:title",
			content: "Quizzes — AceHub"
		},
		{
			property: "og:description",
			content: "Practice quizzes generated from your own course material."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./app.settings-E_6kzIDC.mjs");
var Route$2 = createFileRoute("/app/settings")({
	head: () => ({ meta: [
		{ title: "Settings — AceHub" },
		{
			name: "description",
			content: "Manage your profile, daily study goal and notifications."
		},
		{
			property: "og:title",
			content: "Settings — AceHub"
		},
		{
			property: "og:description",
			content: "Profile, study goal and notification preferences."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./app.courses.index-bAgj-ugc.mjs");
var Route$1 = createFileRoute("/app/courses/")({
	head: () => ({ meta: [
		{ title: "My Courses — AceHub" },
		{
			name: "description",
			content: "All your courses with progress, notes and uploaded files."
		},
		{
			property: "og:title",
			content: "My Courses — AceHub"
		},
		{
			property: "og:description",
			content: "Organise every course, note and PDF in one place."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./app.courses._courseId-DGsOU9ys.mjs");
var Route = createFileRoute("/app/courses/$courseId")({
	head: () => ({ meta: [
		{ title: "Course — AceHub" },
		{
			name: "description",
			content: "All notes, PDFs and decks inside this course."
		},
		{
			property: "og:title",
			content: "Course — AceHub"
		},
		{
			property: "og:description",
			content: "All notes, PDFs and decks inside this course."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$12.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$13
});
var AppRoute = Route$11.update({
	id: "/app",
	path: "/app",
	getParentRoute: () => Route$13
});
var AuthRoute = Route$10.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$13
});
var OnboardingRoute = Route$9.update({
	id: "/onboarding",
	path: "/onboarding",
	getParentRoute: () => Route$13
});
var AppIndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppRoute
});
var AppFlashcardsRoute = Route$7.update({
	id: "/flashcards",
	path: "/flashcards",
	getParentRoute: () => AppRoute
});
var AppGroupsRoute = Route$6.update({
	id: "/groups",
	path: "/groups",
	getParentRoute: () => AppRoute
});
var AppNotesRoute = Route$5.update({
	id: "/notes",
	path: "/notes",
	getParentRoute: () => AppRoute
});
var AppProgressRoute = Route$4.update({
	id: "/progress",
	path: "/progress",
	getParentRoute: () => AppRoute
});
var AppQuizzesRoute = Route$3.update({
	id: "/quizzes",
	path: "/quizzes",
	getParentRoute: () => AppRoute
});
var AppSettingsRoute = Route$2.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AppRoute
});
var AppCoursesIndexRoute = Route$1.update({
	id: "/courses/",
	path: "/courses/",
	getParentRoute: () => AppRoute
});
var AppRouteChildren = {
	AppFlashcardsRoute,
	AppGroupsRoute,
	AppNotesRoute,
	AppProgressRoute,
	AppQuizzesRoute,
	AppSettingsRoute,
	AppIndexRoute,
	AppCoursesCourseIdRoute: Route.update({
		id: "/courses/$courseId",
		path: "/courses/$courseId",
		getParentRoute: () => AppRoute
	}),
	AppCoursesIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AppRoute: AppRoute._addFileChildren(AppRouteChildren),
	AuthRoute,
	OnboardingRoute
};
var routeTree = Route$13._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
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
export { useAuth as i, initials as n, router_HXcVjxpS_exports as r, Route as t };
