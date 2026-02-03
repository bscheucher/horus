import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
	component: () => (
		<>
			{/* No navigation here - let child layouts handle it */}
			<Outlet />
			<TanStackRouterDevtools />
		</>
	),
});
