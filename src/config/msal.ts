import {
	type Configuration,
	LogLevel,
	PublicClientApplication,
} from "@azure/msal-browser";
import { config } from "./env.ts";

const msalConfig: Configuration = {
	auth: {
		clientId: config.msalClientId,
		authority: `https://login.microsoftonline.com/${config.msalTenantId}`,
		redirectUri: config.msalRedirectUri,
		postLogoutRedirectUri: config.msalRedirectUri,
	},
	cache: {
		cacheLocation: "sessionStorage",
	},
	system: {
		loggerOptions: {
			logLevel: config.isDev ? LogLevel.Warning : LogLevel.Error,
			loggerCallback: (level, message, containsPii) => {
				if (containsPii) return;

				switch (level) {
					case LogLevel.Error:
						console.error(message);
						break;
					case LogLevel.Warning:
						console.warn(message);
						break;
					case LogLevel.Info:
						console.info(message);
						break;
					case LogLevel.Verbose:
						console.debug(message);
						break;
				}
			},
		},
	},
};

export function createMsalInstance(): PublicClientApplication {
	return new PublicClientApplication(msalConfig);
}

export const loginRequest = {
	scopes: ["User.Read"],
};
