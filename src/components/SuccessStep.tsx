import { useTranslation } from "react-i18next";
import { ArrowRightIcon, SuccessCheckIcon } from "./Icons.tsx";
import { PageWrapper } from "./PageWrapper.tsx";

interface SuccessStepProps {
	onRestart: () => void;
}

export function SuccessStep({ onRestart }: SuccessStepProps) {
	const { t } = useTranslation();

	return (
		<PageWrapper className="relative min-h-[calc(100vh-64px)] bg-white overflow-x-hidden">
			<div className="@container relative z-10 mx-auto flex max-w-2xl flex-col items-center justify-center px-6 py-12 text-center sm:py-24">
				<div className="mb-10 flex h-25 w-25 items-center justify-center sm:h-32 sm:w-32">
					<SuccessCheckIcon className="h-full w-full text-green-500" />
				</div>

				<div className="mb-8 flex items-center gap-2 rounded-full border-2 border-green-200 bg-green-50 px-6 py-1.5">
					<span className="h-2 w-2 rounded-full bg-green-300" />
					<span className="text-[10px] font-bold tracking-[0.15em] text-green-700 uppercase sm:text-xs">
						{t("uploadConfirmation.uploadSuccessBadge")}
					</span>
				</div>

				<h1 className="mb-4 text-fluid-5xl font-bold leading-tight tracking-tight text-[#1e293b] sm:text-5xl lg:text-6xl">
					<span className="block">
						{t("uploadConfirmation.uploadSuccessTitle")}
					</span>
				</h1>

				<p className="mx-auto mb-8 max-w-[280px] text-fluid-base leading-relaxed text-slate-400 sm:max-w-md sm:text-lg">
					{t("uploadConfirmation.uploadSuccessDescription")}
				</p>

				<div className="mx-auto mb-8 h-px w-full max-w-[340px] bg-slate-200 sm:max-w-md" />

				<button
					type="button"
					onClick={onRestart}
					className="group mx-auto flex w-full max-w-[340px] items-center justify-center gap-3 rounded-xl bg-[#52ad62] py-4 text-base font-semibold text-white shadow-lg shadow-green-100 transition-all hover:bg-[#469654] active:scale-[0.95] sm:max-w-md sm:py-5 sm:text-lg"
				>
					<ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1 sm:h-6 sm:w-6" />
					{t("uploadConfirmation.uploadSuccessButton")}
				</button>
			</div>
		</PageWrapper>
	);
}
