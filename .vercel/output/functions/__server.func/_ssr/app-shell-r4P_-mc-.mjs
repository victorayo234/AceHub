import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { d as useRouterState, m as Outlet, v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as require_jsx_runtime, n as AvatarFallback$1, r as AvatarImage$1, t as Avatar$1 } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { i as useAuth, n as initials } from "./router-HXcVjxpS.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as Input, r as cn, t as Button } from "./button-CHSNwFnT.mjs";
import { a as groups, i as decks, r as courses, s as notes } from "./mock-data-BCbCT0ef.mjs";
import { D as GraduationCap, E as Layers, R as BookOpen, T as LayoutDashboard, b as Menu, f as Search, g as NotebookPen, k as Flame, n as Users, o as TrendingUp, t as X, u as Settings } from "../_libs/lucide-react.mjs";
import { t as ThemeToggle } from "./theme-toggle-s5yvLFP3.mjs";
import { a as DialogOverlay, c as DialogTrigger, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-r4P_-mc-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Avatar = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar$1, {
	ref,
	className: cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className),
	...props
}));
Avatar.displayName = Avatar$1.displayName;
var AvatarImage = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage$1, {
	ref,
	className: cn("aspect-square h-full w-full", className),
	...props
}));
AvatarImage.displayName = AvatarImage$1.displayName;
var AvatarFallback = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback$1, {
	ref,
	className: cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className),
	...props
}));
AvatarFallback.displayName = AvatarFallback$1.displayName;
function buildIndex() {
	return [
		...courses.map((c) => ({
			id: `course-${c.id}`,
			label: c.title,
			meta: `${c.code} · ${c.notes} notes`,
			group: "Courses",
			icon: BookOpen,
			to: "/app/courses/$courseId",
			params: { courseId: c.id }
		})),
		...notes.map((n) => ({
			id: `note-${n.id}`,
			label: n.title,
			meta: `${n.kind === "pdf" ? "PDF" : "Note"} · ${n.updated}`,
			group: "Notes",
			icon: NotebookPen,
			to: "/app/notes"
		})),
		...decks.map((d) => ({
			id: `deck-${d.id}`,
			label: d.title,
			meta: `${d.total} cards · ${d.due} due`,
			group: "Flashcards",
			icon: Layers,
			to: "/app/flashcards"
		})),
		...groups.map((g) => ({
			id: `group-${g.id}`,
			label: g.name,
			meta: `${g.members} members`,
			group: "Study Groups",
			icon: Users,
			to: "/app/groups"
		}))
	];
}
function GlobalSearch({ onNavigate }) {
	const navigate = useNavigate();
	const [query, setQuery] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [active, setActive] = (0, import_react.useState)(0);
	const containerRef = (0, import_react.useRef)(null);
	const inputRef = (0, import_react.useRef)(null);
	const index = (0, import_react.useMemo)(buildIndex, []);
	const results = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		if (!q) return [];
		return index.filter((r) => `${r.label} ${r.meta} ${r.group}`.toLowerCase().includes(q)).slice(0, 8);
	}, [index, query]);
	(0, import_react.useEffect)(() => setActive(0), [query]);
	(0, import_react.useEffect)(() => {
		function onClick(e) {
			if (!containerRef.current?.contains(e.target)) setOpen(false);
		}
		function onKey(e) {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				inputRef.current?.focus();
				setOpen(true);
			}
		}
		document.addEventListener("mousedown", onClick);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("mousedown", onClick);
			document.removeEventListener("keydown", onKey);
		};
	}, []);
	function go(r) {
		setOpen(false);
		setQuery("");
		onNavigate?.();
		navigate({
			to: r.to,
			params: r.params
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: containerRef,
		className: "relative max-w-md flex-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				ref: inputRef,
				value: query,
				onChange: (e) => {
					setQuery(e.target.value);
					setOpen(true);
				},
				onFocus: () => setOpen(true),
				onKeyDown: (e) => {
					if (!results.length) return;
					if (e.key === "ArrowDown") {
						e.preventDefault();
						setActive((a) => (a + 1) % results.length);
					} else if (e.key === "ArrowUp") {
						e.preventDefault();
						setActive((a) => (a - 1 + results.length) % results.length);
					} else if (e.key === "Enter") {
						e.preventDefault();
						const hit = results[active];
						if (hit) go(hit);
					} else if (e.key === "Escape") setOpen(false);
				},
				placeholder: "Search notes, decks, courses…",
				className: "h-10 rounded-lg border-transparent bg-secondary pl-9 pr-14 focus-visible:bg-card"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
				className: "pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-card px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:block",
				children: "⌘K"
			}),
			open && query.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "card-soft absolute left-0 right-0 top-12 z-50 max-h-96 overflow-y-auto p-1.5",
				children: results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "px-3 py-6 text-center text-sm text-muted-foreground",
					children: [
						"No matches for “",
						query,
						"”"
					]
				}) : results.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onMouseEnter: () => setActive(i),
					onClick: () => go(r),
					className: cn("flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors", i === active ? "bg-secondary" : "hover:bg-secondary"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-accent-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r.icon, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate text-sm font-medium",
								children: r.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate text-xs text-muted-foreground",
								children: r.meta
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground",
							children: r.group
						})
					]
				}, r.id))
			}) : null
		]
	});
}
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription.displayName;
var nav = [
	{
		to: "/app",
		label: "Dashboard",
		icon: LayoutDashboard,
		exact: true
	},
	{
		to: "/app/courses",
		label: "My Courses",
		icon: BookOpen
	},
	{
		to: "/app/notes",
		label: "Notes",
		icon: NotebookPen
	},
	{
		to: "/app/flashcards",
		label: "Flashcards",
		icon: Layers
	},
	{
		to: "/app/quizzes",
		label: "Quizzes",
		icon: GraduationCap
	},
	{
		to: "/app/groups",
		label: "Study Groups",
		icon: Users
	},
	{
		to: "/app/progress",
		label: "Progress",
		icon: TrendingUp
	},
	{
		to: "/app/settings",
		label: "Settings",
		icon: Settings
	}
];
function NavList({ onNavigate }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "flex flex-col gap-1 px-3",
		children: nav.map((item) => {
			const active = item.to === "/app" ? pathname === "/app" : pathname.startsWith(item.to);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: item.to,
				onClick: onNavigate,
				className: cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors", active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "h-4 w-4" }), item.label]
			}, item.to);
		})
	});
}
function Brand() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: "flex items-center gap-2.5 px-6 py-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-[18px] w-[18px]" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-lg font-bold tracking-tight",
			children: "AceHub"
		})]
	});
}
function SidebarUser({ onNavigate }) {
	const { profile, user, avatarSrc } = useAuth();
	const name = profile?.full_name ?? user?.email ?? "Student";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/app/settings",
		onClick: onNavigate,
		className: "mt-auto flex items-center gap-3 border-t border-border px-4 py-4 transition-colors hover:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
			className: "h-9 w-9",
			children: [avatarSrc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
				src: avatarSrc,
				alt: name
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
				className: "bg-primary text-xs font-semibold text-primary-foreground",
				children: initials(profile?.full_name, user?.email)
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "truncate text-sm font-medium",
				children: name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "truncate text-xs text-muted-foreground",
				children: user?.email
			})]
		})]
	});
}
function AppShell() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const { profile, user, avatarSrc } = useAuth();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-sidebar lg:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavList, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarUser, {})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "lg:pl-64",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur md:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
						open,
						onOpenChange: setOpen,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								size: "icon",
								className: "lg:hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sr-only",
									children: "Open navigation"
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
							side: "left",
							className: "flex w-64 flex-col bg-sidebar p-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
									className: "sr-only",
									children: "Navigation"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavList, { onNavigate: () => setOpen(false) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarUser, { onNavigate: () => setOpen(false) })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalSearch, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex items-center gap-2 md:gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1.5 text-sm font-semibold text-accent-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-4 w-4 text-flame" }), "14"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/app/settings",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
									className: "h-9 w-9",
									children: [avatarSrc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
										src: avatarSrc,
										alt: profile?.full_name ?? "Profile"
									}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
										className: "bg-primary text-xs font-semibold text-primary-foreground",
										children: initials(profile?.full_name, user?.email)
									})]
								})
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto w-full max-w-6xl px-4 py-8 md:px-6 lg:py-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			})]
		})]
	});
}
function PageHeader({ title, subtitle, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-8 flex flex-wrap items-end justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-bold tracking-tight md:text-3xl",
			children: title
		}), subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1.5 text-sm text-muted-foreground",
			children: subtitle
		}) : null] }), action]
	});
}
function EmptyState({ icon: Icon, title, body, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card-soft flex flex-col items-center px-6 py-16 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-accent-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-base font-semibold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 max-w-sm text-sm text-muted-foreground",
				children: body
			}),
			action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5",
				children: action
			}) : null
		]
	});
}
function AiLoading({ label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3 rounded-xl bg-primary-soft px-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex gap-1",
			children: [
				0,
				1,
				2
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "h-1.5 w-1.5 animate-bounce rounded-full bg-primary",
				style: { animationDelay: `${i * 140}ms` }
			}, i))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm font-medium text-accent-foreground",
			children: label
		})]
	});
}
//#endregion
export { AvatarImage as a, AvatarFallback as i, AppShell as n, EmptyState as o, Avatar as r, PageHeader as s, AiLoading as t };
