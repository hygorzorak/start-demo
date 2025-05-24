import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ConsentTable } from '../ConsentTable';
import { useQueryConsent } from '../useQueryConsent';
import type { Consent } from '~/shared/consent';

vi.mock('../useQueryConsent');

const mockUseQueryConsent = useQueryConsent as unknown as ReturnType<typeof vi.fn>;

const mockConsents: Consent[] = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        ads: true,
        newsletter: false,
        statistics: true,
        created_at: Date.now(),
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        ads: false,
        newsletter: true,
        statistics: false,
        created_at: Date.now(),
    },
];

describe('ConsentTable', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should show loading state', () => {
        mockUseQueryConsent.mockReturnValue({
            data: undefined,
            isLoading: true,
            isFetched: false,
        });

        render(<ConsentTable />);
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('should show empty state when no data is available', () => {
        mockUseQueryConsent.mockReturnValue({
            data: [],
            isLoading: false,
            isFetched: true,
        });

        render(<ConsentTable />);
        expect(screen.getByText('No data')).toBeInTheDocument();
    });

    it('should render consent data correctly', () => {
        mockUseQueryConsent.mockReturnValue({
            data: mockConsents,
            isLoading: false,
            isFetched: true,
        });

        render(<ConsentTable />);

        // Check if headers are present
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('Consent')).toBeInTheDocument();

        // Check if first row data is rendered
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('john@example.com')).toBeInTheDocument();
        expect(screen.getByText('Be shown targeted ads, Contribute to anonymous visit statistics')).toBeInTheDocument();

        // Check if second row data is rendered
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.getByText('jane@example.com')).toBeInTheDocument();
        expect(screen.getByText('Receive newsletter')).toBeInTheDocument();
    });

    it('should handle pagination correctly', () => {
        const manyConsents = Array.from({ length: 15 }, (_, index) => ({
            id: String(index + 1),
            name: `User ${index + 1}`,
            email: `user${index + 1}@example.com`,
            ads: true,
            newsletter: true,
            statistics: true,
            created_at: Date.now(),
        }));

        mockUseQueryConsent.mockReturnValue({
            data: manyConsents,
            isLoading: false,
            isFetched: true,
        });

        render(<ConsentTable />);

        // Check initial page (first 10 items)
        expect(screen.getByText('User 1')).toBeInTheDocument();
        expect(screen.getByText('User 10')).toBeInTheDocument();
        expect(screen.queryByText('User 11')).not.toBeInTheDocument();

        // Click next page button
        const nextPageButton = screen.getByRole('button', { name: /next/i });
        fireEvent.click(nextPageButton);

        // Check second page (remaining 5 items)
        expect(screen.queryByText('User 1')).not.toBeInTheDocument();
        expect(screen.getByText('User 11')).toBeInTheDocument();
        expect(screen.getByText('User 15')).toBeInTheDocument();
    });
}); 