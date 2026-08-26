import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-ChYpccUq.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as useAuth } from "./router-HXcVjxpS.mjs";
import { n as Input, r as cn, t as Button } from "./button-CHSNwFnT.mjs";
import { B as ArrowLeft, C as LoaderCircle, D as GraduationCap, L as Check, f as Search, l as Sparkles, z as ArrowRight } from "../_libs/lucide-react.mjs";
import { n as useDepartments, r as useInvalidateMyCourses, t as useCatalogCourses } from "./use-courses-BpgHXOE7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-2H7or4Mt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LEVELS = [
	100,
	200,
	300,
	400
];
var STEPS = [
	"Welcome",
	"Department",
	"Level",
	"Courses",
	"Confirm"
];
function StepIndicator({ step }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center gap-2",
			children: STEPS.map((label, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("h-1.5 rounded-full transition-colors", i <= step ? "bg-primary" : "bg-secondary") })
			}, label))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground",
			children: [
				"Step ",
				step + 1,
				" of ",
				STEPS.length,
				" · ",
				STEPS[step]
			]
		})]
	});
}
function Onboarding() {
	const { user, profile, loading, refreshProfile } = useAuth();
	const navigate = useNavigate();
	const invalidateMyCourses = useInvalidateMyCourses();
	const [step, setStep] = (0, import_react.useState)(0);
	const [departmentId, setDepartmentId] = (0, import_react.useState)(null);
	const [level, setLevel] = (0, import_react.useState)(null);
	const [selected, setSelected] = (0, import_react.useState)([]);
	const [query, setQuery] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const departments = useDepartments();
	const catalog = useCatalogCourses(departmentId, level);
	(0, import_react.useEffect)(() => {
		if (!loading && !user) navigate({
			to: "/auth",
			replace: true,
			search: { mode: void 0 }
		});
	}, [
		loading,
		user,
		navigate
	]);
	(0, import_react.useEffect)(() => {
		if (hydrated || !profile || !user) return;
		setHydrated(true);
		if (profile.department_id) setDepartmentId(profile.department_id);
		if (profile.level) setLevel(profile.level);
		if (profile.onboarding_completed) supabase.from("user_courses").select("course_id").eq("user_id", user.id).then(({ data }) => {
			if (data?.length) setSelected(data.map((r) => r.course_id));
		});
	}, [
		hydrated,
		profile,
		user
	]);
	const department = departments.data?.find((d) => d.id === departmentId) ?? null;
	const { deptCourses, commonCourses } = (0, import_react.useMemo)(() => {
		const list = catalog.data ?? [];
		const q = query.trim().toLowerCase();
		const match = (c) => !q || c.course_name.toLowerCase().includes(q) || c.course_code.toLowerCase().includes(q);
		return {
			deptCourses: list.filter((c) => !c.is_common && match(c)),
			commonCourses: list.filter((c) => c.is_common && match(c))
		};
	}, [catalog.data, query]);
	const selectedCourses = (0, import_react.useMemo)(() => (catalog.data ?? []).filter((c) => selected.includes(c.id)), [catalog.data, selected]);
	const toggle = (id) => {
		setSelected((prev) => {
			if (prev.includes(id)) return prev.filter((x) => x !== id);
			if (prev.length >= 9) return prev;
			return [...prev, id];
		});
	};
	const handleFinish = async () => {
		if (!user || !departmentId || !level || selected.length !== 9) return;
		setSaving(true);
		try {
			const { error: delError } = await supabase.from("user_courses").delete().eq("user_id", user.id);
			if (delError) throw delError;
			const { error: insError } = await supabase.from("user_courses").insert(selected.map((course_id) => ({
				user_id: user.id,
				course_id
			})));
			if (insError) throw insError;
			const { error: profileError } = await supabase.from("profiles").update({
				department_id: departmentId,
				level,
				onboarding_completed: true
			}).eq("id", user.id);
			if (profileError) throw profileError;
			await refreshProfile();
			await invalidateMyCourses();
			toast.success("Your study space is ready");
			navigate({
				to: "/app",
				replace: true
			});
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not save your setup");
		} finally {
			setSaving(false);
		}
	};
	if (loading || !user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-background px-4 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-4xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 flex items-center justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg font-bold",
						children: "AceHub"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepIndicator, { step }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-soft mt-8 p-6 sm:p-8",
					children: [
						step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "py-6 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-accent-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-6 w-6" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: "mt-6 font-display text-3xl font-bold",
									children: [
										"Welcome",
										profile?.full_name ? `, ${profile.full_name.split(" ")[0]}` : "",
										"!"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mx-auto mt-3 max-w-md text-sm text-muted-foreground",
									children: "Let's set up your study space. In under a minute you'll pick your department, your level and the nine courses you're taking this semester — everything else in AceHub builds on that."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									className: "mt-8",
									size: "lg",
									onClick: () => setStep(1),
									children: ["Continue ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1.5 h-4 w-4" })]
								})
							]
						}),
						step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-2xl font-bold",
								children: "What are you studying?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Pick your department."
							}),
							departments.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-center py-12",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin text-muted-foreground" })
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
								children: departments.data?.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										if (d.id !== departmentId) setSelected([]);
										setDepartmentId(d.id);
									},
									className: cn("rounded-xl border border-border p-4 text-left transition-all hover:border-primary/60", departmentId === d.id && "border-primary bg-primary-soft/60 ring-1 ring-primary"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-medium text-muted-foreground",
										children: d.code
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm font-semibold",
										children: d.name
									})]
								}, d.id))
							})
						] }),
						step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-2xl font-bold",
								children: "What level are you in?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: [department?.name ?? "Your department", " — choose your current level."]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
								children: LEVELS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										if (l !== level) setSelected([]);
										setLevel(l);
									},
									className: cn("rounded-xl border border-border p-5 text-center transition-all hover:border-primary/60", level === l && "border-primary bg-primary-soft/60 ring-1 ring-primary"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-2xl font-bold",
										children: l
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: "Level"
									})]
								}, l))
							})
						] }),
						step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "font-display text-2xl font-bold",
									children: "Pick your courses"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: [
										department?.name,
										" · ",
										level,
										" Level — choose exactly ",
										9,
										" courses."
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: cn("rounded-full px-3 py-1.5 text-sm font-semibold", selected.length === 9 ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"),
									children: [
										selected.length,
										"/",
										9,
										" selected"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative mt-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: query,
									onChange: (e) => setQuery(e.target.value),
									placeholder: "Search by course name or code…",
									className: "pl-9"
								})]
							}),
							catalog.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-center py-12",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin text-muted-foreground" })
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseGrid, {
								heading: `${department?.name ?? "Department"} courses`,
								courses: deptCourses,
								selected,
								full: selected.length >= 9,
								onToggle: toggle
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseGrid, {
								heading: "Common / General courses",
								courses: commonCourses,
								selected,
								full: selected.length >= 9,
								onToggle: toggle
							})] })
						] }),
						step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-2xl font-bold",
								children: "Does this look right?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "You can change any of this later from Settings."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 grid gap-3 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryRow, {
									label: "Department",
									value: department?.name ?? "—",
									onEdit: () => setStep(1)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryRow, {
									label: "Level",
									value: level ? `${level} Level` : "—",
									onEdit: () => setStep(2)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "text-sm font-semibold",
									children: [
										"Your ",
										9,
										" courses"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setStep(3),
									className: "text-sm font-medium text-primary hover:underline",
									children: "Edit"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3",
								children: selectedCourses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-medium text-muted-foreground",
										children: c.course_code
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 text-sm font-semibold",
										children: c.course_name
									})]
								}, c.id))
							})
						] }),
						step > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex items-center justify-between border-t border-border pt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								onClick: () => setStep((s) => Math.max(0, s - 1)),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "mr-1.5 h-4 w-4" }), " Back"]
							}), step < 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => setStep((s) => s + 1),
								disabled: step === 1 && !departmentId || step === 2 && !level || step === 3 && selected.length !== 9,
								children: ["Continue ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1.5 h-4 w-4" })]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: handleFinish,
								disabled: saving || selected.length !== 9,
								children: [saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }) : null, "Finish setup"]
							})]
						})
					]
				})
			]
		})
	});
}
function SummaryRow({ label, value, onEdit }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between rounded-xl border border-border p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm font-semibold",
			children: value
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: onEdit,
			className: "text-sm font-medium text-primary hover:underline",
			children: "Edit"
		})]
	});
}
function CourseGrid({ heading, courses, selected, full, onToggle }) {
	if (courses.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
			children: heading
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
			children: courses.map((c) => {
				const isSelected = selected.includes(c.id);
				const disabled = full && !isSelected;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled,
					onClick: () => onToggle(c.id),
					className: cn("relative rounded-xl border border-border p-4 text-left transition-all", isSelected ? "border-primary bg-primary-soft/60 ring-1 ring-primary" : "hover:border-primary/60", disabled && "cursor-not-allowed opacity-45 hover:border-border"),
					children: [
						isSelected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" })
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium text-muted-foreground",
							children: c.course_code
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 pr-6 text-sm font-semibold leading-snug",
							children: c.course_name
						})
					]
				}, c.id);
			})
		})]
	});
}
//#endregion
export { Onboarding as component };
