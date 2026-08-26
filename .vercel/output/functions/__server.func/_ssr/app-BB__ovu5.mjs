import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { i as useAuth } from "./router-HXcVjxpS.mjs";
import { C as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as AppShell } from "./app-shell-r4P_-mc-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-BB__ovu5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AppGate() {
	const { session, profile, loading } = useAuth();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (loading) return;
		if (!session) {
			navigate({
				to: "/auth",
				replace: true,
				search: { mode: void 0 }
			});
			return;
		}
		if (profile && !profile.onboarding_completed) navigate({
			to: "/onboarding",
			replace: true
		});
	}, [
		loading,
		session,
		profile,
		navigate
	]);
	if (loading || !session || profile && !profile.onboarding_completed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {});
}
//#endregion
export { AppGate as component };
