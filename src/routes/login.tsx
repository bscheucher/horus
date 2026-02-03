import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { loginRequest } from "../config/authConfig";

export const Route = createFileRoute("/login")({
	component: LoginPage,
});

function LoginPage() {
	const navigate = useNavigate();
	const { instance } = useMsal();
	const isAuthenticated = useIsAuthenticated();
	const [loading, setLoading] = useState(false);

	// Redirect to dashboard if already authenticated
	useEffect(() => {
		if (isAuthenticated) {
			navigate({ to: "/dashboard" });
		}
	}, [isAuthenticated, navigate]);

	const handleLogin = async () => {
		setLoading(true);
		try {
			await instance.loginRedirect(loginRequest);
			// After redirect, user will return to the origin (localhost:3000)
			// Then navigate to dashboard
		} catch (error) {
			console.error("Login failed:", error);
			setLoading(false);
		}
	};

	return (
		<div className="flex min-h-[calc(100vh-48px)] flex-1 flex-col justify-center bg-white py-12 sm:px-6 lg:px-8">
			<div className="flex justify-center">
				<div className="h-40">
					<img
						src="/aspire-logo.svg"
						alt="Aspire Logo"
						className="h-full w-auto"
					/>
				</div>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
				<div className="flex flex-col items-center rounded-lg bg-white px-4 py-12 shadow-lg border border-ibis-gray-light sm:px-12">
					<div className="mb-8 flex w-40">
						<img
							src="/ibis-acam-logo.svg"
							alt="ibis acam Logo"
							className="h-auto w-full"
						/>
					</div>

					<button
						type="button"
						onClick={handleLogin}
						disabled={loading}
						className="w-full rounded-md bg-ibis-blue px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-ibis-blue-light active:bg-ibis-blue-dark disabled:cursor-not-allowed disabled:opacity-60 transition-colors"
					>
						{loading
							? "Sie werden weitergeleitet..."
							: "Mit Azure SSO einloggen"}
					</button>
				</div>
			</div>
		</div>
	);
}
