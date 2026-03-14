import { createFileRoute } from "@tanstack/react-router";
import { config } from "../config/env.ts";

export const Route = createFileRoute("/config-test")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div style={{ padding: "20px", fontFamily: "monospace" }}>
			<h1>Environment Configuration Test</h1>
			<table style={{ borderCollapse: "collapse" }}>
				<tbody>
					<tr>
						<td style={{ padding: "8px", border: "1px solid #ccc" }}>
							<strong>API Base URL:</strong>
						</td>
						<td style={{ padding: "8px", border: "1px solid #ccc" }}>
							{config.apiBaseUrl}
						</td>
					</tr>
					<tr>
						<td style={{ padding: "8px", border: "1px solid #ccc" }}>
							<strong>API Timeout:</strong>
						</td>
						<td style={{ padding: "8px", border: "1px solid #ccc" }}>
							{config.apiTimeout}ms
						</td>
					</tr>
					<tr>
						<td style={{ padding: "8px", border: "1px solid #ccc" }}>
							<strong>API Debug:</strong>
						</td>
						<td style={{ padding: "8px", border: "1px solid #ccc" }}>
							{config.isDev ? "true" : "false"}
						</td>
					</tr>
					<tr>
						<td style={{ padding: "8px", border: "1px solid #ccc" }}>
							<strong>Environment:</strong>
						</td>
						<td style={{ padding: "8px", border: "1px solid #ccc" }}>
							{config.mode}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
