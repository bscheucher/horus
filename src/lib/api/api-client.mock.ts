// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface User {
	id: number;
	name: string;
	email: string;
}

const mockUsers: User[] = [
	{ id: 1, name: "Max Mustermann", email: "max@example.com" },
	{ id: 2, name: "Anna Schmidt", email: "anna@example.com" },
	{ id: 3, name: "Tom Weber", email: "tom@example.com" },
];

class MockApiClient {
	async get<T>(endpoint: string): Promise<T> {
		await delay(500); // Simulate network delay

		console.log(`[MOCK API] GET ${endpoint}`);

		if (endpoint === "/users") {
			return mockUsers as T;
		}

		throw new Error(`Mock endpoint not implemented: ${endpoint}`);
	}

	async post<T>(endpoint: string, data: unknown): Promise<T> {
		await delay(500);
		console.log(`[MOCK API] POST ${endpoint}`, data);
		return { success: true } as T;
	}

	async put<T>(endpoint: string, data: unknown): Promise<T> {
		await delay(500);
		console.log(`[MOCK API] PUT ${endpoint}`, data);
		return { success: true } as T;
	}

	async delete<T>(endpoint: string): Promise<T> {
		await delay(500);
		console.log(`[MOCK API] DELETE ${endpoint}`);
		return { success: true } as T;
	}
}

export const mockApiClient = new MockApiClient();
