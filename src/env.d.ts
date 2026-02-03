/// <reference types="@rsbuild/core/types" />

interface ImportMetaEnv {
	readonly PUBLIC_API_BASE_URL: string;
	readonly PUBLIC_API_TIMEOUT: string;
	readonly PUBLIC_API_DEBUG: string;
	readonly PUBLIC_SSO_CLIENT_ID: string;
	readonly PUBLIC_SSO_TENANT_ID: string;
	readonly PUBLIC_SSO_CUSTOM_SCOPE: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
