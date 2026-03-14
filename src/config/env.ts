interface EnvConfig {
	apiBaseUrl: string;
	apiTimeout: number;

	msalClientId: string;
	msalTenantId: string;
	msalRedirectUri: string;
	msalCustomScope: string;

	tnPortalBasePath: string;

	isDev: boolean;
	isProd: boolean;
	mode: "development" | "production" | "none";
}

function getEnvConfig(): EnvConfig {
	const apiBaseUrl = import.meta.env.PUBLIC_API_BASE_URL;
	const apiTimeout = import.meta.env.PUBLIC_API_TIMEOUT;
	const msalClientId = import.meta.env.PUBLIC_SSO_CLIENT_ID;
	const msalTenantId = import.meta.env.PUBLIC_SSO_TENANT_ID;
	const msalRedirectUri = import.meta.env.PUBLIC_SSO_REDIRECT_URI;
	const msalCustomScope = import.meta.env.PUBLIC_SSO_CUSTOM_SCOPE;
	const tnPortalBasePath = import.meta.env.PUBLIC_TN_PORTAL_BASE_PATH;

	if (!apiBaseUrl) {
		throw new Error(
			"PUBLIC_API_BASE_URL is not defined. Please check your .env file.",
		);
	}

	if (!msalClientId) {
		throw new Error(
			"PUBLIC_SSO_CLIENT_ID is not defined. Please check your .env file.",
		);
	}

	if (!msalTenantId) {
		throw new Error(
			"PUBLIC_SSO_TENANT_ID is not defined. Please check your .env file.",
		);
	}

	const config: EnvConfig = {
		apiBaseUrl,
		apiTimeout: apiTimeout ? Number(apiTimeout) : 30000,
		msalClientId,
		msalTenantId,
		msalRedirectUri: msalRedirectUri || window.location.origin,
		msalCustomScope,
		tnPortalBasePath,
		isDev: import.meta.env.DEV,
		isProd: import.meta.env.PROD,
		mode: import.meta.env.MODE,
	};

	if (import.meta.env.DEV) {
		console.log("🔧 Environment Configuration:", config);
	}

	return config;
}

export const config = getEnvConfig();
