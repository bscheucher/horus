import { InteractionStatus } from "@azure/msal-browser";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import {
	createFileRoute,
	Link,
	Outlet,
	useRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated")({
	component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
	const { instance, inProgress, accounts } = useMsal();
	const isAuthenticated = useIsAuthenticated();
	const router = useRouter();

	useEffect(() => {
		if (!isAuthenticated && inProgress === InteractionStatus.None) {
			// Redirect to login page instead of MSAL redirect
			router.navigate({ to: "/login" });
		}
	}, [isAuthenticated, inProgress, router]);

	// Show loading while auth is in progress
	if (inProgress !== InteractionStatus.None) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-lg">Authentifizierung läuft...</div>
			</div>
		);
	}

	// Don't render content until authenticated
	if (!isAuthenticated) {
		return null;
	}

	const handleLogout = async () => {
		try {
			await instance.logoutRedirect({
				postLogoutRedirectUri: "/login",
			});
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
		<>
			{/* Navigation for authenticated pages */}
			<nav className="flex items-center justify-between bg-ibis-blue-dark px-6 py-3">
				<div className="flex gap-6">
					<Link
						to="/"
						className="text-white hover:text-ibis-yellow [&.active]:font-bold [&.active]:text-ibis-yellow"
					>
						Home
					</Link>
					<Link
						to="/dashboard"
						className="text-white hover:text-ibis-yellow [&.active]:font-bold [&.active]:text-ibis-yellow"
					>
						Dashboard
					</Link>
				</div>

				<div className="flex items-center gap-4">
					{accounts[0]?.name && (
						<span className="text-white text-sm">{accounts[0].name}</span>
					)}
					<button
						type="button"
						onClick={handleLogout}
						className="text-white hover:text-ibis-yellow transition-colors"
					>
						Abmelden
					</button>
				</div>
			</nav>
			<Outlet />
		</>
	);
}
