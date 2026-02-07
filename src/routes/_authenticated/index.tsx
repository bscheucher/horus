import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/")({
	component: HomePage,
});

function HomePage() {
	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<h1 className="text-3xl font-bold text-[#0066B3]">Home</h1>
			<p>Welcome to the Teilnehmer-Portal!</p>
		</div>
	);
}
