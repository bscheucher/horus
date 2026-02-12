import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/_authenticated/dashboard")({
	component: Dashboard,
});

function Dashboard() {
	const { t } = useTranslation();

	return (
		<div className="min-h-screen bg-white">
			<main className="flex items-center justify-center px-4 py-16 sm:py-24">
				<div className="text-center max-w-3xl">
					<div className="mb-8">
						<h1 className="text-5xl sm:text-6xl font-bold text-ibis-blue mb-4">
							{t("dashboard.title")}
						</h1>
					</div>

					<div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
						<h3 className="text-2xl font-semibold text-ibis-blue mb-3">
							{t("dashboard.subtitle")}
						</h3>
						<p className="text-gray-600">
							{t("dashboard.description")}
						</p>
					</div>
				</div>
			</main>
		</div>
	);
}
