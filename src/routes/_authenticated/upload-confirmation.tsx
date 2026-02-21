import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { BackgroundDecorations } from "../../components/BackgroundDecorations.tsx";
import { PlusIcon, SuccessCheckIcon } from "../../components/Icons";
import { PageWrapper } from "../../components/PageWrapper.tsx";
import { UploadProgress } from "../../components/UploadProgress.tsx";
import { uploadDataSchema } from "../../lib/types/upload.ts";

export const Route = createFileRoute("/_authenticated/upload-confirmation")({
	validateSearch: uploadDataSchema,
	component: UploadConfirmationPage,
});

function UploadConfirmationPage() {
	const search = Route.useSearch();
	const { t } = useTranslation();

	const renderDataPoint = (
		label: string,
		value: string,
		fullWidth: boolean = false,
	) => (
		<div
			className={`flex flex-col gap-1 ${fullWidth ? "col-span-full" : "col-span-full sm:col-span-1"}`}
		>
			<span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
				{label}
			</span>
			<div className="rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200/50">
				<span className="text-sm font-semibold text-slate-700">
					{value || "—"}
				</span>
			</div>
		</div>
	);

	return (
		<PageWrapper>
			<div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-50 via-slate-50 to-white pb-12">
				<BackgroundDecorations
					topRightClass="bg-green-100/40"
					bottomLeftClass="bg-blue-100/30"
				/>

				<div className="relative mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 pt-8 sm:pt-12">
					<header className="flex flex-col gap-2">
						<div className="flex items-center gap-3">
							<div className="h-2 w-12 rounded-full bg-green-500" />
							<h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
								{t("uploadConfirmation.successTitle")}
							</h1>
						</div>
					</header>

					<div className="rounded-2xl bg-white/60 p-1 shadow-sm ring-1 ring-slate-200/50 backdrop-blur-md">
						<UploadProgress currentStep={3} />
					</div>

					<main className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-blue-900/5 ring-1 ring-slate-200">
						<div className="p-6 sm:p-8">
							<div className="mb-8 flex flex-col items-center justify-center rounded-2xl bg-green-50/50 p-6 text-center ring-1 ring-green-100/50">
								<div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md shadow-green-200/50">
									<SuccessCheckIcon className="h-8 w-8 text-green-500" />
								</div>
								<h2 className="text-lg font-bold text-slate-800">
									{t("uploadConfirmation.title")}
								</h2>
								<p className="mt-1 text-sm leading-relaxed text-slate-500">
									{t("uploadConfirmation.message")}
								</p>
							</div>

							<div className="grid grid-cols-2 gap-x-4 gap-y-5">
								{renderDataPoint(t("common.firstName"), search.firstName)}
								{renderDataPoint(t("common.lastName"), search.lastName)}
								{renderDataPoint(
									t("common.insuranceNumber"),
									search.insuranceNumber,
									true,
								)}
								{renderDataPoint(t("common.startDate"), search.start)}
								{renderDataPoint(t("common.endDate"), search.end)}
							</div>

							<div className="mt-10 border-t border-slate-100 pt-8">
								<Link
									to="/upload"
									className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-8 py-4 text-center text-lg font-bold text-white transition-all hover:bg-slate-800 active:scale-[0.99]"
								>
									<span>{t("uploadConfirmation.uploadAnother")}</span>
									<PlusIcon className="h-5 w-5 opacity-50 transition-transform group-hover:translate-x-1" />
								</Link>
							</div>
						</div>
					</main>
				</div>
			</div>
		</PageWrapper>
	);
}
