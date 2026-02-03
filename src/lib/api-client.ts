import { config } from "../config/env";

class ApiClient {
	private baseUrl: string;
	private timeout: number;
	private debug: boolean;

	constructor() {
		this.baseUrl = config.apiBaseUrl;
		this.timeout = config.apiTimeout;
		this.debug = config.apiDebug;
	}

	private async request<T>(
		endpoint: string,
		options?: RequestInit & { token?: string },
	): Promise<T> {
		const url = `${this.baseUrl}${endpoint}`;
		const { token, ...fetchOptions } = options ?? {};

		if (this.debug) {
			console.log(`[API] ${fetchOptions?.method || "GET"} ${url}`);
		}

		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), this.timeout);

		const headers: Record<string, string> = {
			"Content-Type": "application/json",
			...(fetchOptions?.headers as Record<string, string>),
		};

		if (token) {
			headers.Authorization = `Bearer ${token}`;
		}

		try {
			const response = await fetch(url, {
				...fetchOptions,
				signal: controller.signal,
				headers,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			if (this.debug) {
				console.log(`[API] Response:`, data);
			}

			return data;
		} finally {
			clearTimeout(timeoutId);
		}
	}

	async get<T>(endpoint: string, token?: string): Promise<T> {
		return this.request<T>(endpoint, { method: "GET", token });
	}

	async post<T>(endpoint: string, data: unknown, token?: string): Promise<T> {
		return this.request<T>(endpoint, {
			method: "POST",
			body: JSON.stringify(data),
			token,
		});
	}

	async put<T>(endpoint: string, data: unknown, token?: string): Promise<T> {
		return this.request<T>(endpoint, {
			method: "PUT",
			body: JSON.stringify(data),
			token,
		});
	}

	async delete<T>(endpoint: string, token?: string): Promise<T> {
		return this.request<T>(endpoint, { method: "DELETE", token });
	}
}

export const apiClient = new ApiClient();
