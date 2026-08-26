import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Input, r as cn, t as Button } from "./button-CHSNwFnT.mjs";
import { r as courses, s as notes } from "./mock-data-BCbCT0ef.mjs";
import { A as FileText, I as ChevronDown, g as NotebookPen, j as CloudUpload, l as Sparkles } from "../_libs/lucide-react.mjs";
import { s as PageHeader, t as AiLoading } from "./app-shell-r4P_-mc-.mjs";
import { t as Progress } from "./progress-BNH9Hhbk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.notes-CD48dluU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var SUMMARY = [
	"ATP synthesis depends on a proton gradient built by the electron transport chain across the inner mitochondrial membrane.",
	"Complexes I–IV pump protons into the intermembrane space; ATP synthase lets them flow back and captures the energy.",
	"Oxygen is the terminal electron acceptor — without it the chain backs up and the gradient collapses."
];
function SummaryCard() {
	const [state, setState] = (0, import_react.useState)("idle");
	const [open, setOpen] = (0, import_react.useState)(true);
	if (state === "loading") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiLoading, { label: "Analyzing your notes…" });
	if (state === "done") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-primary-soft/60 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setOpen((o) => !o),
			className: "flex w-full items-center justify-between text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-2 text-sm font-semibold text-accent-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), " AI summary"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180") })]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 space-y-2",
			children: SUMMARY.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex gap-2 text-sm leading-relaxed text-foreground/90",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" }), s]
			}, s))
		}) : null]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		variant: "outline",
		onClick: () => {
			setState("loading");
			setTimeout(() => setState("done"), 2200);
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mr-1.5 h-4 w-4" }), " Generate AI summary"]
	});
}
function UploadZone() {
	const [dragging, setDragging] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(null);
	const [file, setFile] = (0, import_react.useState)(null);
	const startUpload = (name = "lecture-09-metabolism.pdf") => {
		setFile(name);
		setProgress(0);
		let p = 0;
		const timer = setInterval(() => {
			p += 12;
			setProgress(Math.min(p, 100));
			if (p >= 100) {
				clearInterval(timer);
				setProgress(null);
				toast.success("PDF processed and ready");
			}
		}, 180);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card-soft p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-base font-semibold",
				children: "Upload a PDF"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				onDragOver: (e) => {
					e.preventDefault();
					setDragging(true);
				},
				onDragLeave: () => setDragging(false),
				onDrop: (e) => {
					e.preventDefault();
					setDragging(false);
					startUpload(e.dataTransfer.files[0]?.name);
				},
				className: cn("mt-4 flex flex-col items-center rounded-xl border-2 border-dashed border-border px-6 py-10 text-center transition-colors", dragging && "border-primary bg-primary-soft/60"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-accent-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm font-medium",
						children: "Drag & drop your lecture PDF"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "or browse from your device · max 50 MB"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						className: "mt-4",
						onClick: () => startUpload(),
						children: "Choose file"
					})
				]
			}),
			file ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-xl border border-border p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-9 w-9 items-center justify-center rounded-lg bg-secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4 text-muted-foreground" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium",
								children: file
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: progress === null ? "Processed · 24 pages" : "Extracting text…"
							})]
						})]
					}),
					progress !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						value: progress,
						className: "mt-3 h-1.5"
					}) : null,
					progress === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {})
					}) : null
				]
			}) : null
		]
	});
}
function Notes() {
	const [selected, setSelected] = (0, import_react.useState)(notes[0].id);
	const active = notes.find((n) => n.id === selected);
	const course = courses.find((c) => c.id === active.courseId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Notes",
		subtitle: "Write, upload and summarise your course material."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[260px_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "card-soft h-fit p-2",
			children: notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setSelected(n.id),
				className: cn("flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors", n.id === selected ? "bg-accent" : "hover:bg-secondary"),
				children: [n.kind === "pdf" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotebookPen, { className: "mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block truncate text-sm font-medium",
						children: n.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-xs text-muted-foreground",
						children: n.updated
					})]
				})]
			}, n.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-soft p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						defaultValue: active.title,
						className: "border-0 px-0 font-display !text-2xl font-bold shadow-none focus-visible:ring-0"
					}, active.id),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: [
							course?.code,
							" · edited ",
							active.updated
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex flex-wrap gap-1 border-y border-border py-2 text-xs text-muted-foreground",
						children: [
							"B",
							"I",
							"U",
							"H1",
							"H2",
							"• List",
							"1. List",
							"Quote",
							"Code"
						].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "rounded px-2.5 py-1 font-medium transition-colors hover:bg-secondary hover:text-foreground",
							children: t
						}, t))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						defaultValue: `${active.excerpt}\n\nKey points\n• Protons are pumped into the intermembrane space.\n• ATP synthase converts the gradient into chemical energy.\n• Oxygen accepts electrons at the end of the chain.`,
						className: "mt-4 min-h-64 resize-none border-0 px-0 text-sm leading-relaxed shadow-none focus-visible:ring-0"
					}, `body-${active.id}`),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							onClick: () => toast.success("Note saved"),
							children: "Save note"
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadZone, {})]
		})]
	})] });
}
//#endregion
export { Notes as component };
