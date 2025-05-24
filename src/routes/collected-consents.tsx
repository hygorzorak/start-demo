import { createFileRoute } from '@tanstack/react-router'
import { Stack, Typography } from '@mui/material'

import { ConsentTable } from '~/features/ConsentTable/ConsentTable'

export const Route = createFileRoute('/collected-consents')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Stack alignItems="center" spacing={3} maxWidth={1200} margin="0 auto">
      <Typography variant="h5">COLLECTED CONSENTS:</Typography>
      <ConsentTable />
    </Stack>
  )
}
