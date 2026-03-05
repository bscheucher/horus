/**
 * Environment configuration
 * Validates and exports environment variables for the application
 */

interface EnvConfig {
	// API Configuration
	apiBaseUrl: string;
	apiTimeout: number;

	// Azure EntraID Configuration
	ssoClientId: string;
	ssoTenantId: string;
	ssoRedirectUri: string;

	// Environment info (from Rsbuild built-ins)
	isDev: boolean;
	isProd: boolean;
	mode: "development" | "production" | "none";

	// Asset configuration
	assetPrefix: string;
}

function getEnvConfig(): EnvConfig {
	const apiBaseUrl = import.meta.env.PUBLIC_API_BASE_URL;
	const apiTimeout = import.meta.env.PUBLIC_API_TIMEOUT;
	const ssoClientId = import.meta.env.PUBLIC_SSO_CLIENT_ID;
	const ssoTenantId = import.meta.env.PUBLIC_SSO_TENANT_ID;
	const ssoRedirectUri = import.meta.env.PUBLIC_SSO_REDIRECT_URI;

	// Validate required variables
	if (!apiBaseUrl) {
		throw new Error(
			"PUBLIC_API_BASE_URL is not defined. Please check your .env file.",
		);
	}

	if (!ssoClientId || !ssoTenantId) {
		throw new Error(
			"PUBLIC_SSO_CLIENT_ID and PUBLIC_SSO_TENANT_ID are required. Please check your .env file.",
		);
	}

	const config: EnvConfig = {
		apiBaseUrl,
		apiTimeout: apiTimeout ? Number(apiTimeout) : 30000,
		ssoClientId,
		ssoTenantId,
		ssoRedirectUri: ssoRedirectUri || window.location.origin,
		isDev: import.meta.env.DEV,
		isProd: import.meta.env.PROD,
		mode: import.meta.env.MODE,
		assetPrefix: import.meta.env.ASSET_PREFIX,
	};

	// Log config in development (tree-shaken in production)
	if (import.meta.env.DEV) {
		console.log("🔧 Environment Configuration:", config);
	}

	return config;
}

export const config = getEnvConfig();
