import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as cn, t as Button } from "./button-CHSNwFnT.mjs";
import { i as decks, r as courses, t as cards } from "./mock-data-BCbCT0ef.mjs";
import { B as ArrowLeft, l as Sparkles, p as RotateCcw, z as ArrowRight } from "../_libs/lucide-react.mjs";
import { s as PageHeader, t as AiLoading } from "./app-shell-r4P_-mc-.mjs";
import { t as Progress } from "./progress-BNH9Hhbk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.flashcards-C7x0VUII.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StudyMode() {
	const [index, setIndex] = (0, import_react.useState)(0);
	const [flipped, setFlipped] = (0, import_react.useState)(false);
	const card = cards[index];
	const next = (0, import_react.useCallback)((label) => {
		if (label) toast.success(`Marked ${label}`);
		setFlipped(false);
		setIndex((i) => (i + 1) % cards.length);
	}, []);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.code === "Space") {
				e.preventDefault();
				setFlipped((f) => !f);
			}
			if (e.key === "ArrowRight") next();
			if (e.key === "ArrowLeft") {
				setFlipped(false);
				setIndex((i) => (i - 1 + cards.length) % cards.length);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [next]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card-soft p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold",
					children: "Cell organelles"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-muted-foreground",
					children: [
						index + 1,
						" / ",
						cards.length
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
				value: (index + 1) / cards.length * 100,
				className: "mt-3 h-1.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 [perspective:1400px]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setFlipped((f) => !f),
					className: cn("flip-3d relative block h-64 w-full", flipped && "[transform:rotateY(180deg)]"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "backface-hidden absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-secondary/70 px-8 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
								children: "Question"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-3 font-display text-xl font-semibold",
								children: card.front
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-6 text-xs text-muted-foreground",
								children: "Click or press space to flip"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "backface-hidden absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-primary-soft px-8 text-center [transform:rotateY(180deg)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-medium uppercase tracking-wide text-accent-foreground",
							children: "Answer"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-3 text-base leading-relaxed",
							children: card.back
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "icon",
						onClick: () => setIndex((i) => (i - 1 + cards.length) % cards.length),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "icon",
						onClick: () => next(),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => next("Again"),
							children: "Again"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => next("Hard"),
							children: "Hard"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => next("Easy"),
							children: "Easy"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs text-muted-foreground",
				children: "Keyboard: space to flip, ← → to move between cards."
			})
		]
	});
}
function GenerateDeck() {
	const [state, setState] = (0, import_react.useState)("idle");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card-soft p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-base font-semibold",
				children: "Generate a deck"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Pick a note and AceHub writes the cards for you."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 space-y-2",
				children: [
					"Mitochondria & ATP synthesis",
					"Lecture 6 — Balanced trees",
					"Cold War timeline"
				].map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex cursor-pointer items-center gap-3 rounded-lg bg-secondary/60 px-4 py-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "radio",
						name: "note",
						defaultChecked: i === 0,
						className: "accent-[var(--color-primary)]"
					}), n]
				}, n))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5",
				children: [state === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiLoading, { label: "Writing your flashcards…" }) : state === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-xl bg-primary-soft px-4 py-3 text-sm font-medium text-accent-foreground",
					children: "24 cards ready — added to Cell organelles."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => {
						setState("loading");
						setTimeout(() => setState("done"), 2200);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mr-1.5 h-4 w-4" }), " Generate flashcards"]
				}), state === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					className: "mt-3",
					onClick: () => setState("idle"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "mr-1.5 h-4 w-4" }), " Generate another"]
				}) : null]
			})
		]
	});
}
function Flashcards() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Flashcards",
			subtitle: "41 cards are due for review today."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-[1.5fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudyMode, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenerateDeck, {})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-4 mt-8 text-base font-semibold",
			children: "Your decks"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
			children: decks.map((d) => {
				const course = courses.find((c) => c.id === d.courseId);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-soft card-hover p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium text-muted-foreground",
							children: course?.code
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-1.5 text-base font-semibold",
							children: d.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							value: d.mastered / d.total * 100,
							className: "mt-4 h-1.5"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex justify-between text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [d.mastered, " mastered"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: d.due > 0 ? "font-medium text-primary" : "",
								children: d.due > 0 ? `${d.due} due` : "All caught up"
							})]
						})
					]
				}, d.id);
			})
		})
	] });
}
//#endregion
export { Flashcards as component };
