import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { apiClient } from "../../lib/api-client";

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
	const [identifier, setIdentifier] = useState("");
	const [additionalIdentifier, setAdditionalIdentifier] = useState("");
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
		if (!file || !type || !identifier) return;

		setIsUploading(true);
		setError(null);

		try {
			const formData = new FormData();
			formData.append("file", file);
			formData.append("type", type);
			formData.append("identifier", identifier);
			if (additionalIdentifier) {
				formData.append("additionalIdentifier", additionalIdentifier);
			}

			const response = await apiClient.postFormData<{
				start: string;
				end: string;
			}>("/tn-document/upload", formData);

			navigate({
				to: "/upload-confirmation",
				search: {
					start: response.start,
					end: response.end,
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

	const canUpload = file && type && identifier && !isUploading;

	return (
		<div className="container mx-auto p-8 max-w-2xl">
			<div className="card bg-base-100 shadow-xl">
				<div className="card-body">
					<h2 className="card-title text-2xl mb-4">Upload File</h2>

					{error && (
						<div className="alert alert-error mb-4">
							<span>{error}</span>
						</div>
					)}

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
								<svg
									className="mx-auto h-12 w-12 text-base-content/40"
									stroke="currentColor"
									fill="none"
									viewBox="0 0 48 48"
									aria-hidden="true"
								>
									<title>Upload icon</title>
									<path
										d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
										strokeWidth={2}
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
								<p className="mt-4 text-lg font-medium">
									Drag and drop your file here
								</p>
								<p className="mt-2 text-sm text-base-content/60">
									JPG and PNG files only
								</p>
							</>
						) : (
							<div className="flex items-center justify-center gap-4">
								<svg
									className="h-10 w-10 text-success"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<title>Success checkmark</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
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
							<svg
								className="w-5 h-5 mr-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<title>Upload icon</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
								/>
							</svg>
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
					<div className="divider" />

					<div className="form-control w-full">
						<label className="label" htmlFor="type-input">
							<span className="label-text">Type *</span>
						</label>
						<input
							id="type-input"
							type="text"
							placeholder="Document type"
							className="input input-bordered w-full"
							value={type}
							onChange={(e) => setType(e.target.value)}
						/>
					</div>

					<div className="form-control w-full mt-2">
						<label className="label" htmlFor="identifier-input">
							<span className="label-text">Identifier *</span>
						</label>
						<input
							id="identifier-input"
							type="text"
							placeholder="Identifier"
							className="input input-bordered w-full"
							value={identifier}
							onChange={(e) => setIdentifier(e.target.value)}
						/>
					</div>

					<div className="form-control w-full mt-2">
						<label className="label" htmlFor="additional-identifier-input">
							<span className="label-text">Additional Identifier</span>
						</label>
						<input
							id="additional-identifier-input"
							type="text"
							placeholder="Additional identifier (optional)"
							className="input input-bordered w-full"
							value={additionalIdentifier}
							onChange={(e) => setAdditionalIdentifier(e.target.value)}
						/>
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
				</div>
			</div>
		</div>
	);
}
