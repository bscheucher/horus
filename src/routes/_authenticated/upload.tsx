import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ErrorAlert } from "../../components/ErrorAlert";
import { FileDropZone } from "../../components/FileDropZone.tsx";
import { InfoIcon, TrashIcon } from "../../components/Icons.tsx";
import { BackgroundDecorations } from "../../components/BackgroundDecorations.tsx";
import { PageWrapper } from "../../components/PageWrapper.tsx";
import { UploadProgress } from "../../components/UploadProgress.tsx";
import { apiClient } from "../../lib/api/api-client.ts";
import type { HttpError } from "../../lib/error/http-error.ts";
import type { UploadResult } from "../../lib/types/upload.ts";

export const Route = createFileRoute("/_authenticated/upload")({
	component: UploadPage,
});

function parseUploadResult(data: Record<string, unknown>): UploadResult | null {
	if (typeof data.result === "string") {
		return JSON.parse(data.result) as UploadResult;
	}
	if (data.result && typeof data.result === "object") {
		return data.result as UploadResult;
	}
	if (data.extractions) {
		return data as unknown as UploadResult;
	}
	return null;
}

function UploadPage() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [file, setFile] = useState<File | null>(null);
	const [statusMessage, setStatusMessage] = useState<string | null>(null);

	const uploadMutation = useMutation<UploadResult, HttpError, { file: File }>({
		mutationFn: async ({ file }: { file: File }) => {
			const identifier = `upload-${Date.now()}`;
			const formData = new FormData();
			formData.append("file", file);
			formData.append("identifier", identifier);

			let uploadResult: UploadResult | null = null;
			let sseError: string | null = null;

			const response = await apiClient.postFormDataSSE<Record<string, unknown>>(
				"/tn-document/upload",
				formData,
				(event) => {
					if (
						event.event === "status" &&
						event.data &&
						typeof event.data === "object" &&
						"message" in event.data
					) {
						setStatusMessage((event.data as { message: string }).message);
					}
					if (event.event === "success" && event.data) {
						uploadResult = parseUploadResult(
							event.data as Record<string, unknown>,
						);
					}
					if (event.event === "error" && event.data) {
						sseError = (event.data as { error: string }).error;
					}
				},
			);

			if (sseError) throw new Error(sseError);

			if (!uploadResult) {
				uploadResult = parseUploadResult(response);
			}

			if (!uploadResult?.extractions) {
				throw new Error("No extraction data received from server");
			}

			return uploadResult;
		},
		onSuccess: (uploadResult) => {
			setStatusMessage(null);
			navigate({
				to: "/upload-review",
				search: {
					firstName: uploadResult.extractions.vorname?.value ?? "",
					lastName: uploadResult.extractions.familienname?.value ?? "",
					start: uploadResult.extractions.arbeitsunfaehig_von?.value ?? "",
					end:
						uploadResult.extractions.letzter_tag_der_arbeitsunfaehigkeit
							?.value ?? "",
					address: uploadResult.extractions.krankenstandsadresse?.value ?? "",
					reason:
						uploadResult.extractions.grund_der_arbeitsunfaehigkeit?.value ?? "",
					issueDate: uploadResult.extractions.ausstellungsdatum?.value ?? "",
					insuranceNumber:
						uploadResult.extractions.versicherungsnummer?.value ?? "",
				},
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

				<div className="relative mx-auto flex w-full max-w-lg flex-col gap-4 px-4 py-6 sm:py-10">
					<div className="rounded-2xl bg-white/80 px-6 py-5 shadow-sm ring-1 ring-slate-200/70 backdrop-blur-sm">
						<div className="flex items-center gap-3">
							<div>
								<h1 className="text-xl font-bold leading-tight tracking-tight text-slate-800 sm:text-2xl">
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

						<div className="p-5 sm:p-6">
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
