import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CustomLink } from '../CustomLink'
import type { LinkProps } from '@mui/material'

vi.mock('@tanstack/react-router', () => ({
  createLink: vi.fn(() => {
    return function MockCreatedLink(props: LinkProps & { to: string }) {
      return <a {...props} data-testid="mock-link" />
    }
  }),
}))

vi.mock('@mui/material', () => ({
  Link: vi.fn(({ children, ...props }) => (
    <a {...props} data-testid="mui-link">
      {children}
    </a>
  )),
}))

describe('CustomLink', () => {
  it('renders with correct props', () => {
    render(
      <CustomLink to="/test" data-testid="custom-link">
        Test Link
      </CustomLink>
    )

    const link = screen.getByTestId('mock-link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('to', '/test')
    expect(link).toHaveAttribute('preload', 'intent')
    expect(link).toHaveTextContent('Test Link')
  })

  it('forwards additional props to the link component', () => {
    render(
      <CustomLink to="/test" className="test-class" data-testid="custom-link">
        Test Link
      </CustomLink>
    )

    const link = screen.getByTestId('mock-link')
    expect(link).toHaveClass('test-class')
  })
}) 