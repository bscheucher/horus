import { useMsal } from "@azure/msal-react";

export const LogoutButton: React.FC = () => {
	const { instance } = useMsal();

	const handleLogout = async () => {
		try {
			await instance.logoutPopup();
			// Or use redirect: await instance.logoutRedirect();
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
		<button type="button" onClick={handleLogout}>
			Sign Out
		</button>
	);
};
