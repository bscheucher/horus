import { useTranslation } from "react-i18next";

interface UploadProgressProps {
	currentStep: 1 | 2 | 3;
}

export function UploadProgress({ currentStep }: UploadProgressProps) {
	const { t } = useTranslation();

	const steps = [
		t("uploadProgress.step1"),
		t("uploadProgress.step2"),
		t("uploadProgress.step3"),
	];

	return (
		<ul className="steps steps-horizontal w-full">
			{steps.map((label, index) => (
				<li
					key={label}
					className={`step text-xs sm:text-sm ${index + 1 <= currentStep ? "step-primary" : ""}`}
				>
					{label}
				</li>
			))}
		</ul>
	);
}
