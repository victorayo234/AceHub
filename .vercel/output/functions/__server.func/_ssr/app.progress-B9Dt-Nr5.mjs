import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { o as heatmap, r as courses } from "./mock-data-BCbCT0ef.mjs";
import { E as Layers, M as Clock, a as Trophy, k as Flame } from "../_libs/lucide-react.mjs";
import { s as PageHeader } from "./app-shell-r4P_-mc-.mjs";
import { t as Progress } from "./progress-BNH9Hhbk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.progress-B9Dt-Nr5.js
var import_jsx_runtime = require_jsx_runtime();
var levels = [
	"bg-secondary",
	"bg-[oklch(0.90_0.04_195)]",
	"bg-[oklch(0.80_0.07_195)]",
	"bg-[oklch(0.66_0.09_195)]",
	"bg-[oklch(0.52_0.09_195)]"
];
function ProgressPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Progress",
			subtitle: "Six months of study activity at a glance."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				{
					icon: Flame,
					label: "Current streak",
					value: "14 days"
				},
				{
					icon: Trophy,
					label: "Longest streak",
					value: "38 days"
				},
				{
					icon: Clock,
					label: "Total study hours",
					value: "126h"
				},
				{
					icon: Layers,
					label: "Cards reviewed",
					value: "3,482"
				}
			].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-soft p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-medium uppercase tracking-wide",
						children: s.label
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-display text-2xl font-bold",
					children: s.value
				})]
			}, s.label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "card-soft mt-6 overflow-x-auto p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-semibold",
					children: "Study activity"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 flex gap-1",
					children: Array.from({ length: 26 }, (_, w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-1",
						children: Array.from({ length: 7 }, (_, d) => {
							const v = heatmap[w * 7 + d] ?? 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								title: `${v * 25} minutes studied`,
								className: `h-3 w-3 rounded-[3px] ${levels[v] ?? levels[0]}`
							}, d);
						})
					}, w))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center gap-2 text-xs text-muted-foreground",
					children: [
						"Less",
						levels.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-3 w-3 rounded-[3px] ${l}` }, l)),
						"More"
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "card-soft mt-6 p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-base font-semibold",
				children: "Per-course progress"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 space-y-5",
				children: courses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: c.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted-foreground",
						children: [c.progress, "%"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
					value: c.progress,
					className: "mt-2 h-1.5"
				})] }, c.id))
			})]
		})
	] });
}
//#endregion
export { ProgressPage as component };
