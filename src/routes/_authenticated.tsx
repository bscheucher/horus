// src/routes/_authenticated.tsx
import {
	createFileRoute,
	Link,
	Outlet,
	redirect,
	useNavigate,
} from "@tanstack/react-router";
import { isAuthenticated, setAuthenticated } from "../lib/auth";

export const Route = createFileRoute("/_authenticated")({
	beforeLoad: () => {
		if (!isAuthenticated()) {
			throw redirect({ to: "/login" });
		}
	},
	component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
	const navigate = useNavigate();

	const handleLogout = () => {
		setAuthenticated(false);
		navigate({ to: "/login" });
	};

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
				<button
					type="button"
					onClick={handleLogout}
					className="text-white hover:text-ibis-yellow"
				>
					Logout
				</button>
			</nav>

			{/* Child routes render here */}
			<Outlet />
		</>
	);
}
