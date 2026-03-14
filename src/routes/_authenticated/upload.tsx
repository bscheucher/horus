import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ReviewStep } from "../../components/ReviewStep.tsx";
import { SuccessStep } from "../../components/SuccessStep.tsx";
import { UploadStep } from "../../components/UploadStep.tsx";
import type { UploadReviewSearch } from "../../types/upload.files.ts";

export const Route = createFileRoute("/_authenticated/upload")({
	component: UploadPage,
});

type Step = "upload" | "review" | "success";

function UploadPage() {
	const [step, setStep] = useState<Step>("upload");
	const [reviewData, setReviewData] = useState<UploadReviewSearch | null>(null);

	const handleUploadComplete = (data: UploadReviewSearch) => {
		setReviewData(data);
		setStep("review");
	};

	const handleConfirmSuccess = () => {
		setStep("success");
	};

	const handleRestart = () => {
		setReviewData(null);
		setStep("upload");
	};

	switch (step) {
		case "upload":
			return <UploadStep onUploadComplete={handleUploadComplete} />;
		case "review":
			if (!reviewData) return null;
			return (
				<ReviewStep
					reviewData={reviewData}
					onConfirmSuccess={handleConfirmSuccess}
				/>
			);
		case "success":
			return <SuccessStep onRestart={handleRestart} />;
	}
}
