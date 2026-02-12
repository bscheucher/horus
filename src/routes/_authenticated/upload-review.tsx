import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { apiClient } from "../../lib/api-client";
import { PageContainer } from "../../components/PageContainer";

type UploadReviewSearch = {
	start: string;
	end: string;
	firstName: string;
	lastName: string;
};

export const Route = createFileRoute("/_authenticated/upload-review")({
	validateSearch: (search: Record<string, unknown>): UploadReviewSearch => ({
		start: String(search.start ?? ""),
		end: String(search.end ?? ""),
		firstName: String(search.firstName ?? ""),
		lastName: String(search.lastName ?? ""),
	}),
	component: UploadReviewPage,
});

function UploadReviewPage() {
	const { start, end, firstName, lastName } = Route.useSearch();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [isEditing, setIsEditing] = useState(false);
	const [editStart, setEditStart] = useState(start);
	const [editEnd, setEditEnd] = useState(end);
	const [editFirstName, setEditFirstName] = useState(firstName);
	const [editLastName, setEditLastName] = useState(lastName);
	const [isConfirming, setIsConfirming] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleConfirm = async () => {
		setIsConfirming(true);
		setError(null);

		const confirmedStart = isEditing ? editStart : start;
		const confirmedEnd = isEditing ? editEnd : end;
		const confirmedFirstName = isEditing ? editFirstName : firstName;
		const confirmedLastName = isEditing ? editLastName : lastName;

		try {
			const response = await apiClient.post<{
				start: string;
				end: string;
				firstName: string;
				lastName: string;
			}>("/tn-document/confirm", {
				start: confirmedStart,
				end: confirmedEnd,
				firstName: confirmedFirstName,
				lastName: confirmedLastName,
			});

			navigate({
				to: "/upload-confirmation",
				search: {
					start: response.start,
					end: response.end,
					firstName: response.firstName,
					lastName: response.lastName,
				},
			});
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: t("uploadReview.confirmationFailed"),
			);
		} finally {
			setIsConfirming(false);
		}
	};

	return (
		<PageContainer>
			<div className="card bg-base-100 shadow-xl border border-gray-200">
				<div className="card-body">
					<h2 className="card-title text-2xl mb-4">{t("uploadReview.title")}</h2>

					{error && (
						<div className="alert alert-error mb-4">
							<span>{error}</span>
						</div>
					)}

					<p className="text-base-content/70 mb-6">
						{t("uploadReview.instructions")}
					</p>

					<div className="bg-base-200 rounded-lg p-6 space-y-4">
						<div className="flex justify-between items-center">
							<span className="font-medium">{t("common.firstName")}</span>
							{isEditing ? (
								<input
									type="text"
									className="input input-bordered input-sm"
									value={editFirstName}
									onChange={(e) => setEditFirstName(e.target.value)}
								/>
							) : (
								<span className="text-lg">{firstName}</span>
							)}
						</div>
						<div className="divider my-0" />

						<div className="flex justify-between items-center">
							<span className="font-medium">{t("common.lastName")}</span>
							{isEditing ? (
								<input
									type="text"
									className="input input-bordered input-sm"
									value={editLastName}
									onChange={(e) => setEditLastName(e.target.value)}
								/>
							) : (
								<span className="text-lg">{lastName}</span>
							)}
						</div>
						<div className="divider my-0" />

						<div className="flex justify-between items-center">
							<span className="font-medium">{t("common.startDate")}</span>
							{isEditing ? (
								<input
									type="date"
									className="input input-bordered input-sm"
									value={editStart}
									onChange={(e) => setEditStart(e.target.value)}
								/>
							) : (
								<span className="text-lg">{start}</span>
							)}
						</div>
						<div className="divider my-0" />

						<div className="flex justify-between items-center">
							<span className="font-medium">{t("common.endDate")}</span>
							{isEditing ? (
								<input
									type="date"
									className="input input-bordered input-sm"
									value={editEnd}
									onChange={(e) => setEditEnd(e.target.value)}
								/>
							) : (
								<span className="text-lg">{end}</span>
							)}
						</div>
					</div>

					<div className="flex gap-4 mt-6">
						{!isEditing ? (
							<>
								<button
									type="button"
									className="btn btn-outline flex-1"
									onClick={() => setIsEditing(true)}
								>
									{t("common.edit")}
								</button>
								<button
									type="button"
									className="btn btn-success flex-1"
									disabled={isConfirming}
									onClick={handleConfirm}
								>
									{isConfirming ? t("common.confirming") : t("common.confirm")}
								</button>
							</>
						) : (
							<>
								<button
									type="button"
									className="btn btn-outline flex-1"
									disabled={isConfirming}
									onClick={() => {
										setIsEditing(false);
										setEditStart(start);
										setEditEnd(end);
										setEditFirstName(firstName);
										setEditLastName(lastName);
									}}
								>
									{t("common.cancel")}
								</button>
								<button
									type="button"
									className="btn btn-success flex-1"
									disabled={isConfirming}
									onClick={handleConfirm}
								>
									{isConfirming ? t("common.confirming") : t("uploadReview.confirmChanges")}
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</PageContainer>
	);
}
