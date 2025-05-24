export type Consent = {
    id: string
    created_at: number
    name: string
    email: string
    ads: boolean
    newsletter: boolean
    statistics: boolean
}

export const CONSENT_LABELS = {
    newsletter: 'Receive newsletter',
    ads: 'Be shown targeted ads',
    statistics: 'Contribute to anonymous visit statistics',
} as const

export function formatConsentText(consent: Pick<Consent, "ads" | "newsletter" | "statistics">): string {
    return Object.entries(consent)
        .filter(([_, value]) => value)
        .map(([key]) => CONSENT_LABELS[key as keyof typeof CONSENT_LABELS])
        .join(", ");
} 