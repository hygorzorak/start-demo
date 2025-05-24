import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useMutateConsent } from '../useMutateConsent'
import toast from 'react-hot-toast'
import type { ConsentFormPayload } from '../types'

const mockFetch = vi.fn()
global.fetch = mockFetch

vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  })

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

describe('useMutateConsent', () => {
  const mockPayload: ConsentFormPayload = {
    name: 'John Doe',
    email: 'john@example.com',
    newsletter: true,
    ads: false,
    statistics: true,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should successfully submit consent', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    })

    const { result } = renderHook(() => useMutateConsent(), {
      wrapper: createWrapper(),
    })

    result.current.mutate(mockPayload)

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:NFG_siDg/consent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mockPayload),
        }
      )
      expect(toast.success).toHaveBeenCalledWith('Consent given')
    })
  })

  it('should handle error when submitting consent', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    const { result } = renderHook(() => useMutateConsent(), {
      wrapper: createWrapper(),
    })

    result.current.mutate(mockPayload)

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:NFG_siDg/consent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mockPayload),
        }
      )
      expect(toast.error).toHaveBeenCalledWith('Error giving consent')
    })
  })

  it('should handle non-ok response', async () => {
    mockFetch.mockRejectedValueOnce({
      ok: false,
      status: 400,
      json: () => Promise.resolve({ message: 'Bad Request' }),
    })

    const { result } = renderHook(() => useMutateConsent(), {
      wrapper: createWrapper(),
    })

    result.current.mutate(mockPayload)

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'https://x8ki-letl-twmt.n7.xano.io/api:NFG_siDg/consent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mockPayload),
        }
      )
      expect(toast.error).toHaveBeenCalledWith('Error giving consent')
    })
  })
}) 