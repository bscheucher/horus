import type { AccountInfo, PublicClientApplication } from "@azure/msal-browser";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { loginRequest } from "../config/msal.ts";

let msalInstance: PublicClientApplication | null = null;

export function setMsalInstance(instance: PublicClientApplication): void {
	msalInstance = instance;
}

function getInstance(): PublicClientApplication {
	if (!msalInstance) {
		throw new Error(
			"MSAL instance not initialized. Call setMsalInstance() first.",
		);
	}
	return msalInstance;
}

export function isAuthenticated(): boolean {
	return getInstance().getAllAccounts().length > 0;
}

export function getActiveAccount(): AccountInfo | null {
	const instance = getInstance();
	return instance.getActiveAccount() ?? instance.getAllAccounts()[0] ?? null;
}

export async function login(): Promise<void> {
	await getInstance().loginRedirect(loginRequest);
}

export async function logout(): Promise<void> {
	await getInstance().logoutRedirect({
		postLogoutRedirectUri: "/login",
	});
}

export async function getAccessToken(): Promise<string> {
	const account = getActiveAccount();
	if (!account) {
		throw new Error("No authenticated account found");
	}

	try {
		const response = await getInstance().acquireTokenSilent({
			...loginRequest,
			account,
		});
		return response.accessToken;
	} catch (error) {
		if (error instanceof InteractionRequiredAuthError) {
			await getInstance().acquireTokenRedirect(loginRequest);
		}
		throw error;
	}
}
