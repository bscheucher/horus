import { useMsal } from "@azure/msal-react";
import { useCallback } from "react";
import { tokenRequest } from "../config/authConfig";
import { apiClient } from "../lib/api-client";
import { useUserStore } from "../stores/userStore";
import type { User } from "../types/user";

/**
 * Hook that handles the post-login flow:
 * 1. Acquire access token from MSAL
 * 2. Fetch user data from backend API
 * 3. Save user to cookie + Zustand store
 */
export function useAuth() {
	const { instance, accounts } = useMsal();
	const { user, setUser, clearUser } = useUserStore();

	const fetchAndStoreUser = useCallback(async (): Promise<User | null> => {
		if (accounts.length === 0) return null;

		try {
			const response = await instance.acquireTokenSilent({
				...tokenRequest,
				account: accounts[0],
			});

			const userData = await apiClient.get<User>(
				"/users/me",
				response.accessToken,
			);

			setUser(userData);
			return userData;
		} catch (error) {
			console.error("Failed to fetch user data:", error);
			return null;
		}
	}, [instance, accounts, setUser]);

	const logout = useCallback(async () => {
		clearUser();
		try {
			await instance.logoutRedirect({
				postLogoutRedirectUri: "/login",
			});
		} catch (error) {
			console.error("Logout failed:", error);
		}
	}, [instance, clearUser]);

	return { user, fetchAndStoreUser, logout };
}
