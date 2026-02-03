import { useIsAuthenticated } from "@azure/msal-react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
	component: IndexPage,
});

function IndexPage() {
	const navigate = useNavigate();
	const isAuthenticated = useIsAuthenticated();

	useEffect(() => {
		if (isAuthenticated) {
			navigate({ to: "/dashboard" });
		} else {
			navigate({ to: "/login" });
		}
	}, [isAuthenticated, navigate]);

	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="text-lg">Loading...</div>
		</div>
	);
}
