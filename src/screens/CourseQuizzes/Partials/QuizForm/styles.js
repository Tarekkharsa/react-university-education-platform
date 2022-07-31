import {makeStyles} from '@mui/styles'

const useStyles = makeStyles(theme => ({
  errorText: {
    color: '#f44336',
    marginLeft: '14px',
    marginRight: '14px',
    margin: '0',
    fontSize: '0.75rem',
    marginTop: '3px',
    textAlign: theme.direction === 'ltr' ? 'left' : 'right',
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontWeight: '400',
    lineHeight: '1.66',
    letterSpacing: '0.03333em',
  },
}))

export default useStyles
