import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod/v4";

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
		<div className="container mx-auto p-8 max-w-2xl">
			<div className="card bg-base-100 shadow-xl border border-gray-200">
				<div className="card-body">
					<div className="flex items-center gap-3 mb-4">
						<svg
							className="h-8 w-8 text-success"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<title>Success</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<h2 className="card-title text-2xl">Upload Successful</h2>
					</div>

					<p className="text-base-content/70 mb-6">
						Your document has been uploaded successfully. Below are the details
						of your submission.
					</p>

					<div className="bg-base-200 rounded-lg p-6 space-y-4">
						<div className="flex justify-between items-center">
							<span className="font-medium">First Name</span>
							<span className="text-lg">{firstName}</span>
						</div>
						<div className="divider my-0" />
						<div className="flex justify-between items-center">
							<span className="font-medium">Last Name</span>
							<span className="text-lg">{lastName}</span>
						</div>
						<div className="divider my-0" />
						<div className="flex justify-between items-center">
							<span className="font-medium">Start Date</span>
							<span className="text-lg">{start}</span>
						</div>
						<div className="divider my-0" />
						<div className="flex justify-between items-center">
							<span className="font-medium">End Date</span>
							<span className="text-lg">{end}</span>
						</div>
					</div>
					<div className="card-actions mt-6">
						<Link to="/upload" className="btn btn-primary w-full">
							Upload Another File
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
