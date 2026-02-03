import {
	BrowserCacheLocation,
	type Configuration,
	LogLevel,
} from "@azure/msal-browser";

// MSAL configuration for Azure AD authentication
export const msalConfig: Configuration = {
	auth: {
		clientId: import.meta.env.PUBLIC_SSO_CLIENT_ID || "",
		authority: `https://login.microsoftonline.com/${import.meta.env.PUBLIC_SSO_TENANT_ID}`,
		redirectUri: typeof window !== "undefined" ? window.location.origin : "",
		postLogoutRedirectUri:
			typeof window !== "undefined" ? `${window.location.origin}/login` : "",
	},
	cache: {
		cacheLocation: BrowserCacheLocation.SessionStorage,
	},
	system: {
		loggerOptions: {
			loggerCallback: (level, message, containsPii) => {
				if (containsPii) {
					return;
				}
				switch (level) {
					case LogLevel.Error:
						console.error(message);
						return;
					case LogLevel.Info:
						// console.info(message)
						return;
					case LogLevel.Verbose:
						// console.debug(message)
						return;
					case LogLevel.Warning:
						console.warn(message);
						return;
					default:
						return;
				}
			},
			logLevel: LogLevel.Warning,
		},
	},
};

// Scopes for the access token
export const loginRequest = {
	scopes: [
		`api://${import.meta.env.PUBLIC_SSO_CLIENT_ID}/${import.meta.env.PUBLIC_SSO_CUSTOM_SCOPE}`,
		"openid",
		"profile",
		"email",
		"User.Read",
		"offline_access",
	],
};

// Scopes for silent token acquisition
export const tokenRequest = {
	scopes: [
		`api://${import.meta.env.PUBLIC_SSO_CLIENT_ID}/${import.meta.env.PUBLIC_SSO_CUSTOM_SCOPE}`,
	],
};

// Microsoft Graph API scopes (if needed)
export const graphConfig = {
	graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
