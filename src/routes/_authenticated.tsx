import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { authService } from "../lib/auth";

export const Route = createFileRoute("/_authenticated")({
	beforeLoad: async () => {
		// Ensure MSAL is initialized and any redirect response is handled
		await authService.initialize();

		if (!authService.isAuthenticated()) {
			throw redirect({ to: "/login" });
		}
	},
	component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
	return <Outlet />;
}
