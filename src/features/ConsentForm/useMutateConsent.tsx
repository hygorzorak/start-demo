import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

import type { ConsentFormPayload } from './types'

export function useMutateConsent() {
    return useMutation({
        mutationFn: async (payload: ConsentFormPayload) => {
            await fetch('https://x8ki-letl-twmt.n7.xano.io/api:NFG_siDg/consent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
            })
        },
        onSuccess: () => {
            toast.success('Consent given')
        },
        onError: () => {
            toast.error('Error giving consent')
        },
    })
}