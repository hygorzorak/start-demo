import type { ReactElement } from "react";
import { render as rtlRender, type RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { createRouter } from "~/router";
import { ThemeProvider } from "@mui/material";
import { theme } from "~/setup/theme";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const createTestQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
			mutations: {
				retry: false,
			},
		},
	});

const router = createRouter();

// Full app wrapper with router
const AppProviders = ({ children }: { children: React.ReactNode }) => {
	const queryClient = createTestQueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
};

// Simple wrapper for component tests
const ComponentProviders = ({ children }: { children: React.ReactNode }) => {
	const queryClient = createTestQueryClient();
	const emotionCache = createCache({ key: "css" });

	return (
		<QueryClientProvider client={queryClient}>
			<CacheProvider value={emotionCache}>
				<ThemeProvider theme={theme}>{children}</ThemeProvider>
			</CacheProvider>
		</QueryClientProvider>
	);
};

// Render with full app setup (router, etc)
const renderWithApp = (
	ui: ReactElement,
	options?: Omit<RenderOptions, "wrapper">,
) => rtlRender(ui, { wrapper: AppProviders, ...options });

// Render with minimal setup for component tests
const renderWithProviders = (
	ui: ReactElement,
	options?: Omit<RenderOptions, "wrapper">,
) => rtlRender(ui, { wrapper: ComponentProviders, ...options });

export * from "@testing-library/react";
export { renderWithApp as render, renderWithProviders, router };

