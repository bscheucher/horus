import { useMsal } from "@azure/msal-react";
import { tokenRequest } from "../config/authConfig";

export const useAccessToken = () => {
	const { instance, accounts } = useMsal();

	const getAccessToken = async (): Promise<string | null> => {
		if (accounts.length === 0) {
			return null;
		}

		try {
			// Try to acquire token silently first
			const response = await instance.acquireTokenSilent({
				...tokenRequest,
				account: accounts[0],
			});
			return response.accessToken;
		} catch (_error) {
			// Fall back to interactive method if silent fails
			try {
				const response = await instance.acquireTokenPopup(tokenRequest);
				return response.accessToken;
			} catch (popupError) {
				console.error("Token acquisition failed:", popupError);
				return null;
			}
		}
	};

	return { getAccessToken };
};
