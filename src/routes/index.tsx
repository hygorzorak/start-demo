import { createFileRoute } from '@tanstack/react-router'
import { Stack, Typography } from '@mui/material'
import z from 'zod'
import { ConsentForm } from '~/features/ConsentForm/ConsentForm'

export const Route = createFileRoute('/')({
  validateSearch: z.object({
    count: z.number().optional(),
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Stack alignItems="center" spacing={3}>
      <Typography variant="h5" marginBlockEnd={4}>
        MY CONSENT:
      </Typography>
      <ConsentForm />
    </Stack>
  )
}
