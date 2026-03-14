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
		<div className="@container">
			<ul className="steps steps-horizontal w-full">
				{steps.map((label, index) => {
					const stepNumber = index + 1;
					let statusClass = "";
					if (stepNumber < currentStep) {
						statusClass = "step-success";
					} else if (stepNumber === currentStep) {
						statusClass = "step-primary";
					}

					return (
						<li key={label} className={`step text-fluid-sm ${statusClass}`}>
							<span className="hidden @sm:inline">{label}</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
