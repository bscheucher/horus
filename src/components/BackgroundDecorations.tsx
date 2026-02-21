/**
 * Decorative blurred circles rendered as a fixed overlay behind page content.
 * The color classes are passed as props so each page can keep its own theme.
 */
interface BackgroundDecorationsProps {
	topRightClass: string;
	bottomLeftClass: string;
}

export function BackgroundDecorations({
	topRightClass,
	bottomLeftClass,
}: BackgroundDecorationsProps) {
	return (
		<div
			className="pointer-events-none fixed inset-0 overflow-hidden"
			aria-hidden="true"
		>
			<div
				className={`absolute -top-32 -right-32 h-96 w-96 rounded-full blur-3xl ${topRightClass}`}
			/>
			<div
				className={`absolute bottom-0 -left-24 h-72 w-72 rounded-full blur-3xl ${bottomLeftClass}`}
			/>
		</div>
	);
}
