import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { routeTree } from "./routeTree.gen";

// Create a QueryClient instance to fetch data from APIs, cache it, and make it available to all components
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // Data is considered "fresh" for 5 minutes
			gcTime: 1000 * 60 * 10, // "Garbage Collection Time" — Keep unused data in cache for 10 minutes
			retry: 1, // If a request fails, try it one more time before giving up
			refetchOnWindowFocus: false, // Doesn't automatically refetch data when browser tabs switched
		},
		mutations: {
			retry: 1, // If creating/updating/deleting fails, try once more
		},
	},
});

// Create router instance
const router = createRouter({
	routeTree,
	// Give the router access to the queryClient by passing it in the context to prefetch data or access the QueryClient directly
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
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</React.StrictMode>,
	);
}
