export function ErrorAlert({ message }: { message: string | null }) {
	if (!message) return null;
	return (
		<div className="alert alert-error mb-4">
			<span>{message}</span>
		</div>
	);
}
