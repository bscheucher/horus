import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { apiClient } from "../../lib/api-client";
import { PageContainer } from "../../components/PageContainer";
import { Card } from "../../components/Card";
import { ErrorAlert } from "../../components/ErrorAlert";
import { UploadDropIcon, UploadCloudIcon, SuccessCheckIcon } from "../../components/Icons";

const ACCEPTED_TYPES = ["image/jpeg", "image/png"];
const ACCEPTED_EXTENSIONS = ".jpg,.jpeg,.png";

export const Route = createFileRoute("/_authenticated/upload")({
	component: UploadPage,
});

function UploadPage() {
	const navigate = useNavigate();
	const [file, setFile] = useState<File | null>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [type, setType] = useState("");
	const [isUploading, setIsUploading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const isValidFile = (f: File) => ACCEPTED_TYPES.includes(f.type);

	const handleFileSelect = (selectedFile: File | null) => {
		setError(null);
		if (selectedFile) {
			if (!isValidFile(selectedFile)) {
				setError("Only JPG and PNG files are allowed.");
				return;
			}
			setFile(selectedFile);
		}
	};

	const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0] || null;
		handleFileSelect(selectedFile);
	};

	const handleDragEnter = (e: React.DragEvent<HTMLElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent<HTMLElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
	};

	const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDrop = (e: React.DragEvent<HTMLElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);

		const droppedFile = e.dataTransfer.files?.[0] || null;
		handleFileSelect(droppedFile);
	};

	const handleRemoveFile = () => {
		setFile(null);
		setError(null);
	};

	const handleUpload = async () => {
		if (!file || !type) return;

		setIsUploading(true);
		setError(null);

		const identifier = `${type}-${Date.now()}`;

		try {
			const formData = new FormData();
			formData.append("file", file);
			formData.append("type", type);
			formData.append("identifier", identifier);

			const response = await apiClient.postFormData<{
				processing_id: string;
				workflow_id: string;
				extractions: {
					first_name: { value: string; confidence: number };
					last_name: { value: string; confidence: number };
					start_date: { value: string; confidence: number };
					end_date: { value: string; confidence: number };
				};
			}>("/tn-document/upload", formData);

			navigate({
				to: "/upload-review",
				search: {
					start: response.extractions.start_date.value,
					end: response.extractions.end_date.value,
					firstName: response.extractions.first_name.value,
					lastName: response.extractions.last_name.value,
				},
			});
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Upload failed. Please try again.",
			);
		} finally {
			setIsUploading(false);
		}
	};

	const canUpload = file && type && !isUploading;

	return (
		<PageContainer>
			<Card className="rounded-2xl pb-4">
					<h2 className="card-title text-2xl mb-4">Upload File</h2>

					<ErrorAlert message={error} />

					{/* Drag and Drop Zone */}
					<section
						aria-label="File drop zone"
						className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
							isDragging
								? "border-primary bg-primary/10"
								: "border-base-300 hover:border-primary/50"
						}`}
						onDragEnter={handleDragEnter}
						onDragLeave={handleDragLeave}
						onDragOver={handleDragOver}
						onDrop={handleDrop}
					>
						{!file ? (
							<>
								<UploadDropIcon className="mx-auto h-12 w-12 text-base-content/40" />
								<p className="mt-4 text-lg font-medium">
									Drag and drop your file here
								</p>
								<p className="mt-2 text-sm text-base-content/60">
									JPG and PNG files only
								</p>
							</>
						) : (
							<div className="flex items-center justify-center gap-4">
								<SuccessCheckIcon className="h-10 w-10 text-success" />
								<div className="text-left">
									<p className="font-medium">{file.name}</p>
									<p className="text-sm text-base-content/60">
										{(file.size / 1024).toFixed(2)} KB
									</p>
								</div>
							</div>
						)}
					</section>

					{/* File Input Button */}
					<div className="mt-4 flex gap-4">
						<label className="btn btn-primary flex-1">
							<UploadCloudIcon className="w-5 h-5 mr-2" />
							Choose File
							<input
								type="file"
								className="hidden"
								onChange={handleFileInput}
								accept={ACCEPTED_EXTENSIONS}
							/>
						</label>

						{file && (
							<button
								type="button"
								className="btn btn-error btn-outline"
								onClick={handleRemoveFile}
							>
								Remove
							</button>
						)}
					</div>

					{/* Form Fields */}

					<div className="form-control w-full">
						<select
							id="type-select"
							className="select select-bordered w-full"
							value={type}
							onChange={(e) => setType(e.target.value)}
						>
							<option value="" disabled>
								Select document type
							</option>
							<option value="krankmeldung">Krankmeldung</option>
							<option value="zeitbestätigung">Zeitbestätigung</option>
						</select>
					</div>

					{/* Upload Button */}
					<button
						type="button"
						className={`btn btn-success mt-6 w-full ${isUploading ? "loading" : ""}`}
						disabled={!canUpload}
						onClick={handleUpload}
					>
						{isUploading ? "Uploading..." : "Upload File"}
					</button>
			</Card>
		</PageContainer>
	);
}
