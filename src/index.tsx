import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
	type AuthenticationResult,
	EventType,
	PublicClientApplication,
} from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { msalConfig } from "./config/authConfig";
import { routeTree } from "./routeTree.gen";
import { useUserStore } from "./stores/userStore";

// Create MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);

// Initialize MSAL
await msalInstance.initialize();

// Handle redirect response — this processes the token returned by Azure AD
// after the user completes login on the Microsoft page
const redirectResponse = await msalInstance.handleRedirectPromise();
if (redirectResponse) {
	msalInstance.setActiveAccount(redirectResponse.account);
}

// If no active account is set, pick the first one from the cache
if (!msalInstance.getActiveAccount()) {
	const accounts = msalInstance.getAllAccounts();
	if (accounts.length > 0) {
		msalInstance.setActiveAccount(accounts[0]);
	}
}

// Listen for login success events to set the active account
msalInstance.addEventCallback((event) => {
	if (
		event.eventType === EventType.LOGIN_SUCCESS &&
		(event.payload as AuthenticationResult)?.account
	) {
		const account = (event.payload as AuthenticationResult).account;
		msalInstance.setActiveAccount(account);
	}
});

// Restore user from cookie on app startup
useUserStore.getState().restoreFromCookie();

// Create a QueryClient instance
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5,
			gcTime: 1000 * 60 * 10,
			retry: 1,
			refetchOnWindowFocus: false,
		},
		mutations: {
			retry: 1,
		},
	},
});

// Create router instance
const router = createRouter({
	routeTree,
	context: {
		queryClient,
	},
});

// Register router for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("root");
if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<React.StrictMode>
			<MsalProvider instance={msalInstance}>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</MsalProvider>
		</React.StrictMode>,
	);
}
