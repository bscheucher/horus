import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard")({
	component: Dashboard,
});

function Dashboard() {
	return (
		<div className="min-h-screen bg-gray-50">
			<header className="bg-white shadow-sm border-b border-gray-200">
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

			<main className="flex items-center justify-center px-4 py-16 sm:py-24">
				<div className="text-center max-w-3xl">
					<div className="mb-8">
						<h1 className="text-5xl sm:text-6xl font-bold text-ibis-blue mb-4">
							Teilnehmer-Portal
						</h1>
					</div>

					<div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
						<h3 className="text-2xl font-semibold text-ibis-blue mb-3">
							Welcome to the Construction Site
						</h3>
						<p className="text-gray-600">
							We're working hard to bring you an amazing experience. Stay tuned
							for updates!
						</p>
					</div>
				</div>
			</main>
		</div>
	);
}
