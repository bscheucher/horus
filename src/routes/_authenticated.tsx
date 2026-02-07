// src/routes/_authenticated.tsx
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
	component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
	return (
		<>
			{/* Navigation for authenticated pages */}
			<nav className="flex gap-6 bg-ibis-blue-dark px-6 py-3">
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
				<Link
					to="/login"
					className="text-white hover:text-ibis-yellow [&.active]:font-bold [&.active]:text-ibis-yellow"
				>
					Logout
				</Link>
			</nav>

			{/* Child routes render here */}
			<Outlet />
		</>
	);
}
