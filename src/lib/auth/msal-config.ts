import type { Configuration, RedirectRequest } from "@azure/msal-browser";
import { config } from "../../config/env";

export const msalConfig: Configuration = {
	auth: {
		clientId: config.ssoClientId,
		authority: `https://login.microsoftonline.com/${config.ssoTenantId}`,
		redirectUri: config.ssoRedirectUri,
		postLogoutRedirectUri: config.ssoRedirectUri,
	},
	cache: {
		cacheLocation: "sessionStorage",
		storeAuthStateInCookie: false,
	},
};

export const loginRequest: RedirectRequest = {
	scopes: ["openid", "profile", "email"],
};
