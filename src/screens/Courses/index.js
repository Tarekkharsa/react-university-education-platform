// material
import {
  Container,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material'
import {FullPageSpinner} from 'components/lib'
// components
import Page from 'components/Page'
import {useAuth, useClient} from 'context/auth-context'
import {useMemo, useState} from 'react'
import {FormattedMessage} from 'react-intl'
import {useQuery} from 'react-query'
import CourseList from 'sections/@dashboard/sections/CourseList'
import {styled} from '@mui/material/styles'
import Iconify from 'components/Iconify'

const SearchStyle = styled(OutlinedInput)(({theme}) => ({
  width: '90%',
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {width: '100%', boxShadow: theme.customShadows.z8},
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}))
export default function Courses() {
  const client = useClient()
  const {user} = useAuth()

  const [value, setValue] = useState('')

  const {isLoading, error, data} = useQuery({
    queryKey: 'courses',
    queryFn: () =>
      client(`course/enroll/getUserCourses?user_id=${user.id}`).then(
        data => data.data,
      ),
  })

  if (isLoading && !data) {
    return <FullPageSpinner />
  }
  return (
    <Page title="Courses">
      <Container>
        <Typography variant="h4" sx={{mb: 5}}>
          <FormattedMessage id="courses" />
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{mb: 5}}
        >
          <Stack
            direction="row"
            width={'100%'}
            spacing={1}
            justifyContent={'center'}
          >
            <SearchStyle
              value={value || ''}
              onChange={e => {
                setValue(e.target.value)
              }}
              placeholder={`...`}
              startAdornment={
                <InputAdornment position="start">
                  <Iconify
                    icon="eva:search-fill"
                    sx={{color: 'text.disabled'}}
                  />
                </InputAdornment>
              }
            />
          </Stack>
        </Stack>

        <CourseList courses={data} value={value} />
      </Container>
    </Page>
  )
}
