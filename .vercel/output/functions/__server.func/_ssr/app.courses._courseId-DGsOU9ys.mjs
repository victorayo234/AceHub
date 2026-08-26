import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as Route } from "./router-HXcVjxpS.mjs";
import { t as Button } from "./button-CHSNwFnT.mjs";
import { l as tagColor, s as notes } from "./mock-data-BCbCT0ef.mjs";
import { A as FileText, B as ArrowLeft, C as LoaderCircle, g as NotebookPen, l as Sparkles } from "../_libs/lucide-react.mjs";
import { o as EmptyState, s as PageHeader } from "./app-shell-r4P_-mc-.mjs";
import { t as Progress } from "./progress-BNH9Hhbk.mjs";
import { i as useMyCourses } from "./use-courses-BpgHXOE7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.courses._courseId-DGsOU9ys.js
var import_jsx_runtime = require_jsx_runtime();
function CourseDetail() {
	const { courseId } = Route.useParams();
	const { data: courses, isLoading } = useMyCourses();
	const course = courses?.find((c) => c.id === courseId);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin text-muted-foreground" })
	});
	if (!course) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: NotebookPen,
		title: "Course not found",
		body: "This course isn't part of your current selection.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/app/courses",
				children: "Back to my courses"
			})
		})
	});
	const items = notes.slice(0, course.notes % 4 + 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/app/courses",
			className: "mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " All courses"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: course.title,
			subtitle: `${course.code} · ${course.level} Level · ${course.notes} notes · ${course.files} files`,
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/app/notes",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mr-1.5 h-4 w-4" }), " New note"]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "card-soft mb-8 flex flex-wrap items-center gap-6 p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-48 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-2.5 w-2.5 rounded-full ${tagColor[course.tag]}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium",
						children: "Course progress"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
					value: course.progress,
					className: "mt-3 h-2"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-display text-3xl font-bold",
				children: [course.progress, "%"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-4 text-base font-semibold",
			children: "Material"
		}),
		items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: NotebookPen,
			title: "Nothing here yet",
			body: "No notes yet — upload your first PDF or write a note to get started.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/notes",
					children: "Add material"
				})
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "card-soft divide-y divide-border",
			children: items.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/app/notes",
				className: "flex items-center gap-4 px-5 py-4 transition-colors hover:bg-secondary/60",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-accent-foreground",
						children: n.kind === "pdf" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotebookPen, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-medium",
							children: n.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs text-muted-foreground",
							children: n.excerpt
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 text-xs text-muted-foreground",
						children: n.updated
					})
				]
			}, n.id))
		})
	] });
}
//#endregion
export { CourseDetail as component };
