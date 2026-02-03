import { InteractionStatus } from "@azure/msal-browser";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { loginRequest } from "../config/authConfig";
import { useAuth } from "../hooks/useAuth";
import { useUserStore } from "../stores/userStore";

export const Route = createFileRoute("/login")({
	component: LoginPage,
});

function LoginPage() {
	const navigate = useNavigate();
	const { instance, inProgress } = useMsal();
	const isAuthenticated = useIsAuthenticated();
	const { fetchAndStoreUser } = useAuth();
	const user = useUserStore((s) => s.user);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const hasHandledRedirect = useRef(false);

	// After MSAL redirect completes and user is authenticated,
	// fetch user data from backend and redirect to dashboard
	useEffect(() => {
		if (
			isAuthenticated &&
			inProgress === InteractionStatus.None &&
			!hasHandledRedirect.current
		) {
			hasHandledRedirect.current = true;

			// If user data is already in the store (restored from cookie), go straight to dashboard
			if (user) {
				navigate({ to: "/dashboard" });
				return;
			}

			// Otherwise fetch user data from backend
			setLoading(true);
			fetchAndStoreUser()
				.then(() => {
					navigate({ to: "/dashboard" });
				})
				.catch((err) => {
					console.error("Post-login user fetch failed:", err);
					setError(
						"Benutzerdaten konnten nicht geladen werden. Bitte versuchen Sie es erneut.",
					);
					setLoading(false);
				});
		}
	}, [isAuthenticated, inProgress, user, fetchAndStoreUser, navigate]);

	const handleLogin = async () => {
		setLoading(true);
		setError(null);
		try {
			await instance.loginRedirect(loginRequest);
		} catch (err) {
			console.error("Login failed:", err);
			setError("Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.");
			setLoading(false);
		}
	};

	// Show loading while MSAL processes the redirect
	if (inProgress !== InteractionStatus.None) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-white">
				<div className="text-lg text-gray-600">Authentifizierung läuft...</div>
			</div>
		);
	}

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

					{error && (
						<div className="mb-4 w-full rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
							{error}
						</div>
					)}

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
