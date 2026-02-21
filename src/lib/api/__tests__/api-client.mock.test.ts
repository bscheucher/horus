import { describe, expect, test } from "@jest/globals";
import { mockApiClient } from "../api-client.mock.ts";

describe("MockApiClient", () => {
	test("should return list of users", async () => {
		const users = await mockApiClient.get("/users");

		expect(users).toHaveLength(3);
		expect(users).toEqual([
			{ id: 1, name: "Max Mustermann", email: "max@example.com" },
			{ id: 2, name: "Anna Schmidt", email: "anna@example.com" },
			{ id: 3, name: "Tom Weber", email: "tom@example.com" },
		]);
	});

	test("should throw error for unimplemented endpoint", async () => {
		await expect(mockApiClient.get("/posts")).rejects.toThrow(
			"Mock endpoint not implemented: /posts",
		);
	});
});
