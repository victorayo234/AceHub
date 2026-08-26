import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-ChYpccUq.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { d as useRouterState, v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as useAuth } from "./router-HXcVjxpS.mjs";
import { n as Input, r as cn, t as Button } from "./button-CHSNwFnT.mjs";
import { B as ArrowLeft, C as LoaderCircle, D as GraduationCap, v as Minus, x as Mail } from "../_libs/lucide-react.mjs";
import { t as ThemeToggle } from "./theme-toggle-s5yvLFP3.mjs";
import { t as Label } from "./label-DHSY72pW.mjs";
import { n as jt, t as Lt } from "../_libs/input-otp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-G5__dUDp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var InputOTP = import_react.forwardRef(({ className, containerClassName, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lt, {
	ref,
	containerClassName: cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName),
	className: cn("disabled:cursor-not-allowed", className),
	...props
}));
InputOTP.displayName = "InputOTP";
var InputOTPGroup = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex items-center", className),
	...props
}));
InputOTPGroup.displayName = "InputOTPGroup";
var InputOTPSlot = import_react.forwardRef(({ index, className, ...props }, ref) => {
	const { char, hasFakeCaret, isActive } = import_react.useContext(jt).slots[index] ?? {
		char: null,
		hasFakeCaret: false,
		isActive: false
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: cn("relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md", isActive && "z-10 ring-1 ring-ring", className),
		...props,
		children: [char, hasFakeCaret && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute inset-0 flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-px animate-caret-blink bg-foreground duration-1000" })
		})]
	});
});
InputOTPSlot.displayName = "InputOTPSlot";
var InputOTPSeparator = import_react.forwardRef(({ ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	role: "separator",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {})
}));
InputOTPSeparator.displayName = "InputOTPSeparator";
function AuthPage() {
	const navigate = useNavigate();
	const { session, loading } = useAuth();
	const search = useRouterState({ select: (s) => s.location.search });
	const [mode, setMode] = (0, import_react.useState)(search?.mode === "signup" ? "signup" : "signin");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [code, setCode] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!loading && session) navigate({
			to: "/app",
			replace: true
		});
	}, [
		session,
		loading,
		navigate
	]);
	const wrap = (fn) => async (e) => {
		e.preventDefault();
		setBusy(true);
		try {
			await fn();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setBusy(false);
		}
	};
	const handleSignIn = wrap(async () => {
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		if (error) {
			if (error.message.toLowerCase().includes("not confirmed")) {
				await supabase.auth.resend({
					type: "signup",
					email
				});
				setMode("verify");
				toast.message("Confirm your email", { description: "We sent you a verification code." });
				return;
			}
			throw error;
		}
		toast.success("Welcome back");
		navigate({
			to: "/app",
			replace: true
		});
	});
	const handleSignUp = wrap(async () => {
		if (password.length < 8) throw new Error("Password must be at least 8 characters");
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${window.location.origin}/app`,
				data: { full_name: name }
			}
		});
		if (error) throw error;
		if (data.session) {
			navigate({
				to: "/app",
				replace: true
			});
			return;
		}
		setMode("verify");
		toast.message("Check your inbox", { description: "We emailed you a verification code." });
	});
	const handleVerify = wrap(async () => {
		const { error } = await supabase.auth.verifyOtp({
			email,
			token: code,
			type: "signup"
		});
		if (error) throw error;
		toast.success("Email verified");
		navigate({
			to: "/app",
			replace: true
		});
	});
	const handleForgot = wrap(async () => {
		const { error } = await supabase.auth.signInWithOtp({
			email,
			options: { shouldCreateUser: false }
		});
		if (error) throw error;
		setMode("reset");
		toast.message("Code sent", { description: "Enter the code from your email to reset your password." });
	});
	const handleReset = wrap(async () => {
		if (password.length < 8) throw new Error("Password must be at least 8 characters");
		const { error } = await supabase.auth.verifyOtp({
			email,
			token: code,
			type: "email"
		});
		if (error) throw error;
		const { error: updateError } = await supabase.auth.updateUser({ password });
		if (updateError) throw updateError;
		toast.success("Password updated");
		navigate({
			to: "/app",
			replace: true
		});
	});
	const handleGoogle = async () => {
		setBusy(true);
		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: "google",
				options: { redirectTo: `${window.location.origin}/app` }
			});
			if (error) toast.error(error.message ?? "Google sign-in failed");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Google sign-in failed");
		} finally {
			setBusy(false);
		}
	};
	const copy = {
		signin: {
			title: "Welcome back",
			sub: "Sign in to pick up where you left off."
		},
		signup: {
			title: "Create your account",
			sub: "Start turning notes into flashcards in minutes."
		},
		verify: {
			title: "Verify your email",
			sub: `Enter the 6-digit code we sent to ${email}.`
		},
		forgot: {
			title: "Reset your password",
			sub: "We'll email you a one-time code."
		},
		reset: {
			title: "Set a new password",
			sub: `Enter the code sent to ${email} and your new password.`
		}
	}[mode];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 md:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "flex items-center gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-[18px] w-[18px]" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-lg font-bold tracking-tight",
					children: "AceHub"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "flex flex-1 items-center justify-center px-4 py-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-soft w-full max-w-md p-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold tracking-tight",
						children: copy.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-sm text-muted-foreground",
						children: copy.sub
					}),
					(mode === "signin" || mode === "signup") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "mt-6 w-full",
						onClick: handleGoogle,
						disabled: busy,
						type: "button",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleMark, {}), " Continue with Google"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "my-5 flex items-center gap-3 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
							" or use email ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "space-y-4",
						onSubmit: mode === "signin" ? handleSignIn : mode === "signup" ? handleSignUp : mode === "verify" ? handleVerify : mode === "forgot" ? handleForgot : handleReset,
						children: [
							mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "name",
									children: "Full name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "name",
									value: name,
									onChange: (e) => setName(e.target.value),
									required: true,
									placeholder: "Ada Okoye"
								})]
							}),
							(mode === "signin" || mode === "signup" || mode === "forgot") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "email",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "email",
									type: "email",
									autoComplete: "email",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									required: true,
									placeholder: "you@university.edu"
								})]
							}),
							(mode === "verify" || mode === "reset") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Verification code" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputOTP, {
										maxLength: 6,
										value: code,
										onChange: setCode,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputOTPGroup, { children: [
											0,
											1,
											2,
											3,
											4,
											5
										].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputOTPSlot, { index: i }, i)) })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Didn't get it? Check spam — or click the confirmation link in the email."
									})
								]
							}),
							(mode === "signin" || mode === "signup" || mode === "reset") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "password",
										children: mode === "reset" ? "New password" : "Password"
									}), mode === "signin" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "text-xs font-medium text-primary hover:underline",
										onClick: () => setMode("forgot"),
										children: "Forgot password?"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "password",
									type: "password",
									autoComplete: mode === "signin" ? "current-password" : "new-password",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									required: true,
									placeholder: "••••••••"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "submit",
								className: "w-full",
								disabled: busy,
								children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : null, mode === "signin" ? "Sign in" : mode === "signup" ? "Create account" : mode === "verify" ? "Verify email" : mode === "forgot" ? "Send code" : "Update password"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 text-center text-sm text-muted-foreground",
						children: [
							mode === "signin" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								"New to AceHub?",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "font-medium text-primary hover:underline",
									onClick: () => setMode("signup"),
									children: "Create an account"
								})
							] }),
							mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								"Already have an account?",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "font-medium text-primary hover:underline",
									onClick: () => setMode("signin"),
									children: "Sign in"
								})
							] }),
							(mode === "verify" || mode === "forgot" || mode === "reset") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "inline-flex items-center gap-1.5 font-medium text-primary hover:underline",
								onClick: () => {
									setCode("");
									setMode("signin");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), " Back to sign in"]
							})
						]
					}),
					mode === "verify" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "mt-3 flex w-full items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground",
						onClick: async () => {
							await supabase.auth.resend({
								type: "signup",
								email
							});
							toast.success("Code resent");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3.5 w-3.5" }), " Resend code"]
					})
				]
			})
		})]
	});
}
function GoogleMark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		className: "h-4 w-4",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#4285F4",
				d: "M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.4a5.5 5.5 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.6-5.2 3.6-8.8z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#34A853",
				d: "M12 24c3.2 0 6-1.1 8-2.9l-3.9-3a7.2 7.2 0 0 1-10.7-3.8H1.4v3.1A12 12 0 0 0 12 24z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#FBBC05",
				d: "M5.4 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.4a12 12 0 0 0 0 10.8l4-3.1z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#EA4335",
				d: "M12 4.8c1.8 0 3.4.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.4 6.6l4 3.1A7.2 7.2 0 0 1 12 4.8z"
			})
		]
	});
}
//#endregion
export { AuthPage as component };
