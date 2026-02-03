import { InteractionStatus } from "@azure/msal-browser";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import {
	createFileRoute,
	Link,
	Outlet,
	useRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useUserStore } from "../stores/userStore";

export const Route = createFileRoute("/_authenticated")({
	component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
	const { inProgress } = useMsal();
	const isAuthenticated = useIsAuthenticated();
	const router = useRouter();
	const { logout } = useAuth();
	const user = useUserStore((s) => s.user);

	useEffect(() => {
		if (!isAuthenticated && inProgress === InteractionStatus.None) {
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
					{user?.name && (
						<span className="text-white text-sm">{user.name}</span>
					)}
					<button
						type="button"
						onClick={logout}
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
