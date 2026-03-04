import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PageWrapper } from "../../components/PageWrapper.tsx";

export const Route = createFileRoute("/_authenticated/")({
	component: HomePage,
});

function HomePage() {
	const { t } = useTranslation();
	return (
		<PageWrapper title={t("home.title")}>
			<p>{t("home.welcome")}</p>
		</PageWrapper>
	);
}
