import { InteractionStatus } from "@azure/msal-browser";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
	component: IndexPage,
});

function IndexPage() {
	const navigate = useNavigate();
	const isAuthenticated = useIsAuthenticated();
	const { inProgress } = useMsal();

	useEffect(() => {
		// Wait until MSAL finishes any in-progress interactions
		if (inProgress !== InteractionStatus.None) return;

		if (isAuthenticated) {
			navigate({ to: "/dashboard" });
		} else {
			navigate({ to: "/login" });
		}
	}, [isAuthenticated, inProgress, navigate]);

	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="text-lg">Loading...</div>
		</div>
	);
}
