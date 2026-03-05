import {
	type AuthenticationResult,
	PublicClientApplication,
} from "@azure/msal-browser";
import { apiClient } from "../api/api-client";
import { loginRequest, msalConfig } from "./msal-config";

export interface AuthUser {
	id: string;
	email: string;
	displayName: string;
}

interface BackendAuthResponse {
	user: AuthUser;
	token: string;
}

const BACKEND_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "auth_user";

class AuthService {
	private msalInstance: PublicClientApplication;
	private initialized = false;
	private user: AuthUser | null = null;

	constructor() {
		this.msalInstance = new PublicClientApplication(msalConfig);
		this.restoreSession();
	}

	/**
	 * Must be called once on app startup (before route guards run).
	 * Handles the redirect promise from MSAL after EntraID login.
	 */
	async initialize(): Promise<void> {
		if (this.initialized) return;

		await this.msalInstance.initialize();
		const response = await this.msalInstance.handleRedirectPromise();

		if (response) {
			await this.exchangeToken(response);
		}

		this.initialized = true;
	}

	async login(): Promise<void> {
		await this.msalInstance.loginRedirect(loginRequest);
	}

	async logout(): Promise<void> {
		this.clearSession();
		await this.msalInstance.logoutRedirect();
	}

	isAuthenticated(): boolean {
		return sessionStorage.getItem(BACKEND_TOKEN_KEY) !== null;
	}

	getToken(): string | null {
		return sessionStorage.getItem(BACKEND_TOKEN_KEY);
	}

	getUser(): AuthUser | null {
		return this.user;
	}

	/**
	 * Sends the MSAL ID token to the backend for validation.
	 * The backend validates the JWT, extracts user info, and returns
	 * an app-scoped session token.
	 */
	private async exchangeToken(
		msalResponse: AuthenticationResult,
	): Promise<void> {
		const response = await apiClient.post<BackendAuthResponse>(
			"/auth/login",
			{ idToken: msalResponse.idToken },
		);

		sessionStorage.setItem(BACKEND_TOKEN_KEY, response.token);
		sessionStorage.setItem(AUTH_USER_KEY, JSON.stringify(response.user));
		this.user = response.user;
	}

	private restoreSession(): void {
		const userJson = sessionStorage.getItem(AUTH_USER_KEY);
		if (userJson) {
			this.user = JSON.parse(userJson);
		}
	}

	private clearSession(): void {
		sessionStorage.removeItem(BACKEND_TOKEN_KEY);
		sessionStorage.removeItem(AUTH_USER_KEY);
		this.user = null;
	}
}

export const authService = new AuthService();
