import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ConsentForm } from '../ConsentForm'
import { useMutateConsent } from '../useMutateConsent'

vi.mock('../useMutateConsent')

const mockMutate = vi.fn()
const mockUseMutateConsent = useMutateConsent as unknown as ReturnType<typeof vi.fn>

describe('ConsentForm', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        mockUseMutateConsent.mockReturnValue({
            mutate: mockMutate,
            isPending: false,
        })
    })

    const renderConsentForm = () => {
        return render(<ConsentForm />)
    }

    it('renders the form with initial state', () => {
        renderConsentForm()

        // Check if all form elements are present
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/receive newsletter/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/be shown targeted ads/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/contribute to anonymous visit statistics/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /give consent/i })).toBeInTheDocument()

        // Check initial values
        expect(screen.getByLabelText(/name/i)).toHaveValue('')
        expect(screen.getByLabelText(/email address/i)).toHaveValue('')
        expect(screen.getByLabelText(/receive newsletter/i)).not.toBeChecked()
        expect(screen.getByLabelText(/be shown targeted ads/i)).not.toBeChecked()
        expect(screen.getByLabelText(/contribute to anonymous visit statistics/i)).not.toBeChecked()
    })

    it('updates form values when user interacts with inputs', async () => {
        renderConsentForm()

        // Fill in the form
        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } })
        fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john@example.com' } })
        fireEvent.click(screen.getByLabelText(/receive newsletter/i))
        fireEvent.click(screen.getByLabelText(/be shown targeted ads/i))

        // Check if values are updated
        expect(screen.getByLabelText(/name/i)).toHaveValue('John Doe')
        expect(screen.getByLabelText(/email address/i)).toHaveValue('john@example.com')
        expect(screen.getByLabelText(/receive newsletter/i)).toBeChecked()
        expect(screen.getByLabelText(/be shown targeted ads/i)).toBeChecked()
        expect(screen.getByLabelText(/contribute to anonymous visit statistics/i)).not.toBeChecked()
    })

    it('disables submit button when form is invalid', () => {
        renderConsentForm()
        const submitButton = screen.getByRole('button', { name: /give consent/i })

        // Initially disabled (no name, email, or consent)
        expect(submitButton).toBeDisabled()

        // Add name but still disabled (no email or consent)
        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } })
        expect(submitButton).toBeDisabled()

        // Add email but still disabled (no consent)
        fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john@example.com' } })
        expect(submitButton).toBeDisabled()

        // Add consent - now enabled
        fireEvent.click(screen.getByLabelText(/receive newsletter/i))
        expect(submitButton).not.toBeDisabled()
    })

    it('submits form data correctly when valid', async () => {
        renderConsentForm()

        // Fill in the form
        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } })
        fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john@example.com' } })
        fireEvent.click(screen.getByLabelText(/receive newsletter/i))
        fireEvent.click(screen.getByLabelText(/be shown targeted ads/i))

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /give consent/i }))

        // Check if mutate was called with correct data
        expect(mockMutate).toHaveBeenCalledWith(
            {
                name: 'John Doe',
                email: 'john@example.com',
                newsletter: true,
                ads: true,
                statistics: false,
            },
            expect.any(Object)
        )
    })

    it('shows loading state during submission', () => {
        mockUseMutateConsent.mockReturnValue({
            mutate: mockMutate,
            isPending: true,
        })

        renderConsentForm()

        // Fill in the form
        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } })
        fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john@example.com' } })
        fireEvent.click(screen.getByLabelText(/receive newsletter/i))

        // Check loading state
        expect(screen.getByRole('button', { name: /giving consent/i })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /giving consent/i })).toBeDisabled()
    })

    it('resets form after successful submission', async () => {
        mockMutate.mockImplementation((_, { onSuccess }) => {
            onSuccess?.()
        })

        renderConsentForm()

        // Fill in the form
        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } })
        fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john@example.com' } })
        fireEvent.click(screen.getByLabelText(/receive newsletter/i))

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /give consent/i }))

        // Check if form is reset
        await waitFor(() => {
            expect(screen.getByLabelText(/name/i)).toHaveValue('')
            expect(screen.getByLabelText(/email address/i)).toHaveValue('')
            expect(screen.getByLabelText(/receive newsletter/i)).not.toBeChecked()
        })
    })
}) 