import {defineConfig} from '@rsbuild/core';
import {pluginReact} from '@rsbuild/plugin-react';
import {TanStackRouterRspack} from '@tanstack/router-plugin/rspack';

export default defineConfig({
    plugins: [pluginReact()],
    tools: {
        rspack: {
            plugins: [TanStackRouterRspack()],
        },
    },
    html: {
        title: 'Teilnehmer-Portal',
        meta: {
            description: 'Abwesenheitsverwaltung für ibis acam Kursteilnehmer',
        },
        favicon: './public/favicon.ico',
    },
});