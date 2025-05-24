export type ConsentFormUser = {
    name: string
    email: string
}

export type ConsentFormConsent = {
    newsletter: boolean
    ads: boolean
    statistics: boolean
}

export type ConsentFormPayload = ConsentFormUser & ConsentFormConsent