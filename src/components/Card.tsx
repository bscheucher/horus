import type { ReactNode } from "react";

export function Card({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={`card bg-base-100 shadow-xl border border-gray-200 ${className ?? ""}`}
		>
			<div className="card-body">{children}</div>
		</div>
	);
}
