import { MsalProvider } from "@azure/msal-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import { createMsalInstance } from "./config/msal.ts";
import { setMsalInstance } from "./lib/auth.ts";
import "./i18n";
import "./index.css";
import { routeTree } from "./routeTree.gen";

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

function createAppRouter() {
	return createRouter({
		routeTree,
		context: {
			queryClient,
		},
	});
}

type AppRouter = ReturnType<typeof createAppRouter>;

declare module "@tanstack/react-router" {
	interface Register {
		router: AppRouter;
	}
}

async function startApp() {
	const msalInstance = createMsalInstance();
	await msalInstance.initialize();

	const redirectResult = await msalInstance.handleRedirectPromise();

	const accounts = msalInstance.getAllAccounts();
	if (accounts.length > 0) {
		msalInstance.setActiveAccount(accounts[0]);
	}

	setMsalInstance(msalInstance);

	if (redirectResult && accounts.length > 0) {
		window.location.replace("/upload");
		return;
	}

	const router = createAppRouter();

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
}

startApp();
