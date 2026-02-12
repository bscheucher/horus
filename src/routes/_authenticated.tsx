import {
	createFileRoute,
	Link,
	Outlet,
	redirect,
	useNavigate,
} from "@tanstack/react-router";
import { isAuthenticated, setAuthenticated } from "../lib/auth";

const navItems = [
	{ to: "/dashboard", label: "Dashboard" },
	{ to: "/upload", label: "Upload" },
] as const;

const navLinkClassName =
	"text-white hover:text-ibis-yellow [&.active]:font-bold [&.active]:text-ibis-yellow";

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
				{navItems.map((item) => (
					<Link key={item.to} to={item.to} className={navLinkClassName}>
						{item.label}
					</Link>
				))}
				<button
					type="button"
					onClick={handleLogout}
					className="text-white hover:text-ibis-yellow"
				>
					Logout
				</button>
			</nav>
			<header className="bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<div className="flex items-center justify-between">
						<img
							src="/aspire-logo.svg"
							alt="Aspire Logo"
							className="h-12 w-auto"
						/>
						<img
							src="/ibis-acam-logo.svg"
							alt="ibis acam Logo"
							className="h-12 w-auto"
						/>
					</div>
				</div>
			</header>
			{/* Child routes render here */}

			<Outlet />
		</>
	);
}
