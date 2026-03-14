import type { ReactNode } from "react";

export function DataRow({
	label,
	children,
}: {
	label: string;
	children: ReactNode;
}) {
	return (
		<div className="flex justify-between items-center">
			<span className="font-medium">{label}</span>
			{children}
		</div>
	);
}
