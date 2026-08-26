import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-ChYpccUq.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as useAuth, n as initials } from "./router-HXcVjxpS.mjs";
import { n as Input, r as cn, t as Button } from "./button-CHSNwFnT.mjs";
import { C as LoaderCircle, S as LogOut } from "../_libs/lucide-react.mjs";
import { a as AvatarImage, i as AvatarFallback, r as Avatar, s as PageHeader } from "./app-shell-r4P_-mc-.mjs";
import { t as Label } from "./label-DHSY72pW.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.settings-E_6kzIDC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
function Settings() {
	const { user, profile, avatarSrc, refreshProfile, signOut } = useAuth();
	const navigate = useNavigate();
	const fileRef = (0, import_react.useRef)(null);
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [goal, setGoal] = (0, import_react.useState)(60);
	const [prefs, setPrefs] = (0, import_react.useState)({
		streak: true,
		flashcards: true,
		groups: false
	});
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!profile) return;
		setFullName(profile.full_name ?? "");
		setGoal(profile.daily_goal_minutes ?? 60);
		setPrefs({
			streak: profile.notify_streak,
			flashcards: profile.notify_flashcards,
			groups: profile.notify_groups
		});
	}, [profile]);
	const handleUpload = async (file) => {
		if (!user) return;
		if (!file.type.startsWith("image/")) {
			toast.error("Please choose an image file");
			return;
		}
		if (file.size > 5242880) {
			toast.error("Image must be under 5MB");
			return;
		}
		setUploading(true);
		try {
			const ext = file.name.split(".").pop() ?? "jpg";
			const path = `${user.id}/avatar-${Date.now()}.${ext}`;
			const { error: uploadError } = await supabase.storage.from("avatars").upload(path, file, {
				upsert: true,
				contentType: file.type
			});
			if (uploadError) throw uploadError;
			const { error } = await supabase.from("profiles").update({ avatar_url: path }).eq("id", user.id);
			if (error) throw error;
			await refreshProfile();
			toast.success("Profile photo updated");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Upload failed");
		} finally {
			setUploading(false);
		}
	};
	const handleSave = async () => {
		if (!user) return;
		setSaving(true);
		try {
			const { error } = await supabase.from("profiles").update({
				full_name: fullName,
				daily_goal_minutes: Number(goal) || 60,
				notify_streak: prefs.streak,
				notify_flashcards: prefs.flashcards,
				notify_groups: prefs.groups
			}).eq("id", user.id);
			if (error) throw error;
			await refreshProfile();
			toast.success("Settings saved");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not save settings");
		} finally {
			setSaving(false);
		}
	};
	const handleSignOut = async () => {
		await signOut();
		navigate({
			to: "/auth",
			replace: true,
			search: { mode: void 0 }
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Settings",
				subtitle: "Tune AceHub to fit the way you study."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card-soft p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-semibold",
						children: "Profile"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex items-center gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								className: "h-14 w-14",
								children: [avatarSrc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
									src: avatarSrc,
									alt: fullName || "Profile photo"
								}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
									className: "bg-primary text-sm font-semibold text-primary-foreground",
									children: initials(profile?.full_name, user?.email)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: fileRef,
								type: "file",
								accept: "image/*",
								className: "hidden",
								onChange: (e) => {
									const file = e.target.files?.[0];
									if (file) handleUpload(file);
									e.target.value = "";
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								disabled: uploading,
								onClick: () => fileRef.current?.click(),
								children: [uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : null, uploading ? "Uploading" : "Change photo"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "name",
								children: "Full name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "name",
								value: fullName,
								onChange: (e) => setFullName(e.target.value)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "email",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "email",
								type: "email",
								value: user?.email ?? "",
								disabled: true
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card-soft mt-6 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-semibold",
					children: "Study preferences"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "goal",
							children: "Daily study goal (minutes)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "goal",
							type: "number",
							min: 5,
							value: goal,
							onChange: (e) => setGoal(Number(e.target.value)),
							className: "max-w-40"
						})]
					}), [
						[
							"streak",
							"Daily streak reminder",
							"A nudge at 7pm if you haven't studied."
						],
						[
							"flashcards",
							"Flashcard due alerts",
							"Tell me when reviews pile up."
						],
						[
							"groups",
							"Study group activity",
							"New messages and shared notes."
						]
					].map(([key, title, body]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-4 border-t border-border pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: body
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: prefs[key],
							onCheckedChange: (v) => setPrefs((p) => ({
								...p,
								[key]: v
							}))
						})]
					}, key))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card-soft mt-6 flex flex-wrap items-center justify-between gap-4 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-semibold",
					children: "Department & courses"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Change your department, level or the nine courses on your dashboard."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/onboarding",
						children: "Edit course selection"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card-soft mt-6 flex flex-wrap items-center justify-between gap-4 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-semibold",
					children: "Account"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Sign out of AceHub on this device."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: handleSignOut,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Log out"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: handleSave,
					disabled: saving,
					children: [saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : null, "Save changes"]
				})
			})
		]
	});
}
//#endregion
export { Settings as component };
