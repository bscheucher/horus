import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { z } from "zod/v4";
import { PageContainer } from "../../components/PageContainer";

const uploadConfirmationSearchSchema = z.object({
	start: z.string(),
	end: z.string(),
	firstName: z.string(),
	lastName: z.string(),
});

export const Route = createFileRoute("/_authenticated/upload-confirmation")({
	validateSearch: uploadConfirmationSearchSchema,
	component: UploadConfirmationPage,
});

function UploadConfirmationPage() {
	const { start, end, firstName, lastName } = Route.useSearch();
	const { t } = useTranslation();

	return (
		<PageContainer>
			<div className="card bg-base-100 shadow-xl border border-gray-200">
				<div className="card-body">
					<div className="flex items-center gap-3 mb-4">
						<svg
							className="h-8 w-8 text-success"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<title>{t("uploadConfirmation.successTitle")}</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<h2 className="card-title text-2xl">{t("uploadConfirmation.title")}</h2>
					</div>

					<p className="text-base-content/70 mb-6">
						{t("uploadConfirmation.message")}
					</p>

					<div className="bg-base-200 rounded-lg p-6 space-y-4">
						<div className="flex justify-between items-center">
							<span className="font-medium">{t("common.firstName")}</span>
							<span className="text-lg">{firstName}</span>
						</div>
						<div className="divider my-0" />
						<div className="flex justify-between items-center">
							<span className="font-medium">{t("common.lastName")}</span>
							<span className="text-lg">{lastName}</span>
						</div>
						<div className="divider my-0" />
						<div className="flex justify-between items-center">
							<span className="font-medium">{t("common.startDate")}</span>
							<span className="text-lg">{start}</span>
						</div>
						<div className="divider my-0" />
						<div className="flex justify-between items-center">
							<span className="font-medium">{t("common.endDate")}</span>
							<span className="text-lg">{end}</span>
						</div>
					</div>
					<div className="card-actions mt-6">
						<Link to="/upload" className="btn btn-primary w-full">
							{t("uploadConfirmation.uploadAnother")}
						</Link>
					</div>
				</div>
			</div>
		</PageContainer>
	);
}
