import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { HttpError } from "../lib/error/http-error.ts";
import { uploadAbwesenheitsbestaetigung } from "../lib/services/abwesenheitsbestaetigung.service.ts";
import type {
	UploadResult,
	UploadReviewSearch,
} from "../types/upload.files.ts";
import { BackgroundDecorations } from "./BackgroundDecorations.tsx";
import { ErrorAlert } from "./ErrorAlert";
import { FileDropZone } from "./FileDropZone.tsx";
import { InfoIcon, TrashIcon } from "./Icons.tsx";
import { PageWrapper } from "./PageWrapper.tsx";
import { UploadProgress } from "./UploadProgress.tsx";

interface UploadStepProps {
	onUploadComplete: (data: UploadReviewSearch) => void;
}

export function UploadStep({ onUploadComplete }: UploadStepProps) {
	const { t } = useTranslation();
	const [file, setFile] = useState<File | null>(null);
	const [statusMessage, setStatusMessage] = useState<string | null>(null);

	const uploadMutation = useMutation<UploadResult, HttpError, { file: File }>({
		mutationFn: ({ file }) => {
			setStatusMessage(t("upload.uploadStatusMessage"));
			return uploadAbwesenheitsbestaetigung(file);
		},
		onSuccess: (uploadResult) => {
			setStatusMessage(null);
			onUploadComplete({
				vorname: uploadResult.vorname ?? "",
				nachname: uploadResult.familienname ?? "",
				startDatum: uploadResult.arbeitsunfaehigVon ?? "",
				endDatum:
					uploadResult.letzterTagDerArbeitsunfaehigkeit ??
					"",
				krankenstandsadresse:
					uploadResult.krankenstandsadresse ?? "",
				grundDerArbeitsunfaehigkeit:
					uploadResult.grundDerArbeitsunfaehigkeit ?? "",
				ausstellungsdatum:
					uploadResult.ausstellungsdatum ?? "",
				svNummer: uploadResult.versicherungsnummer ?? "",
				blobName: uploadResult.blobName ?? "",
			});
		},
		onError: () => {
			setStatusMessage(null);
		},
	});

	const handleFileSelect = (selectedFile: File | null) => {
		uploadMutation.reset();
		if (selectedFile) {
			setFile(selectedFile);
			uploadMutation.mutate({ file: selectedFile });
		}
	};

	const handleRemoveFile = () => {
		setFile(null);
		uploadMutation.reset();
	};

	const errorMessage = uploadMutation.error
		? uploadMutation.error.status === 413
			? t("upload.fileSizeError", { size: 10 })
			: uploadMutation.error.message || t("upload.uploadFailed")
		: null;

	const isProcessing = uploadMutation.isPending;

	return (
		<PageWrapper>
			<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
				<BackgroundDecorations
					topRightClass="bg-blue-100/40"
					bottomLeftClass="bg-sky-100/50"
				/>

				<div className="@container relative mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-6 sm:py-10">
					<div className="rounded-2xl bg-white/80 px-6 py-5 shadow-sm ring-1 ring-slate-200/70 backdrop-blur-sm">
						<div className="flex items-center gap-3">
							<div>
								<h1 className="text-fluid-3xl font-bold leading-tight tracking-tight text-slate-800">
									{t("upload.title")}
								</h1>
							</div>
						</div>
					</div>

					<div className="rounded-2xl bg-white/80 px-6 py-4 shadow-sm ring-1 ring-slate-200/70 backdrop-blur-sm">
						<UploadProgress currentStep={1} />
					</div>

					<div className="rounded-2xl bg-white/80 shadow-sm ring-1 ring-slate-200/70 backdrop-blur-sm">
						<div className="flex gap-3 rounded-t-2xl border-b border-slate-100 bg-blue-50/60 px-5 py-4">
							<InfoIcon className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
							<p className="text-sm leading-relaxed text-slate-600">
								<span className="font-semibold text-slate-700">
									{t("upload.infoTitle")}
								</span>{" "}
								{t("upload.infoBody")}
							</p>
						</div>

						<div className="p-5 md:p-10 lg:p-16">
							{errorMessage && (
								<div className="mb-4">
									<ErrorAlert message={errorMessage} />
								</div>
							)}

							{statusMessage && (
								<div className="mb-4 flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
									<span
										className="loading loading-spinner loading-sm shrink-0 text-blue-500"
										aria-hidden="true"
									/>
									<span className="font-medium">{statusMessage}</span>
								</div>
							)}

							<div
								className={[
									"rounded-xl border-2 border-dashed transition-colors duration-200",
									isProcessing
										? "border-blue-300 bg-blue-50/50"
										: uploadMutation.isError
											? "border-red-200 bg-red-50/30"
											: "border-slate-200 bg-slate-50/60 hover:border-slate-300 hover:bg-slate-50",
								].join(" ")}
							>
								<FileDropZone
									onFileSelect={handleFileSelect}
									maxSizeMB={10}
									selectedFile={file}
								/>
							</div>

							{uploadMutation.isError && file && (
								<button
									type="button"
									onClick={handleRemoveFile}
									className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-500 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 active:scale-[0.98]"
								>
									<TrashIcon className="h-4 w-4" />
									{t("upload.remove")}
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</PageWrapper>
	);
}
