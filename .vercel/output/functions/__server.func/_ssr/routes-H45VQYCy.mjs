import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Input, t as Button } from "./button-CHSNwFnT.mjs";
import { D as GraduationCap, E as Layers, O as Github, i as Twitter, k as Flame, l as Sparkles, n as Users, r as Upload, w as Linkedin, x as Mail, y as MessageCircle, z as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as ThemeToggle } from "./theme-toggle-s5yvLFP3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-H45VQYCy.js
var import_jsx_runtime = require_jsx_runtime();
var hero_study_default = "/assets/hero-study-DZFHtG0r.jpg";
function DiscordIcon({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className,
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" })
	});
}
var socials = [
	{
		label: "GitHub",
		href: "https://github.com/victorayo234",
		icon: Github
	},
	{
		label: "X / Twitter",
		href: "https://x.com/ayo__adebesin",
		icon: Twitter
	},
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/ayo-adebesin-is-him/",
		icon: Linkedin
	},
	{
		label: "Discord",
		href: "https://discord.com/users/1298397081555435564",
		icon: DiscordIcon
	}
];
var footerColumns = [
	{
		title: "Product",
		links: [
			{
				label: "AI Summaries",
				to: "/app"
			},
			{
				label: "Flashcards",
				to: "/app"
			},
			{
				label: "Practice Quizzes",
				to: "/app"
			},
			{
				label: "Study Planner",
				to: "/app"
			},
			{
				label: "Progress & Streaks",
				to: "/app"
			}
		]
	},
	{
		title: "Resources",
		links: [
			{
				label: "Student Guide",
				href: "#"
			},
			{
				label: "Blog",
				href: "#"
			},
			{
				label: "Help Center",
				href: "#"
			},
			{
				label: "Community",
				href: "https://discord.com/users/1298397081555435564"
			},
			{
				label: "Changelog",
				href: "#"
			}
		]
	},
	{
		title: "Company",
		links: [
			{
				label: "About",
				href: "#"
			},
			{
				label: "Contact",
				href: "mailto:victorayo234@gmail.com"
			},
			{
				label: "Feature requests",
				href: "https://github.com/victorayo234"
			},
			{
				label: "Careers",
				href: "#"
			}
		]
	}
];
var features = [
	{
		icon: Sparkles,
		title: "AI summaries",
		body: "Drop in a 40-page PDF and get the key ideas in plain language."
	},
	{
		icon: Layers,
		title: "Instant flashcards",
		body: "Turn any note into a spaced-repetition deck in one click."
	},
	{
		icon: GraduationCap,
		title: "Practice quizzes",
		body: "Choose difficulty and length, get instant feedback and review."
	},
	{
		icon: Flame,
		title: "Streaks & goals",
		body: "Small daily targets that keep momentum through exam season."
	},
	{
		icon: Users,
		title: "Group spaces",
		body: "Share notes, decks and goals with your study crew."
	},
	{
		icon: Upload,
		title: "Everything in one place",
		body: "Courses, notes and files organised the way you actually study."
	}
];
var steps = [
	{
		n: "01",
		title: "Add your material",
		body: "Create a course, write notes or upload lecture PDFs."
	},
	{
		n: "02",
		title: "Let AI do the grunt work",
		body: "Summaries, flashcards and quizzes generated from your own content."
	},
	{
		n: "03",
		title: "Revise and track",
		body: "Study daily, build a streak and watch your progress climb."
	}
];
function Landing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mx-auto flex max-w-6xl items-center justify-between px-4 py-5 md:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-[18px] w-[18px]" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg font-bold tracking-tight",
						children: "AceHub"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ghost",
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth",
								search: { mode: void 0 },
								children: "Sign In"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth",
								search: { mode: "signup" },
								children: "Get Started"
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto grid max-w-6xl items-center gap-12 px-4 pt-10 pb-20 md:px-6 lg:grid-cols-[1.05fr_1fr] lg:pt-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-accent-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), " Built for exam season"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight md:text-6xl",
						children: [
							"Study smarter,",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"not longer."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg",
						children: "AceHub turns your notes and lecture PDFs into summaries, flashcards and quizzes — so the hours you spend revising actually count."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/auth",
								search: { mode: "signup" },
								children: ["Get Started ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1.5 h-4 w-4" })]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth",
								search: { mode: void 0 },
								children: "Sign In"
							})
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "card-soft overflow-hidden p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: hero_study_default,
						alt: "A calm study desk with notes, a laptop showing the AceHub dashboard and a mug",
						className: "h-full w-full object-cover",
						loading: "eager"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-y border-border bg-surface py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-4 md:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "max-w-xl text-2xl font-bold tracking-tight md:text-3xl",
						children: "Everything you need between the lecture and the exam"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
						children: features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-soft card-hover p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-accent-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "h-[18px] w-[18px]" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-4 text-base font-semibold",
									children: f.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 text-sm leading-relaxed text-muted-foreground",
									children: f.body
								})
							]
						}, f.title))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-4 py-20 md:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold tracking-tight md:text-3xl",
					children: "How it works"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-8 md:grid-cols-3",
					children: steps.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-sm font-bold text-primary",
							children: s.n
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 text-lg font-semibold",
							children: s.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-sm leading-relaxed text-muted-foreground",
							children: s.body
						})
					] }, s.n))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "border-t border-border bg-surface",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-b border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "max-w-md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg font-semibold tracking-tight",
									children: "Study tips, every other week"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 text-sm leading-relaxed text-muted-foreground",
									children: "Revision techniques, product updates and exam-season playbooks. No spam, unsubscribe anytime."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: (e) => {
									e.preventDefault();
									toast.success("You're subscribed — check your inbox for a welcome note.");
									e.currentTarget.reset();
								},
								className: "flex w-full max-w-md items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "newsletter-email",
										className: "sr-only",
										children: "Email address"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "newsletter-email",
										type: "email",
										required: true,
										placeholder: "you@university.edu",
										className: "h-11 bg-background"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										size: "lg",
										className: "shrink-0",
										children: "Subscribe"
									})
								]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-6xl px-4 py-14 md:px-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-12 md:grid-cols-2 lg:grid-cols-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-5 lg:col-span-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-[18px] w-[18px]" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display text-base font-bold tracking-tight",
											children: "AceHub"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "max-w-sm text-sm leading-relaxed text-muted-foreground",
										children: "The ultimate learning workspace for students to track grades, calculate GPA, and organise their academic life."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center gap-3 pt-1",
										children: socials.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: s.href,
											target: "_blank",
											rel: "noopener noreferrer",
											"aria-label": s.label,
											className: "flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:bg-primary-soft hover:text-primary",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-4 w-4" })
										}, s.label))
									})
								]
							}), footerColumns.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xs font-semibold uppercase tracking-widest text-foreground",
									children: col.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "flex flex-col gap-2.5",
									children: col.links.map((item) => "to" in item ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: item.to,
										className: "text-sm text-muted-foreground transition-colors hover:text-foreground",
										children: item.label
									}) }, item.label) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: item.href,
										target: item.href.startsWith("http") ? "_blank" : void 0,
										rel: item.href.startsWith("http") ? "noopener noreferrer" : void 0,
										className: "text-sm text-muted-foreground transition-colors hover:text-foreground",
										children: item.label
									}) }, item.label))
								})]
							}, col.title))]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl border border-border bg-background px-5 py-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium",
									children: "Need a hand?"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "mailto:victorayo234@gmail.com",
									className: "inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" }), " victorayo234@gmail.com"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "https://discord.com/users/1298397081555435564",
									target: "_blank",
									rel: "noopener noreferrer",
									className: "inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }), " Chat on Discord"]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-5 md:px-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									"© ",
									(/* @__PURE__ */ new Date()).getFullYear(),
									" AceHub. Made for students who care about their grades."
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#",
										className: "text-xs text-muted-foreground transition-colors hover:text-foreground",
										children: "Privacy Policy"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#",
										className: "text-xs text-muted-foreground transition-colors hover:text-foreground",
										children: "Terms of Service"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#",
										className: "text-xs text-muted-foreground transition-colors hover:text-foreground",
										children: "Cookies"
									})
								]
							})]
						})
					})
				]
			})
		]
	});
}
//#endregion
export { Landing as component };
