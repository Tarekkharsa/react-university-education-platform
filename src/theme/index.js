import PropTypes from 'prop-types'
import {useMemo} from 'react'
// material
import {CssBaseline} from '@mui/material'
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from '@mui/material/styles'
//
import palette from './palette'
import {dark, light} from './palette'
import typography from './typography'
import componentsOverride from './overrides'
import shadows, {customShadows} from './shadows'

// ----------------------------------------------------------------------

ThemeConfig.propTypes = {
  children: PropTypes.node,
}

export default function ThemeConfig({children}) {
  const themeOptions = useMemo(
    () => ({
      palette: light,
      shape: {borderRadius: 8},
      typography,
      shadows: shadows.light,
      customShadows: customShadows.light,
    }),
    [],
  )

  const theme = createTheme(themeOptions)
  theme.components = componentsOverride(theme)

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
