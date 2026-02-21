import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Card } from "../../components/Card.tsx";
import { PageWrapper } from "../../components/PageWrapper.tsx";

export const Route = createFileRoute("/_authenticated/dashboard")({
	component: Dashboard,
});

function Dashboard() {
	const { t } = useTranslation();
	return (
		<PageWrapper title={t("dashboard.title")} centerTitle>
			<div className="flex justify-center">
				<Card className="max-w-2xl w-full">
					<h3 className="text-2xl font-semibold text-ibis-blue mb-3">
						{t("dashboard.subtitle")}
					</h3>
					<p className="text-gray-600">{t("dashboard.description")}</p>
				</Card>
			</div>
		</PageWrapper>
	);
}
