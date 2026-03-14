import { fetchEventSource } from "@microsoft/fetch-event-source";
import { config } from "../../config/env.ts";
import { HttpError } from "../error/http-error.ts";

class ApiClient {
	private baseUrl: string;
	private timeout: number;
	private debug: boolean;

	constructor() {
		this.baseUrl = config.apiBaseUrl;
		this.timeout = config.apiTimeout;
		this.debug = config.isDev;
	}

	private async request<T>(
		endpoint: string,
		options?: RequestInit,
	): Promise<T> {
		const url = `${this.baseUrl}${endpoint}`;

		if (this.debug) {
			console.log(`[API] ${options?.method || "GET"} ${url}`);
		}

		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), this.timeout);

		try {
			const response = await fetch(url, {
				...options,
				signal: controller.signal,
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					...options?.headers,
				},
			});

			if (!response.ok) {
				throw new HttpError(
					response.status,
					`HTTP error! status: ${response.status}`,
				);
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

	async get<T>(endpoint: string): Promise<T> {
		return this.request<T>(endpoint, { method: "GET" });
	}

	async post<T>(endpoint: string, data: unknown): Promise<T> {
		return this.request<T>(endpoint, {
			method: "POST",
			body: JSON.stringify(data),
		});
	}

	async put<T>(endpoint: string, data: unknown): Promise<T> {
		return this.request<T>(endpoint, {
			method: "PUT",
			body: JSON.stringify(data),
		});
	}

	async delete<T>(endpoint: string): Promise<T> {
		return this.request<T>(endpoint, { method: "DELETE" });
	}

	async postFormDataSSE<T>(
		endpoint: string,
		formData: FormData,
		onEvent?: (event: { event: string; data: unknown }) => void,
	): Promise<T> {
		const url = `${this.baseUrl}${endpoint}`;
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), this.timeout);
		const debug = this.debug;
		let lastData: unknown = null;
		let streamError: Error | null = null;

		try {
			await fetchEventSource(url, {
				method: "POST",
				body: formData,
				signal: controller.signal,
				openWhenHidden: true,
				headers: { Accept: "text/event-stream" },
				async onopen(response) {
					if (!response.ok) {
						throw new HttpError(
							response.status,
							`HTTP error! status: ${response.status}`,
						);
					}
				},
				onmessage(ev) {
					try {
						const parsed = JSON.parse(ev.data);
						lastData = parsed;
						if (debug) console.log(`[API] SSE event: ${ev.event}`, parsed);
						onEvent?.({ event: ev.event, data: parsed });
					} catch (err) {
						streamError = err instanceof Error ? err : new Error(String(err));
						controller.abort();
					}
				},
				onerror(err) {
					throw err;
				},
			});

			if (streamError) throw streamError;
			return lastData as T;
		} finally {
			clearTimeout(timeoutId);
		}
	}
}

export const apiClient = new ApiClient();
