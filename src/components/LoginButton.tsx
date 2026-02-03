import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../config/authConfig";

export const LoginButton: React.FC = () => {
	const { instance } = useMsal();

	const handleLogin = async () => {
		try {
			await instance.loginPopup(loginRequest);
			// Or use redirect: await instance.loginRedirect(loginRequest);
		} catch (error) {
			console.error("Login failed:", error);
		}
	};

	return (
		<button type="button" onClick={handleLogin}>
			Sign In
		</button>
	);
};
