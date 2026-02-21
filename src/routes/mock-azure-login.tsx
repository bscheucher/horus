import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { setAuthenticated } from "../lib/auth";

export const Route = createFileRoute("/mock-azure-login")({
	component: AzureLoginPage,
});

type LoginStep = "username" | "password";

const USERNAME_PATTERN = /^[a-zA-ZäöüÄÖÜß]+\.[a-zA-ZäöüÄÖÜß]+@ibisacam\.at$/;

function validatePassword(password: string): boolean {
	return (
		password.length >= 8 &&
		/[A-Z]/.test(password) &&
		/[a-z]/.test(password) &&
		/[0-9]/.test(password) &&
		/[^A-Za-z0-9]/.test(password)
	);
}

function AzureLoginPage() {
	const navigate = useNavigate();
	const [step, setStep] = useState<LoginStep>("username");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [usernameError, setUsernameError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [loading, setLoading] = useState(false);
	const usernameInputRef = useRef<HTMLInputElement>(null);
	const passwordInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (step === "username") {
			usernameInputRef.current?.focus();
		} else {
			passwordInputRef.current?.focus();
		}
	}, [step]);

	const handleUsernameSubmit = () => {
		if (!USERNAME_PATTERN.test(username)) {
			setUsernameError("Kein Konto mit diesem Benutzernamen gefunden.");
			return;
		}
		setUsernameError("");
		setStep("password");
	};

	const handlePasswordSubmit = async () => {
		if (!validatePassword(password)) {
			setPasswordError(
				"Das Kennwort ist nicht korrekt. Versuchen Sie es noch mal.",
			);
			return;
		}
		setPasswordError("");
		setLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 1500));
		setAuthenticated(true);
		await navigate({ to: "/upload" });
	};

	const handleBack = () => {
		setStep("username");
		setPassword("");
		setPasswordError("");
	};

	const derivedEmail = username.includes("@")
		? `${username.split("@")[0]}@ibisacam.at`
		: "";

	return (
		<div className="flex min-h-screen">
			<div className="hidden md:flex md:w-[62%] bg-[#00b7c3] items-start p-6">
				<img
					src="/spock-logo.svg"
					alt="SPOCK"
					className="h-8"
					onError={(e) => {
						const target = e.currentTarget;
						target.style.display = "none";
						const fallback = target.nextElementSibling as HTMLElement;
						if (fallback) fallback.style.display = "flex";
					}}
				/>
				<div
					className="items-center gap-1.5 hidden"
					style={{ display: "none" }}
				>
					<span className="text-white text-xl font-bold tracking-wide">
						SPOCK
					</span>
				</div>
			</div>

			<div className="flex-1 flex flex-col justify-center px-8 sm:px-16 bg-white min-h-screen">
				<div className="w-full max-w-sm mx-auto">
					<div>
						<div className="flex items-center gap-1.5">
							<img
								src="/spock-logo.svg"
								alt="SPOCK"
								className="h-8"
								onError={(e) => {
									const target = e.currentTarget;
									target.style.display = "none";
									const fallback = target.nextElementSibling as HTMLElement;
									if (fallback) fallback.style.display = "flex";
								}}
							/>
						</div>
					</div>

					{step === "username" && (
						<div>
							<h1 className="text-2xl font-light text-gray-900 mb-6">
								Anmelden
							</h1>

							{usernameError && (
								<p className="text-red-600 text-sm mb-2">{usernameError}</p>
							)}

							<input
								ref={usernameInputRef}
								type="text"
								value={username}
								onChange={(e) => {
									setUsername(e.target.value);
									setUsernameError("");
								}}
								onKeyDown={(e) => e.key === "Enter" && handleUsernameSubmit()}
								placeholder="username@ibisacam.at"
								className={`w-full border-b-2 ${usernameError ? "border-red-600" : "border-gray-300 focus:border-[#0067b8]"} outline-none py-2 text-sm text-gray-900 placeholder-gray-400 bg-transparent`}
							/>

							<div className="flex justify-end mt-8">
								<button
									type="button"
									onClick={handleUsernameSubmit}
									className="bg-[#0067b8] hover:bg-[#005da6] text-white px-10 py-2 text-sm font-semibold"
								>
									Weiter
								</button>
							</div>
						</div>
					)}

					{step === "password" && (
						<div>
							<button
								type="button"
								onClick={handleBack}
								className="flex items-center gap-2 text-sm text-gray-700 mb-4 hover:underline"
							>
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
								>
									<title>Back</title>
									<path d="M19 12H5M12 19l-7-7 7-7" />
								</svg>
								{derivedEmail}
							</button>

							<h1 className="text-2xl font-light text-gray-900 mb-6">
								Kennwort eingeben
							</h1>

							{passwordError && (
								<p className="text-red-600 text-sm mb-2">{passwordError}</p>
							)}

							<input
								ref={passwordInputRef}
								type="password"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
									setPasswordError("");
								}}
								onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit()}
								className={`w-full border-b-2 ${passwordError ? "border-red-600" : "border-gray-300 focus:border-[#0067b8]"} outline-none py-2 text-sm text-gray-900 bg-transparent`}
							/>

							<div className="flex justify-end mt-8">
								<button
									type="button"
									onClick={handlePasswordSubmit}
									disabled={loading}
									className="bg-[#0067b8] hover:bg-[#005da6] text-white px-10 py-2 text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
								>
									{loading ? "Wird angemeldet..." : "Anmelden"}
								</button>
							</div>
						</div>
					)}
				</div>

				<div className="absolute bottom-4 right-4 flex items-center gap-6 text-xs text-gray-500">
					<button type="button" className="hover:underline">
						Nutzungsbedingungen
					</button>
					<button type="button" className="hover:underline">
						Datenschutz und Cookies
					</button>
					<span>...</span>
				</div>
			</div>
		</div>
	);
}
