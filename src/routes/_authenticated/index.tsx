import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/_authenticated/")({
	component: HomePage,
});

function HomePage() {
	const { t } = useTranslation();

	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<h1 className="text-3xl font-bold text-[#0066B3]">{t("home.title")}</h1>
			<p>{t("home.welcome")}</p>
		</div>
	);
}
