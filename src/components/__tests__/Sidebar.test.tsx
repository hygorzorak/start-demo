import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Sidebar } from '../Sidebar'

vi.mock('../CustomLink', () => ({
  CustomLink: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to} data-testid={`custom-link-${to}`}>
      {children}
    </a>
  ),
}))

describe('Sidebar', () => {
  it('renders the sidebar with navigation links', () => {
    render(<Sidebar />)

    // Check if both navigation links are present
    const giveConsentLink = screen.getByTestId('custom-link-/')
    const collectedConsentsLink = screen.getByTestId('custom-link-/collected-consents')

    expect(giveConsentLink).toBeInTheDocument()
    expect(giveConsentLink).toHaveTextContent('Give consent')
    expect(giveConsentLink).toHaveAttribute('href', '/')

    expect(collectedConsentsLink).toBeInTheDocument()
    expect(collectedConsentsLink).toHaveTextContent('Collected consents')
    expect(collectedConsentsLink).toHaveAttribute('href', '/collected-consents')
  })

  it('renders with correct drawer width', () => {
    render(<Sidebar />)
    
    const drawer = document.querySelector('.MuiDrawer-root')
    const drawerPaper = document.querySelector('.MuiDrawer-paper')
    
    expect(drawer).toHaveStyle({ width: '240px' })
    expect(drawerPaper).toHaveStyle({ width: '240px' })
  })
}) 