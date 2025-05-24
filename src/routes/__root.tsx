import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { CacheProvider } from '@emotion/react'
import { Container, CssBaseline, ThemeProvider } from '@mui/material'
import createCache from '@emotion/cache'
import fontsourceVariableRobotoCss from '@fontsource-variable/roboto?url'
import { Toaster } from 'react-hot-toast';

import type { ReactNode } from 'react'

import { theme } from '~/setup/theme'
import { Sidebar } from '~/components/Sidebar'

export const Route = createRootRoute({
  head: () => ({
    links: [{ rel: 'stylesheet', href: fontsourceVariableRobotoCss }],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function Providers({ children }: { children: ReactNode }) {
  const emotionCache = createCache({ key: 'css' })

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Providers>
          <Sidebar />

          <Container
            component="main"
            sx={{
              paddingBlock: 4,
              marginLeft: '240px',
              maxWidth: 'calc(100% - 240px) !important',
            }}
          >
            {children}
          </Container>
        </Providers>

        <Toaster />

        <TanStackRouterDevtools position="bottom-left" />
        <Scripts />
      </body>
    </html>
  )
}
