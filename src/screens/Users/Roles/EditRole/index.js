import {Button, Container, Stack, Typography} from '@mui/material'
import Iconify from 'components/Iconify'
import Page from 'components/Page'
import React from 'react'
import {FormattedMessage} from 'react-intl'
import {Link as RouterLink, useParams} from 'react-router-dom'
import RoleForm from '../Partials/RoleForm'

export default function EditRole() {
  return (
    <Page title="Role">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            <FormattedMessage id="edit_role" />
          </Typography>
        </Stack>
        <RoleForm />
      </Container>
    </Page>
  )
}
