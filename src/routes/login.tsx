import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/login")({
	component: LoginPage,
});

function LoginPage() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const { t } = useTranslation();

	const handleLogin = () => {
		setLoading(true);
		navigate({ to: "/mock-azure-login" });
	};

	return (
		<div className="flex min-h-[100svh] flex-col justify-center bg-white px-6 py-8 sm:py-12 lg:px-8">
			<div className="flex justify-center transition-all">
				<div className="h-24 sm:h-40">
					<img
						src="/aspire-logo.svg"
						alt="Aspire Logo"
						className="h-full w-auto"
					/>
				</div>
			</div>

			<div className="mt-8 sm:mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
				<div className="flex flex-col items-center rounded-xl bg-white p-6 sm:p-12 sm:shadow-lg sm:border sm:border-ibis-gray-light">
					<div className="mb-10 flex w-32 sm:w-40">
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
						className="w-full rounded-md bg-ibis-blue px-6 py-4 sm:py-3 text-base sm:text-lg font-semibold text-white shadow-sm hover:bg-ibis-blue-light active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 transition-all"
					>
						{loading ? t("login.redirecting") : t("login.loginWithAzure")}
					</button>
				</div>
			</div>
		</div>
	);
}
