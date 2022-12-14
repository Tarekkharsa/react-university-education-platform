import * as React from 'react'
import {useAuth} from './context/auth-context'
// import {useAsync} from './utils/hooks'
import {Link as RouterLink} from 'react-router-dom'
// material
import {styled} from '@mui/material/styles'
import {Card, Stack, Link, Container, Typography} from '@mui/material'
// layouts
import AuthLayout from 'layouts/AuthLayout'
// components
import Page from 'components/Page'
import {LoginForm} from 'sections/authentication/login'
import AuthSocial from 'sections/authentication/AuthSocial'
import {FormattedMessage} from 'react-intl'
import {RegisterForm} from 'sections/authentication/register'
import {Button} from '@mui/material'

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({theme}) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}))

const SectionStyle = styled(Card)(({theme}) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}))

const ContentStyle = styled('div')(({theme}) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}))

// ----------------------------------------------------------------------

function UnauthenticatedApp() {
  const {login, register} = useAuth()
  const [isLogin, setIsLogin] = React.useState(true)
  return (
    <RootStyle title="Login | Minimal-UI">
      {isLogin && (
        <AuthLayout>
          <FormattedMessage id="donot_have_an_account" />
          <Button
            variant="text"
            color="primary"
            onClick={() => setIsLogin(false)}
          >
            <FormattedMessage id="get_started" />
          </Button>
        </AuthLayout>
      )}

      {!isLogin && (
        <AuthLayout>
          <FormattedMessage id="have_an_account" />
          <Button
            variant="text"
            color="primary"
            onClick={() => setIsLogin(true)}
          >
            <FormattedMessage id="login" />
          </Button>
        </AuthLayout>
      )}

      <SectionStyle sx={{display: {xs: 'none', md: 'flex'}}}>
        <Typography variant="h3" sx={{px: 5, mt: 10, mb: 5}}>
          <FormattedMessage id="welecome_back" />
        </Typography>
        <img src="/static/illustrations/login.svg" alt="login" />
      </SectionStyle>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{mb: 5}}>
            <Typography variant="h4" gutterBottom>
              {isLogin && <FormattedMessage id="sign_in_to_continue" />}
              {!isLogin && <FormattedMessage id="register_to_continue" />}
            </Typography>
            <Typography sx={{color: 'text.secondary'}}>
              <FormattedMessage id="enter_your_details_below" />
            </Typography>
          </Stack>
          {/* <AuthSocial /> */}

          {isLogin && <LoginForm onSubmit={login} />}
          {!isLogin && <RegisterForm onSubmit={register} />}
        </ContentStyle>
      </Container>
    </RootStyle>
  )
}

export default UnauthenticatedApp
