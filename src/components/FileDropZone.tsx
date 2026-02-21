import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { SuccessCheckIcon, UploadDropIcon } from "./Icons";

interface FileDropZoneProps {
	onFileSelect: (file: File | null) => void;
	acceptedTypes?: string[];
	acceptedExtensions?: string;
	maxSizeMB?: number;
	selectedFile?: File | null;
	error?: string | null;
}

export function FileDropZone({
	onFileSelect,
	acceptedTypes = ["image/jpeg", "image/png", "application/pdf"],
	acceptedExtensions = ".jpg,.jpeg,.png,.pdf",
	maxSizeMB,
	selectedFile = null,
	error,
}: FileDropZoneProps) {
	const { t } = useTranslation();
	const [isDragging, setIsDragging] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const isValidFile = (file: File): { valid: boolean; error?: string } => {
		if (!acceptedTypes.includes(file.type)) {
			return {
				valid: false,
				error: t("upload.invalidFileType", {
					types: acceptedTypes.join(", "),
				}),
			};
		}

		if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
			return {
				valid: false,
				error: t("upload.fileSizeError", { size: maxSizeMB }),
			};
		}

		return { valid: true };
	};

	const handleFileSelect = (file: File | null) => {
		if (file) {
			const validation = isValidFile(file);
			if (!validation.valid) {
				onFileSelect(null);
				return;
			}
		}
		onFileSelect(file);
	};

	const handleZoneClick = () => {
		fileInputRef.current?.click();
	};

	const handleZoneKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			fileInputRef.current?.click();
		}
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

	const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selected = e.target.files?.[0] || null;
		handleFileSelect(selected);
		// Reset input so the same file can be re-selected after removal
		e.target.value = "";
	};

	return (
		<div>
			<section
				aria-label={t("upload.dropZoneLabel")}
				className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
					isDragging
						? "border-primary bg-primary/10"
						: "border-base-300 hover:border-primary/50 hover:bg-base-200/50"
				} ${error ? "border-error" : ""}`}
				onClick={handleZoneClick}
				onKeyDown={handleZoneKeyDown}
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
			>
				{!selectedFile ? (
					<>
						<UploadDropIcon className="mx-auto h-12 w-12 text-base-content/40" />
						<p className="mt-4 text-lg font-medium">
							{t("upload.dragAndDrop")}
						</p>
						<p className="mt-2 text-sm text-base-content/60">
							{t("upload.documentTypeHint")}
						</p>
						<p className="text-center text-xs text-slate-400">
							{t("upload.fileTypeSizeHint")}
						</p>
					</>
				) : (
					<div className="flex items-center justify-center gap-4">
						<SuccessCheckIcon className="h-10 w-10 text-success" />
						<div className="text-left">
							<p className="font-medium">{selectedFile.name}</p>
							<p className="text-sm text-base-content/60">
								{(selectedFile.size / 1024).toFixed(2)} KB
							</p>
						</div>
					</div>
				)}
			</section>

			<input
				ref={fileInputRef}
				type="file"
				className="hidden"
				onChange={handleFileInput}
				accept={acceptedExtensions}
			/>
		</div>
	);
}
