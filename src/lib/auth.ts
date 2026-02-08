const AUTH_KEY = "mock_authenticated";

export function isAuthenticated(): boolean {
	return sessionStorage.getItem(AUTH_KEY) === "true";
}

export function setAuthenticated(value: boolean): void {
	if (value) {
		sessionStorage.setItem(AUTH_KEY, "true");
	} else {
		sessionStorage.removeItem(AUTH_KEY);
	}
}
