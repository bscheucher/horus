import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BackgroundDecorations } from "../../components/BackgroundDecorations.tsx";
import { ErrorAlert } from "../../components/ErrorAlert";
import { ArrowRightIcon, Checkbox3DIcon } from "../../components/Icons.tsx";
import { PageWrapper } from "../../components/PageWrapper.tsx";
import { UploadProgress } from "../../components/UploadProgress.tsx";
import { apiClient } from "../../lib/api/api-client.ts";
import { uploadDataSchema, type UploadData } from "../../lib/types/upload.ts";

export const Route = createFileRoute("/_authenticated/upload-review")({
	validateSearch: (search: Record<string, unknown>): UploadData =>
		uploadDataSchema.parse({
			firstName: search.firstName ?? "",
			lastName: search.lastName ?? "",
			start: search.start ?? "",
			end: search.end ?? "",
			address: search.address ?? "",
			reason: search.reason ?? "",
			issueDate: search.issueDate ?? "",
			insuranceNumber: search.insuranceNumber ?? "",
		}),
	component: UploadReviewPage,
});

function UploadReviewPage() {
	const searchParams = Route.useSearch();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [editValues, setEditValues] = useState<UploadData>(searchParams);

	const updateField =
		(field: keyof UploadData) =>
		(e: React.ChangeEvent<HTMLInputElement>) =>
			setEditValues((prev) => ({ ...prev, [field]: e.target.value }));

	const confirmMutation = useMutation({
		mutationFn: () =>
			apiClient.post<UploadData>("/tn-document/confirm", editValues),
		onSuccess: (data) => {
			navigate({ to: "/upload-confirmation", search: data });
		},
	});

	const errorMessage =
		confirmMutation.error instanceof Error
			? confirmMutation.error.message
			: confirmMutation.isError
				? t("uploadReview.confirmationFailed")
				: null;

	const renderField = (
		label: string,
		field: keyof UploadData,
		inputType: "text" | "date" = "text",
		fullWidth: boolean = false,
		isReadOnly: boolean = false,
	) => (
		<div
			className={`flex flex-col gap-1.5 ${fullWidth ? "col-span-full" : "col-span-full sm:col-span-1"}`}
		>
			<label
				htmlFor={field}
				className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1"
			>
				{label}
			</label>
			<input
				id={field}
				type={inputType}
				readOnly={isReadOnly}
				className={`input input-bordered w-full transition-all ${
					isReadOnly
						? "bg-slate-50 text-slate-500 cursor-not-allowed border-slate-200"
						: "bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
				}`}
				value={editValues[field]}
				onChange={isReadOnly ? undefined : updateField(field)}
			/>
		</div>
	);
	return (
		<PageWrapper>
			<div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-slate-50 to-white pb-12">
				<BackgroundDecorations
					topRightClass="bg-blue-200/30"
					bottomLeftClass="bg-sky-200/20"
				/>

				<div className="relative mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 pt-8 sm:pt-12">
					<header className="flex flex-col gap-2">
						<h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
							{t("uploadReview.title")}
						</h1>
					</header>

					<div className="rounded-2xl bg-white/60 p-1 shadow-sm ring-1 ring-slate-200/50 backdrop-blur-md">
						<UploadProgress currentStep={2} />
					</div>

					<main className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-blue-900/5 ring-1 ring-slate-200">
						<div className="p-6 sm:p-8">
							{errorMessage && (
								<div className="mb-6">
									<ErrorAlert message={errorMessage} />
								</div>
							)}

							<div className="mb-8 flex items-center gap-4 rounded-xl bg-blue-50/50 p-4 ring-1 ring-blue-100/50">
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
									<Checkbox3DIcon className="scale-75 text-blue-600" />
								</div>
								<p className="text-sm font-medium leading-relaxed text-slate-700">
									{t("uploadReview.instructions")}
								</p>
							</div>

							<div className="grid grid-cols-2 gap-x-4 gap-y-6">
								{renderField(
									t("common.firstName"),
									"firstName",
									"text",
									false,
									true,
								)}
								{renderField(
									t("common.lastName"),
									"lastName",
									"text",
									false,
									true,
								)}
								{renderField(
									t("common.insuranceNumber"),
									"insuranceNumber",
									"text",
									true,
									true,
								)}

								{renderField(t("common.startDate"), "start", "date")}
								{renderField(t("common.endDate"), "end", "date")}
							</div>

							<div className="mt-10 border-t border-slate-100 pt-8">
								<button
									type="button"
									disabled={confirmMutation.isPending}
									onClick={() => confirmMutation.mutate()}
									className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-blue-600 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
								>
									{confirmMutation.isPending ? (
										<span className="loading loading-spinner loading-md"></span>
									) : (
										<>
											<span>{t("common.confirm")}</span>
											<ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
										</>
									)}
								</button>
							</div>
						</div>
					</main>
				</div>
			</div>
		</PageWrapper>
	);
}
