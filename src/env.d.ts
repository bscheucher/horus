/// <reference types="@rsbuild/core/types" />

interface ImportMetaEnv {
	readonly PUBLIC_API_BASE_URL: string;
	readonly PUBLIC_API_TIMEOUT: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
