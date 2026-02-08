import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/upload")({
	component: UploadPage,
});

function UploadPage() {
	const [file, setFile] = useState<File | null>(null);
	const [isDragging, setIsDragging] = useState<boolean>(false);

	const handleFileSelect = (selectedFile: File | null) => {
		if (selectedFile) {
			setFile(selectedFile);
			console.log("File selected:", selectedFile.name);
			// To do: Add upload logic here
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
	};

	return (
		<div className="container mx-auto p-8 max-w-2xl">
			<div className="card bg-base-100 shadow-xl">
				<div className="card-body">
					<h2 className="card-title text-2xl mb-4">Upload File</h2>

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
									or click the button below to browse
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
					<div className="mt-6 flex gap-4">
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
								accept="*/*"
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

					{/* Upload Button */}
					{file && (
						<button type="button" className="btn btn-success mt-4 w-full">
							Upload File
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
