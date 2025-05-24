import { Stack, Typography, TextField, FormControlLabel, Checkbox, Button } from '@mui/material'
import { useState } from 'react'

import type { ConsentFormUser, ConsentFormConsent } from './types'
import { useMutateConsent } from './useMutateConsent'

export function ConsentForm() {
    const [user, setUser] = useState<ConsentFormUser>({
        name: '',
        email: '',
    })
    const [consent, setConsent] = useState<ConsentFormConsent>({
        newsletter: false,
        ads: false,
        statistics: false,
    })

    const { mutate: giveConsent, isPending } = useMutateConsent()

    const handleSubmit = () => {
        giveConsent({
            name: user.name,
            email: user.email,
            newsletter: consent.newsletter,
            ads: consent.ads,
            statistics: consent.statistics,
        }, {
            onSuccess: () => {
                setUser({ name: '', email: '' })
                setConsent({ newsletter: false, ads: false, statistics: false })
            },
        })
    }
    return (
        <Stack component="form" spacing={2} width={400}>
            <Stack direction="row" spacing={2}>
                <TextField
                    label="Name"
                    placeholder="Name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
                <TextField
                    label="Email address"
                    placeholder="Email address"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
            </Stack>
            <Typography>I agree to:</Typography>
            <Stack spacing={1} border={1} borderColor="#ccc" borderRadius={2} padding={2}>
                <FormControlLabel control={
                    <Checkbox checked={consent.newsletter} onChange={(e) => setConsent({ ...consent, newsletter: e.target.checked })} />
                } label="Receive newsletter" />
                <FormControlLabel control={
                    <Checkbox checked={consent.ads} onChange={(e) => setConsent({ ...consent, ads: e.target.checked })} />
                } label="Be shown targeted ads" />
                <FormControlLabel control={
                    <Checkbox checked={consent.statistics} onChange={(e) => setConsent({ ...consent, statistics: e.target.checked })} />
                } label="Contribute to anonymous visit statistics" />
            </Stack>
            <Button
                variant="contained"
                size="large"
                disabled={
                    isPending ||
                    !user.name ||
                    !user.email ||
                    !(consent.newsletter || consent.ads || consent.statistics)
                }
                onClick={handleSubmit}
            >
                {isPending ? 'Giving consent...' : 'Give consent'}
            </Button>
        </Stack>
    )
}