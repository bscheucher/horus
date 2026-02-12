import type { ReactNode } from "react";

export function PageContainer({ children }: { children: ReactNode }) {
	return (
		<div className="container mx-auto p-8 max-w-2xl">
			{children}
		</div>
	);
}
