import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/react-query'

import { useQueryConsent } from '../useQueryConsent'
import type { Consent } from '~/shared/consent'

const mockConsents: Consent[] = [
    {
        id: '1',
        created_at: Date.now(),
        name: 'John Doe',
        email: 'john@example.com',
        ads: true,
        newsletter: false,
        statistics: true
    },
    {
        id: '2',
        created_at: Date.now(),
        name: 'Jane Smith',
        email: 'jane@example.com',
        ads: false,
        newsletter: true,
        statistics: false
    }
]

describe('useQueryConsent', () => {
    let queryClient: QueryClient

    beforeEach(() => {
        queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                },
            },
        })
        vi.clearAllMocks()
    })

    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )

    it('should fetch consents successfully', async () => {
        global.fetch = vi.fn().mockResolvedValueOnce({
            json: () => Promise.resolve(mockConsents),
        })

        const { result } = renderHook(() => useQueryConsent(), { wrapper })

        // Initial state
        expect(result.current.isLoading).toBe(true)
        expect(result.current.data).toBeUndefined()

        // Wait for the query to complete
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false)
        })

        // Verify the data
        expect(result.current.data).toEqual(mockConsents)
        expect(result.current.error).toBeNull()
        expect(global.fetch).toHaveBeenCalledWith(
            'https://x8ki-letl-twmt.n7.xano.io/api:NFG_siDg/consent'
        )
    })

    it('should handle fetch error', async () => {
        const errorMessage = 'Failed to fetch'
        global.fetch = vi.fn().mockRejectedValueOnce(new Error(errorMessage))

        const { result } = renderHook(() => useQueryConsent(), { wrapper })

        // Initial state
        expect(result.current.isLoading).toBe(true)
        expect(result.current.data).toBeUndefined()

        // Wait for the query to complete
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false)
        })

        // Verify error state
        expect(result.current.data).toBeUndefined()
        expect(result.current.error).toBeTruthy()
        expect(result.current.error?.message).toBe(errorMessage)
    })
}) 