import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as Button } from "./button-CHSNwFnT.mjs";
import { l as tagColor } from "./mock-data-BCbCT0ef.mjs";
import { A as FileText, C as LoaderCircle, h as Pencil } from "../_libs/lucide-react.mjs";
import { o as EmptyState, s as PageHeader } from "./app-shell-r4P_-mc-.mjs";
import { t as Progress } from "./progress-BNH9Hhbk.mjs";
import { i as useMyCourses } from "./use-courses-BpgHXOE7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.courses.index-bAgj-ugc.js
var import_jsx_runtime = require_jsx_runtime();
function Courses() {
	const { data: courses, isLoading } = useMyCourses();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "My Courses",
		subtitle: courses?.length ? `${courses.length} courses selected for this semester.` : "The courses you picked during setup live here.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "outline",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/onboarding",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "mr-1.5 h-4 w-4" }), " Edit selection"]
			})
		})
	}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin text-muted-foreground" })
	}) : !courses?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: FileText,
		title: "No courses yet",
		body: "Run the quick setup to pick your department, level and nine courses.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/onboarding",
				children: "Set up my courses"
			})
		})
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
		children: courses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/app/courses/$courseId",
			params: { courseId: c.id },
			className: "card-soft card-hover block p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-2.5 w-2.5 rounded-full ${tagColor[c.tag]}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-medium text-muted-foreground",
							children: c.code
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3.5 w-3.5" }),
							" ",
							c.notes + c.files
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-2.5 text-lg font-semibold",
					children: c.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
					value: c.progress,
					className: "mt-5 h-1.5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex justify-between text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [c.progress, "% complete"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						c.notes,
						" notes · ",
						c.files,
						" files"
					] })]
				})
			]
		}, c.id))
	})] });
}
//#endregion
export { Courses as component };
