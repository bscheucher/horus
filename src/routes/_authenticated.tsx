import {
	createFileRoute,
	Link,
	Outlet,
	redirect,
	useNavigate,
} from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
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
	const { t } = useTranslation();

	const handleLogout = () => {
		setAuthenticated(false);
		navigate({ to: "/login" });
	};

	return (
		<>
			{/* Navigation for authenticated pages */}
			<nav className="flex gap-6 bg-ibis-blue-dark px-6 py-3">
				<Link
					to="/dashboard"
					className="text-white hover:text-ibis-yellow [&.active]:font-bold [&.active]:text-ibis-yellow"
				>
					{t("nav.dashboard")}
				</Link>
				<Link
					to="/upload"
					className="text-white hover:text-ibis-yellow [&.active]:font-bold [&.active]:text-ibis-yellow"
				>
					{t("nav.upload")}
				</Link>
				<button
					type="button"
					onClick={handleLogout}
					className="text-white hover:text-ibis-yellow"
				>
					{t("nav.logout")}
				</button>
			</nav>
			<header className="bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<div className="flex items-center justify-between">
						<img
							src="/aspire-logo.svg"
							alt={t("common.aspireLogoAlt")}
							className="h-12 w-auto"
						/>
						<img
							src="/ibis-acam-logo.svg"
							alt={t("common.ibisAcamLogoAlt")}
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
