import type { User } from "../types/user";

const USER_COOKIE_NAME = "user";
const COOKIE_MAX_AGE_DAYS = 7;

export function setUserCookie(user: User): void {
	const encoded = encodeURIComponent(JSON.stringify(user));
	const maxAge = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;
	// biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API has limited browser support
	document.cookie = `${USER_COOKIE_NAME}=${encoded}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function getUserCookie(): User | null {
	const match = document.cookie
		.split("; ")
		.find((row) => row.startsWith(`${USER_COOKIE_NAME}=`));

	if (!match) return null;

	try {
		const value = match.split("=").slice(1).join("=");
		return JSON.parse(decodeURIComponent(value)) as User;
	} catch {
		return null;
	}
}

export function clearUserCookie(): void {
	// biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API has limited browser support
	document.cookie = `${USER_COOKIE_NAME}=; path=/; max-age=0`;
}
