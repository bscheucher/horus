import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { saveAbwesenheitData } from "../lib/services/abwesenheitsbestaetigung.service.ts";
import { fetchSeminare } from "../lib/services/seminar.service.ts";
import type { UploadReviewSearch } from "../types/upload.files.ts";
import { BackgroundDecorations } from "./BackgroundDecorations.tsx";
import { ArrowRightIcon, Checkbox3DIcon } from "./Icons.tsx";
import { PageWrapper } from "./PageWrapper.tsx";
import { SelectField } from "./SelectField.tsx";
import { UploadProgress } from "./UploadProgress.tsx";

interface ReviewStepProps {
	reviewData: UploadReviewSearch;
	onConfirmSuccess: () => void;
}

export function ReviewStep({ reviewData, onConfirmSuccess }: ReviewStepProps) {
	const { data: seminare, isLoading: seminareLoading } = useQuery({
		queryKey: ["teilnehmer-seminare"],
		queryFn: fetchSeminare,
	});

	const seminarOptions = (seminare ?? [])
		.map((s) => s.seminarBezeichnung)
		.filter((b): b is string => b !== null);
	const { t } = useTranslation();
	const [editValues, setEditValues] = useState<UploadReviewSearch>({
		...reviewData,
		seminar: reviewData.seminar ?? "Gruppe 16 - ePSA Deutsch - 1.WB",
	});

	const updateField =
		(field: keyof UploadReviewSearch) =>
		(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
			setEditValues((prev) => ({ ...prev, [field]: e.target.value }));

	const confirmMutation = useMutation({
		mutationFn: () =>
			saveAbwesenheitData({
				vorname: editValues.vorname,
				nachname: editValues.nachname,
				svNummer: editValues.svNummer,
				startDatum: editValues.startDatum,
				endDatum: editValues.endDatum,
				// @ts-expect-error - adding seminar to payload if service supports it
				seminar: editValues.seminar,
				blobName: editValues.blobName,
			}),
		onSuccess: () => {
			onConfirmSuccess();
		},
	});

	const renderField = (
		label: string,
		field: keyof UploadReviewSearch,
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

				<div className="@container relative mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-6 sm:py-10">
					<div className="rounded-2xl bg-white/80 px-6 py-5 shadow-sm ring-1 ring-blue-600 backdrop-blur-sm">
						<h1 className="text-fluid-2xl font-bold leading-tight tracking-tight text-slate-800">
							{t("uploadReview.title")}
						</h1>
					</div>

					<div className="rounded-2xl bg-white/60 p-1 shadow-sm ring-1 ring-slate-200/50 backdrop-blur-md">
						<UploadProgress currentStep={2} />
					</div>

					<main className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-blue-900/5 ring-1 ring-slate-200">
						<div className="p-6 sm:p-8">
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
									"vorname",
									"text",
									false,
									true,
								)}
								{renderField(
									t("common.lastName"),
									"nachname",
									"text",
									false,
									true,
								)}
								{renderField(
									t("common.insuranceNumber"),
									"svNummer",
									"text",
									true,
									true,
								)}

								<SelectField
									label="Seminare"
									field="seminar"
									options={seminareLoading ? [] : seminarOptions}
									value={editValues.seminar ?? ""}
									onChange={(field, value) =>
										setEditValues((prev) => ({ ...prev, [field]: value }))
									}
								/>
								{renderField(t("common.startDate"), "startDatum", "date")}
								{renderField(t("common.endDate"), "endDatum", "date")}
							</div>

							<div className="mt-10 border-t border-slate-100 pt-8">
								<button
									type="button"
									disabled={confirmMutation.isPending}
									onClick={() => confirmMutation.mutate()}
									className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-blue-600 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-blue-700"
								>
									{confirmMutation.isPending ? (
										<span className="loading loading-spinner loading-md"></span>
									) : (
										<>
											<span>{t("common.confirmButton")}</span>
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
