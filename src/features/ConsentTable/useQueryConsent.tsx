import { useQuery } from "@tanstack/react-query";

import type { Consent } from "~/shared/consent";

export function useQueryConsent() {
    return useQuery<Consent[]>({
        queryKey: ['ConsentTable > useQueryConsent'],
        queryFn: async () => {
            const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:NFG_siDg/consent')
            const data = await response.json()
            return data
        },
    })
}