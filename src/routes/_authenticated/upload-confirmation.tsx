import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod/v4";
import { PageContainer } from "../../components/PageContainer";
import { Card } from "../../components/Card";
import { DataRow } from "../../components/DataRow";
import { SuccessCheckIcon } from "../../components/Icons";

const uploadConfirmationSearchSchema = z.object({
	start: z.string(),
	end: z.string(),
	firstName: z.string(),
	lastName: z.string(),
});

export const Route = createFileRoute("/_authenticated/upload-confirmation")({
	validateSearch: uploadConfirmationSearchSchema,
	component: UploadConfirmationPage,
});

function UploadConfirmationPage() {
	const { start, end, firstName, lastName } = Route.useSearch();

	return (
		<PageContainer>
			<Card>
					<div className="flex items-center gap-3 mb-4">
						<SuccessCheckIcon className="h-8 w-8 text-success" />
						<h2 className="card-title text-2xl">Upload Successful</h2>
					</div>

					<p className="text-base-content/70 mb-6">
						Your document has been uploaded successfully. Below are the details
						of your submission.
					</p>

					<div className="bg-base-200 rounded-lg p-6 space-y-4">
						<DataRow label="First Name">
							<span className="text-lg">{firstName}</span>
						</DataRow>
						<div className="divider my-0" />
						<DataRow label="Last Name">
							<span className="text-lg">{lastName}</span>
						</DataRow>
						<div className="divider my-0" />
						<DataRow label="Start Date">
							<span className="text-lg">{start}</span>
						</DataRow>
						<div className="divider my-0" />
						<DataRow label="End Date">
							<span className="text-lg">{end}</span>
						</DataRow>
					</div>
					<div className="card-actions mt-6">
						<Link to="/upload" className="btn btn-primary w-full">
							Upload Another File
						</Link>
					</div>
			</Card>
		</PageContainer>
	);
}
