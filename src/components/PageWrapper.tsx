import { Link, useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import { setAuthenticated } from "../lib/auth.ts";

type Props = {
	children: ReactNode;
	title?: string;
	action?: ReactNode;
	className?: string;
	contentClassName?: string;
	centerTitle?: boolean;
};

const navItems: { to: string; labelKey: string }[] = [
	{ to: "/upload", labelKey: "nav.upload" },
];

const navLinkClassName =
	"text-white hover:text-ibis-yellow [&.active]:font-bold [&.active]:text-ibis-yellow";

export function PageWrapper({
	children,
	title,
	className = "",
	centerTitle = false,
}: Props) {
	const navigate = useNavigate();
	const { t } = useTranslation();

	const handleLogout = () => {
		setAuthenticated(false);
		navigate({ to: "/login" });
	};

	return (
		<>
			<header>
				<nav className="flex items-center gap-6 bg-ibis-blue-dark px-6 py-3">
					{navItems.map((item) => (
						<Link key={item.to} to={item.to} className={navLinkClassName}>
							{t(item.labelKey)}
						</Link>
					))}
					<button
						type="button"
						onClick={handleLogout}
						className="text-white hover:text-ibis-yellow"
					>
						{t("nav.logout")}
					</button>
				</nav>
			</header>

			<main className={twMerge("container mx-auto p-4", className)}>
				<div
					className={twMerge(
						centerTitle ? "text-center" : "flex items-center justify-between",
					)}
				>
					<h1
						className={twMerge(
							"font-bold text-ibis-blue",
							centerTitle ? "text-5xl" : "text-3xl",
						)}
					>
						{title}
					</h1>
				</div>
				{children}
			</main>
		</>
	);
}
