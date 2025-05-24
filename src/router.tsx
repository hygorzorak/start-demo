import { QueryClient } from '@tanstack/react-query'
import {
  createRouter as createTanStackRouter,
  type AnyRouter,
} from '@tanstack/react-router'
import {
  routerWithQueryClient,
  type ValidateRouter,
} from '@tanstack/react-router-with-query'

import { routeTree } from './routeTree.gen'

export function createRouter() {
  const queryClient = new QueryClient()


  const router = createTanStackRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: 'intent',
    defaultErrorComponent: err => <p>{err.error.stack}</p>,
    defaultNotFoundComponent: () => <p>Not found</p>,
    scrollRestoration: true,
  }) as ValidateRouter<AnyRouter>

  return routerWithQueryClient(router, queryClient)
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
